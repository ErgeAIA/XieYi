// 临时脚本：根据 src 中实际出现的中文字符，下载 LXGW WenKai（霞鹜文楷）覆盖这些字的
// 子集 woff2，并生成本地 @font-face CSS（带 unicode-range），实现自托管、脱离 CDN。
// 运行后即删除本文件。
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const PKG = "lxgw-wenkai-webfont@1.7.0";
const BASE = `https://cdn.jsdelivr.net/npm/${PKG}`;
const OUT_DIR = path.join(ROOT, "public/fonts/lxgw-wenkai");
const CSS_OUT = path.join(OUT_DIR, "lxgw-wenkai.css");

// 1) 收集 src 中所有 CJK 字符（含 CJK 标点/全角），作为子集覆盖范围
function collectChars() {
  const exts = new Set([".ts", ".tsx", ".mdx", ".md", ".json"]);
  const chars = new Set();
  const re = /[　-〿㐀-䶿一-鿿豈-﫿＀-￯]/g;
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

// 2) 解析单个 @font-face CSS 文本里所有 block
function parseFaces(css) {
  const faces = [];
  const re = /@font-face\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const body = m[1];
    const weight = (body.match(/font-weight:\s*(\d+)/) || [])[1];
    const src = (body.match(/url\('?([^')]+)'?\)/) || [])[1];
    const ur = (body.match(/unicode-range:\s*([^;}\n]+)/) || [])[1];
    if (!src || !ur) continue;
    const ranges = ur
      .split(",")
      .map((s) => s.trim())
      .map((s) => {
        const mm = s.match(/U\+([0-9a-fA-F]+)(?:-([0-9a-fA-F]+))?/);
        if (!mm) return null;
        return [parseInt(mm[1], 16), mm[2] ? parseInt(mm[2], 16) : parseInt(mm[1], 16)];
      })
      .filter(Boolean);
    faces.push({ weight, src, ranges });
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

  const weights = [
    { file: "lxgwwenkai-regular.css", weight: 400 },
    { file: "lxgwwenkai-bold.css", weight: 700 },
  ];

  const usedFaces = [];
  for (const w of weights) {
    const cssUrl = `${BASE}/${w.file}`;
    const css = await (await fetch(cssUrl)).text();
    const faces = parseFaces(css);
    for (const f of faces) {
      if (!intersects(chars, f.ranges)) continue;
      const fileName = path.basename(f.src);
      const woffUrl = `${BASE}/files/${fileName}`;
      const buf = Buffer.from(await (await fetch(woffUrl)).arrayBuffer());
      fs.writeFileSync(path.join(OUT_DIR, fileName), buf);
      usedFaces.push({
        weight: w.weight,
        fileName,
        ranges: f.ranges.map(([a, b]) => (a === b ? `U+${a.toString(16)}` : `U+${a.toString(16)}-${b.toString(16)}`)).join(", "),
      });
    }
  }

  let out = "/* 自动生成：LXGW WenKai 霞鹜文楷 子集（仅含本站用字），自托管，脱离 CDN。\n";
  out += "   重新生成请运行 scripts/gen-lxgw.mjs。*/\n";
  out += `@font-face{font-family:'LXGW WenKai';font-style:normal;font-display:swap}\n`;
  for (const f of usedFaces) {
    out += `@font-face{font-family:'LXGW WenKai';font-style:normal;font-weight:${f.weight};font-display:swap;src:url('./${f.fileName}') format('woff2');unicode-range:${f.ranges};}\n`;
  }
  fs.writeFileSync(CSS_OUT, out);
  console.log("已生成 @font-face 块数:", usedFaces.length, " 输出:", CSS_OUT);
  const total = fs.readdirSync(OUT_DIR).reduce((s, n) => s + fs.statSync(path.join(OUT_DIR, n)).size, 0);
  console.log("本地字体目录总大小:", (total / 1024 / 1024).toFixed(2), "MB");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
