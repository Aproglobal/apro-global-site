import fs from "node:fs";
import path from "node:path";

const SITE = "https://apro.kukjeint.com";
const outFile = path.join("public", "sitemap.xml");

const urls = [
  "/",
  "/models",
  "/contact",
  "/about",
  "/partners"
];

const today = new Date().toISOString().slice(0, 10);

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${u === "/" ? "0.9" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>\n`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, body);
console.log(`✅ sitemap generated: ${outFile}`);
