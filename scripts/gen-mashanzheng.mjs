// 马善政毛笔楷书（Ma Shan Zheng，Google Fonts OFL 开源）子集生成：
// 扫描 src 中实际用到的中文字符，经 fonts.loli.net 镜像拉取按 unicode-range 分包的
// woff2，自托管到 public/fonts/ma-shan-zheng/，生成本地 @font-face CSS。
// 用途：首页 Hero 北斗九星星名标签（古朴碑拓感）。新增中文后需重跑本脚本。
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const CSS_API = "https://fonts.loli.net/css2?family=Ma+Shan+Zheng&display=swap";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36";
const OUT_DIR = path.join(ROOT, "public/fonts/ma-shan-zheng");
const CSS_OUT = path.join(OUT_DIR, "ma-shan-zheng.css");

// 1) 收集 src 中所有 CJK 字符（与 gen-lxgw.mjs 同一套逻辑）
function collectChars() {
  const exts = new Set([".ts", ".tsx", ".mdx", ".md", ".json"]);
  const chars = new Set();
  const re = /[　-〿㐀-䶿一-鿿豈-﫿＀-￯]/g;
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === "node_modules" || e.name === ".next" || e.name === ".git")
          continue;
        walk(p);
      } else if (exts.has(path.extname(e.name))) {
        const txt = fs.readFileSync(p, "utf8");
        let m;
        while ((m = re.exec(txt))) for (const ch of m[0]) chars.add(ch);
      }
    }
  }
  walk(path.join(ROOT, "src"));
  return chars;
}

// 2) 解析 css2 返回的 @font-face 块（src + unicode-range）
function parseFaces(css) {
  const faces = [];
  const re = /@font-face\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const body = m[1];
    const src = (body.match(/url\(([^)]+)\)/) || [])[1]?.trim().replace(/['"]/g, "");
    const ur = (body.match(/unicode-range:\s*([^;}\n]+)/) || [])[1];
    if (!src || !ur) continue;
    const ranges = ur
      .split(",")
      .map((s) => s.trim())
      .map((s) => {
        const mm = s.match(/U\+([0-9a-fA-F]+)(?:-([0-9a-fA-F]+))?/i);
        if (!mm) return null;
        return [parseInt(mm[1], 16), mm[2] ? parseInt(mm[2], 16) : parseInt(mm[1], 16)];
      })
      .filter(Boolean);
    faces.push({ src, ranges });
  }
  return faces;
}

function intersects(chars, ranges) {
  for (const ch of chars) {
    const cp = ch.codePointAt(0);
    for (const [a, b] of ranges) if (cp >= a && cp <= b) return true;
  }
  return false;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const chars = collectChars();
  console.log("收集到中文字符数:", chars.size);

  const css = await (await fetch(CSS_API, { headers: { "User-Agent": UA } })).text();
  const faces = parseFaces(css);
  console.log("远端分包数:", faces.length);

  let used = 0;
  let out = "/* 自动生成：马善政毛笔楷书子集（仅含本站用字），经 fonts.loli.net 镜像自托管。\n";
  out += "   重新生成请运行 scripts/gen-mashanzheng.mjs。*/\n";
  for (const f of faces) {
    if (!intersects(chars, f.ranges)) continue;
    const fileName = path.basename(new URL(f.src).pathname);
    const buf = Buffer.from(await (await fetch(f.src)).arrayBuffer());
    fs.writeFileSync(path.join(OUT_DIR, fileName), buf);
    used++;
    const ranges = f.ranges
      .map(([a, b]) => (a === b ? `U+${a.toString(16)}` : `U+${a.toString(16)}-${b.toString(16)}`))
      .join(", ");
    out += `@font-face{font-family:'Ma Shan Zheng';font-style:normal;font-weight:400;font-display:swap;src:url('./${fileName}') format('woff2');unicode-range:${ranges};}\n`;
  }
  fs.writeFileSync(CSS_OUT, out);
  console.log("命中分包:", used, " 输出:", CSS_OUT);
  const total = fs.readdirSync(OUT_DIR).reduce((s, n) => s + fs.statSync(path.join(OUT_DIR, n)).size, 0);
  console.log("本地字体目录总大小:", (total / 1024).toFixed(0), "KB");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
