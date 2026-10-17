import { getCloudflareContext } from "@opennextjs/cloudflare";
import { handleChat, type ChatEnv } from "@/lib/chat/core";
import { CHAT_SITE } from "@/lib/chat/knowledge";

/** POST /api/chat — the site assistant (lib/chat). Bindings come from wrangler.jsonc. */
export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  return handleChat(request, env as unknown as ChatEnv, CHAT_SITE);
}
