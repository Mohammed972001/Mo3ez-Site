// تحسين صور public في المكان: تصغير الأبعاد الضخمة + إعادة ضغط (نفس الامتداد).
// يقلّل وزن الصور بشكل كبير → معاينة dev أسرع، رامات أقل، وLCP أفضل.
// آمن: لا يستبدل إلا إذا صَغُر الملف فعلًا. الأصول محفوظة في git.
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "D:/work/carpet-E-commerce/public";
const MAX_W = 1700; // أقصى عرض معقول لصور الويب
let before = 0, after = 0, changed = 0, skipped = 0;

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else await process(p);
  }
}

async function process(file) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;
  const orig = (await stat(file)).size;
  before += orig;
  try {
    const img = sharp(file, { failOn: "none" });
    const meta = await img.metadata();
    let pipe = img.rotate();
    if (meta.width && meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W });
    if (ext === ".png") pipe = pipe.png({ compressionLevel: 9, palette: true, quality: 72 });
    else pipe = pipe.jpeg({ quality: 78, mozjpeg: true });
    const tmp = file + ".tmp";
    await pipe.toFile(tmp);
    const ns = (await stat(tmp)).size;
    if (ns < orig * 0.95) {
      await rename(tmp, file);
      after += ns;
      changed++;
    } else {
      await unlink(tmp);
      after += orig;
      skipped++;
    }
  } catch (err) {
    after += orig;
    console.warn("skip", file, err.message);
  }
}

await walk(ROOT);
const mb = (n) => (n / 1048576).toFixed(1);
console.log(`changed=${changed} skipped=${skipped}`);
console.log(`before=${mb(before)}MB  after=${mb(after)}MB  saved=${mb(before - after)}MB (${Math.round((1 - after / before) * 100)}%)`);
