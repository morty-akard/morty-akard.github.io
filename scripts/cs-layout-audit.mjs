#!/usr/bin/env node

import { chromium } from "playwright";
import { auditSectionAlignment } from "./section-layout-check.mjs";

const BASE = process.env.SITE_BASE || "http://127.0.0.1:8080";
const PAGES = [
  "/projects/gamers_compete_with_ease/",
  "/projects/gamers_compete_with_ease/full/",
  "/projects/game-room-ownership-transfer/",
];
const WIDTHS = [390, 768, 1440, 2008];

let failures = 0;

function fail(path, message) {
  console.error(`ERROR ${path}: ${message}`);
  failures += 1;
}

const browser = await chromium.launch({ headless: true });

for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  for (const path of PAGES) {
    const page = await context.newPage();
    try {
      // Video players can keep the network active indefinitely. Layout depends on
      // fonts and local images, so wait for those rather than third-party traffic.
      await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.evaluate(() => {
        window.__layoutAssetsReady = false;
        Promise.all([
          document.fonts.ready,
          ...[...document.images]
            .filter(image => new URL(image.src, location.href).origin === location.origin)
            .map(image => {
              image.loading = 'eager';
              return image.decode().catch(() => {});
            }),
        ]).then(() => { window.__layoutAssetsReady = true; });
      });
      await page.waitForFunction(() => window.__layoutAssetsReady, null, { timeout: 30000 });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const data = await page.evaluate(() => {
        const hero = document.querySelector(".cs-section--hero");
        const overflow = document.documentElement.scrollWidth > innerWidth;
        const related = [...document.querySelectorAll(".cs-related .cs-related-card, .cs-related .article-card")].map(
          (el) => getComputedStyle(el).flexDirection
        );
        return {
          overflow,
          related,
          hasHero: !!hero,
        };
      });

      data.sectionIssues = await page.evaluate(auditSectionAlignment);

      if (data.overflow) fail(path, `horizontal overflow at ${width}px`);
      if (data.sectionIssues.length) fail(path, `misaligned section columns at ${width}px: ${JSON.stringify(data.sectionIssues)}`);
      if (data.related.some((d) => d !== "column")) fail(path, `related cards not vertical at ${width}px`);
      if (!data.hasHero) fail(path, "missing hero section");
    } catch (e) {
      fail(path, String(e.message || e));
    }
    await page.close();
  }
  await context.close();
}

await browser.close();

console.log(failures ? `\nLayout audit: ${failures} error(s).` : "\nLayout audit: OK.");
process.exitCode = failures ? 1 : 0;
