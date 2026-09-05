// 交叉链接审计：校验内容文件里所有站内 href 的锚点真实存在（可复跑做回归）
import fs from "node:fs";
const read = (p) => fs.readFileSync(p, "utf8");

const conceptIds = [...read("src/content/concepts.ts").matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]);
const glossaryIds = [...read("src/content/glossary.ts").matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((m) => m[1]);
const exampleIds = [...read("src/components/examples/pages.tsx").matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((m) => m[1]);
const backendIds = (read("src/content/backend.ts").match(/export type BackendTopicId =\s*\|?\s*([^;]+);/) ?? [])[1]
  ? [...read("src/content/backend.ts").match(/export type BackendTopicId =\s*\|?\s*([^;]+);/)[1].matchAll(/"([^"]+)"/g)].map((x) => x[1])
  : [];
const resourceNames = [...read("src/content/resources.ts").matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
const resourceIds = resourceNames.map((n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
const routes = ["/", "/concepts", "/prompts", "/examples", "/glossary", "/frameworks", "/components", "/backend", "/resources"];
const exampleCats = ["shell", "feedback", "lists", "metrics", "activity"];
// 组件 (nameEn, cat) 对，用于校验 /components?cat=X#Name（与字段顺序无关）
const compSource = read("src/content/components.ts");
const compPairs = [];
{
  const objRe = /\{[^{}]*\}/g;
  let m;
  while ((m = objRe.exec(compSource))) {
    const cat = m[0].match(/"cat":\s*"([^"]+)"/)?.[1];
    const nameEn = m[0].match(/"nameEn":\s*"([^"]+)"/)?.[1];
    if (cat && nameEn) compPairs.push({ cat, nameEn });
  }
}

const files = [
  "src/content/backend.ts",
  "src/content/glossary.ts",
  "src/content/resources.ts",
];
const hrefs = [];
for (const f of files) {
  const txt = read(f);
  for (const m of txt.matchAll(/href:\s*"([^"]+)"/g)) {
    hrefs.push({ file: f.split("/").pop(), href: m[1] });
  }
}

let bad = 0;
for (const { file, href } of hrefs) {
  const [path, hash] = href.split("#");
  if (!hash) {
    if (!routes.includes(path)) {
      console.log(`✗ ${file} ${href} — 未知路由`);
      bad++;
    }
    continue;
  }
  if (path.split("?")[0] === "/components") {
    const cat = new URLSearchParams(path.split("?")[1] ?? "").get("cat") ?? "";
    const target = compPairs.find((c) => c.nameEn === decodeURIComponent(hash));
    if (!target) {
      console.log(`✗ ${file} ${href} — 组件 ${hash} 不存在`);
      bad++;
    } else if (target.cat !== cat) {
      console.log(`✗ ${file} ${href} — 类目不符（实际是 ${target.cat}）`);
      bad++;
    }
    continue;
  }
  let pool;
  if (path === "/concepts") pool = conceptIds;
  else if (path === "/glossary") pool = glossaryIds;
  else if (path === "/examples") pool = [...exampleIds, ...exampleCats];
  else if (path === "/backend") pool = backendIds;
  else if (path === "/resources") pool = resourceIds;
  else {
    console.log(`✗ ${file} ${href} — 未登记的锚点目标页`);
    bad++;
    continue;
  }
  if (!pool.includes(hash)) {
    console.log(`✗ ${file} ${href} — 锚点不存在`);
    bad++;
  }
}
console.log(`共校验 ${hrefs.length} 条站内链接，问题 ${bad} 条`);
