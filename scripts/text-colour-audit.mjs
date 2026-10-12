#!/usr/bin/env node
import { chromium } from 'playwright';

const base = process.env.SITE_BASE || 'http://127.0.0.1:8080';
const routes = [
  '/about.html',
  '/design-system/',
  '/design-system/case-study.html',
  '/projects/creator-delight/',
  '/projects/gamers_compete_with_ease/',
  '/projects/game-room-ownership-transfer/',
];
const browser = await chromium.launch();
const page = await browser.newPage();
const failures = [];
try {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      const issues = await page.evaluate(() => {
        const root = document.querySelector('.case-study-editorial') || document.body;
        const expected = token => {
          const probe = document.createElement('span');
          probe.style.color = `var(${token})`;
          root.append(probe);
          const value = getComputedStyle(probe).color;
          probe.remove();
          return value;
        };
        const body = expected('--ds-text');
        const heading = expected('--ds-text-heading');
        const issues = [];
        const prose = [...document.querySelectorAll('.cs-lede, .cs-body, .cs-card p, .cs-decision-demo__copy p, .cse-prose p, .cse-prose li, p.cse-prose, .about-page .about-story__copy p, .about-page .about-life__header p, .about-page .about-idea__content p')]
          .filter(el => !el.matches('.cs-title, .cs-h2, .cs-h3, .cs-h4, .cs-teal, .cs-subtitle, .bt-subtitle, .cs-caption, .cs-decision-demo__caption, .cs-callout__label, .cs-summary-list__label, .cs-fact__label, .cs-evidence-card__label, .cse-caption, .cse-heading, .cse-subheading, .cse-result-headline, .cse-result-title, .cse-result-value, .scenario-label, .video-cue') && !el.closest('.cse-note'));
        for (const el of prose) {
          // A documented evidence accent is separate from primary narrative copy.
          if (el.matches('[style*="--cs-teal"]')) continue;
          if (getComputedStyle(el).color !== body) issues.push(`Primary prose uses ${getComputedStyle(el).color}: ${el.textContent.trim().slice(0, 70)}`);
        }
        // The About opening question keeps its documented orange accent.
        for (const el of document.querySelectorAll('.cs-title, .cs-h2, .cs-h3, .cs-h4, .cse-title, .cse-heading, .cse-subheading, .about-page .about-story__subheading, .about-page .about-life h2, .about-page .about-idea h2')) {
          if (getComputedStyle(el).color !== heading) issues.push(`Heading uses ${getComputedStyle(el).color}: ${el.textContent.trim().slice(0, 70)}`);
        }
        if (!prose.length) issues.push('No primary prose found; check route and component coverage');
        if (body === heading) issues.push('Primary prose and heading roles have collapsed into one colour');
        return issues;
      });
      failures.push(...issues.map(issue => `${route} at ${width}px: ${issue}`));
    }
  }
} finally {
  await browser.close();
}
for (const failure of failures) console.error(`ERROR ${failure}`);
console.log(`Text colour audit: ${failures.length ? `${failures.length} error(s).` : 'OK.'}`);
process.exitCode = failures.length ? 1 : 0;
