// 一次性审计：侧栏 TreeNode id 全树查重（跑完即删）
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const keys = (txt, name) => {
  const m = txt.match(new RegExp(`export const ${name}[^=]*=\\s*\\[([^\\]]*)\\]`));
  return m ? [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]) : [];
};
const idsFrom = (txt) => [...txt.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((x) => x[1]);
const nameEns = (txt) => [...txt.matchAll(/nameEn:\s*"([^"]+)"/g)].map((x) => x[1]);

const concepts = read("src/content/concepts.ts");
const examples = read("src/components/examples/pages.tsx");
const glossary = read("src/content/glossary.ts");
const resources = read("src/content/resources.ts");
const backend = read("src/content/backend.ts");

const top = ["home", "concepts", "prompts", "examples", "glossary", "frameworks", "components", "backend", "resources"];
const conceptGroups = keys(concepts, "conceptGroups");
const exampleCats = keys(examples, "exampleCatOrder");
const glossaryCats = keys(glossary, "glossaryCategoryOrder");
const resourceCats = keys(resources, "resourceCategories");
const frameworkGroups = ["frontend", "fullstack", "backend", "edge", "ai"];
const componentCats = ["layout", "form", "navigation", "display", "feedback", "overlay", "charts", "chat", "extra"];
const backendTopics = (read("src/content/backend.ts").match(/export type BackendTopicId =\s*\|?\s*([^;]+);/) ?? [])[1]
  ? [...read("src/content/backend.ts").match(/export type BackendTopicId =\s*\|?\s*([^;]+);/)[1].matchAll(/"([^"]+)"/g)].map((x) => x[1])
  : [];

const groups = {
  "concepts/*": conceptGroups.map((x) => `concepts-${x}`),
  "examples/*": exampleCats.map((x) => `examples-${x}`),
  "glossary/*": glossaryCats.map((x) => `glossary-${x}`),
  "frameworks/*": frameworkGroups.map((x) => `frameworks-${x}`),
  "components/*": componentCats.map((x) => `components-${x}`),
  "backend/*": backendTopics.map((x) => `backend-${x}`),
  "resources/*": resourceCats.map((x) => `resources-${x}`),
};

const leaves = {
  "concepts 叶子": idsFrom(concepts).map((x) => `concepts-${x}`),
  "examples 叶子": idsFrom(examples).filter((x) => !exampleCats.includes(x)).map((x) => `examples-${x}`),
  "components 叶子": componentCats.flatMap((c) => nameEns(read("src/content/components.ts")).map((n) => `components-${c}-${n}`)),
};

// resourceId 函数定义抓出来人工看
const ridDef = resources.match(/export function resourceId[\s\S]{0,200}/)?.[0] ?? "(未找到)";

const all = { 一级: top, ...groups, ...leaves };
const seen = new Map();
for (const [scope, list] of Object.entries(all)) {
  for (const id of list) {
    if (!seen.has(id)) seen.set(id, []);
    seen.get(id).push(scope);
  }
}
console.log("== 分组 key 一览 ==");
for (const [scope, list] of Object.entries(groups)) console.log(scope, "=", list.join(", "));
console.log("\n== 跨分组重复的 id（含一级） ==");
let dup = 0;
for (const [id, scopes] of seen) {
  const uniq = [...new Set(scopes)];
  if (scopes.length > 1 && uniq.length > 1) {
    console.log(`  ${id}  ->  ${scopes.join(" | ")}`);
    dup++;
  }
}
if (!dup) console.log("  (无)");
console.log("\n== resourceId 定义 ==");
console.log(ridDef);
