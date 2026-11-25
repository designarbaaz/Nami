import fs from "node:fs";
import path from "node:path";

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(ent.name)) out.push(p);
  }
  return out;
}

const roots = ["components", "app"].map((d) => path.join(process.cwd(), d));
let fixed = 0;
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    let s = fs.readFileSync(file, "utf8");
    const before = s;
    // HTML comments → JSX comments
    s = s.replace(/<!--([\s\S]*?)-->/g, (_, body) => `{/*${body}*/}`);
    if (s !== before) {
      fs.writeFileSync(file, s);
      fixed++;
      console.log("fixed comments:", path.relative(process.cwd(), file));
    }
  }
}
console.log("files fixed:", fixed);
