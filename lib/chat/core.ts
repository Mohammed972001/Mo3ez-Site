// Site chat assistant, shared by every client site (copied per repo from the
// client-site-deploy skill templates). Answers only from the site's own data, never
// invents prices, durations or guarantees, and hands real requests to WhatsApp.
// Gemini (free tier) first; Cloudflare Workers AI when Gemini fails or hits its quota.

export interface ChatEnv {
  GEMINI_API_KEY?: string;
  AI?: { run: (model: string, input: unknown) => Promise<{ response?: string }> };
  CHAT_LIMITER?: { limit: (o: { key: string }) => Promise<{ success: boolean }> };
}

export type ChatSite = {
  /** Shop name as shown on the site. */
  name: string;
  /** What the shop does, one line, e.g. "تفصيل مطابخ في الرياض". */
  niche: string;
  phone: string;
  whatsappUrl: string;
  /** Plain text built from the site's data files. */
  knowledge: string;
};

type Turn = { role: "user" | "assistant"; content: string };

const GEMINI_MODEL = "gemini-flash-lite-latest";
const FALLBACK_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const MAX_TURNS = 10;
const MAX_CHARS = 500;

export function systemPrompt(site: ChatSite): string {
  return `أنت مساعد موقع «${site.name}» (${site.niche}). تساعد الزائر يفهم المنتجات والخدمات ويختار، ثم توجهه للتواصل.

القواعد:
- اكتب بالعربي البسيط الواضح، بجمل قصيرة، في حدود 80 كلمة.
- جاوب فقط من «معلومات الموقع» تحت. إذا المعلومة غير موجودة قل إنك غير متأكد ووجّه الزائر للواتساب.
- ممنوع تذكر أي سعر أو مدة تنفيذ أو ضمان أو خصم أو رقم غير مكتوب حرفيًا في المعلومات. لعرض السعر: اطلب من الزائر يرسل المقاسات والصور على الواتساب ${site.phone}.
- لا تطلب اسم الزائر أو رقمه أو أي بيانات شخصية.
- إذا السؤال خارج نشاط الموقع، اعتذر بلطف وارجع للموضوع.
- يمكنك ذكر رابط صفحة من المعلومات إذا كان يفيد الزائر.

معلومات الموقع:
${site.knowledge}`;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

function readTurns(body: unknown): Turn[] | null {
  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const turns: Turn[] = [];
  for (const m of messages.slice(-MAX_TURNS)) {
    const role = (m as Turn)?.role;
    const content = (m as Turn)?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) turns.push({ role, content: text });
  }
  return turns.length > 0 && turns[turns.length - 1].role === "user" ? turns : null;
}

async function askGemini(key: string, system: string, turns: Turn[]): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: turns.map((t) => ({
          role: t.role === "assistant" ? "model" : "user",
          parts: [{ text: t.content }],
        })),
        generationConfig: { maxOutputTokens: 500, temperature: 0.3 },
      }),
      signal: AbortSignal.timeout(15_000),
    },
  );
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
  if (!text) throw new Error("gemini empty");
  return text;
}

async function askWorkersAi(ai: NonNullable<ChatEnv["AI"]>, system: string, turns: Turn[]): Promise<string> {
  const out = await ai.run(FALLBACK_MODEL, {
    messages: [{ role: "system", content: system }, ...turns],
    max_tokens: 500,
    temperature: 0.3,
  });
  const text = out.response?.trim();
  if (!text) throw new Error("workers-ai empty");
  return text;
}

export async function handleChat(request: Request, env: ChatEnv, site: ChatSite): Promise<Response> {
  if (request.method !== "POST") return json({ error: "method" }, 405);

  // Same-site only: the widget on this site is the only caller.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: "origin" }, 403);

  if (env.CHAT_LIMITER) {
    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const { success } = await env.CHAT_LIMITER.limit({ key: ip });
    if (!success) return json({ error: "rate", whatsapp: site.whatsappUrl }, 429);
  }

  let turns: Turn[] | null = null;
  try {
    turns = readTurns(await request.json());
  } catch {
    turns = null;
  }
  if (!turns) return json({ error: "input" }, 400);

  const system = systemPrompt(site);
  // A secret saved from a terminal can carry a trailing newline; it is never part of the key.
  const key = env.GEMINI_API_KEY?.trim();
  if (key) {
    try {
      return json({ reply: await askGemini(key, system, turns) });
    } catch (e) {
      console.warn("[chat] gemini failed, falling back:", (e as Error).message);
    }
  }
  if (env.AI) {
    try {
      return json({ reply: await askWorkersAi(env.AI, system, turns) });
    } catch (e) {
      console.error("[chat] workers ai failed:", (e as Error).message);
    }
  }
  return json({ error: "unavailable", whatsapp: site.whatsappUrl }, 503);
}
