#!/usr/bin/env node
// Register future opted-in public studies here as well as in site-consistency-audit.mjs.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const BASE = process.env.SITE_BASE || 'http://127.0.0.1:8080';
const ROUTES = ['/design-system/case-study.html', '/projects/creator-delight/', '/projects/gamers_compete_with_ease/'];
const WIDTHS = [390, 479, 480, 767, 768, 988, 1023, 1024, 1075, 1439, 1440, 2008];
const css = fs.readFileSync(path.join(root, 'css/case-study-editorial.css'), 'utf8');
const declared = new Set([...css.matchAll(/(--cse-[\w-]+)\s*:/g)].map(m => m[1]));
const failures = [];
const betatrendsContract = JSON.parse(fs.readFileSync(path.join(root, 'scripts/fixtures/betatrends-refined-content.json'), 'utf8'));
const ariumContract = JSON.parse(fs.readFileSync(path.join(root, 'scripts/fixtures/arium-refined-content.json'), 'utf8'));
for (const asset of ariumContract.assets) {
  const file = path.join(root, 'projects/gamers_compete_with_ease/refined-assets', asset.asset);
  if (!fs.existsSync(file) || createHash('sha256').update(fs.readFileSync(file)).digest('hex') !== asset.sha256) {
    failures.push(`Arium source asset missing or changed: ${asset.asset}`);
  }
}
for (const asset of betatrendsContract.assets) {
  const file = path.join(root, 'projects/creator-delight/refined-assets', asset.asset);
  if (!fs.existsSync(file) || createHash('sha256').update(fs.readFileSync(file)).digest('hex') !== asset.sha256) {
    failures.push(`Betatrends source asset missing or changed: ${asset.asset}`);
  }
}
function check(ok, message) { if (!ok) throw new Error(message); }
for (const match of css.matchAll(/var\(\s*(--cse-[\w-]+)/g)) {
  if (!declared.has(match[1])) failures.push(`Undefined editorial role: ${match[1]}`);
}
for (const match of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{/g)) {
  const selector = match[1].trim();
  if (selector.startsWith('@') || selector.startsWith('/*')) continue;
  // Commas inside :is() / :not() are not separate top-level selectors.
  if (selector.split(/,(?![^()]*\))/).some(part => !part.includes('.case-study-editorial'))) failures.push(`Unscoped editorial selector: ${selector}`);
}
const browser = await chromium.launch({ headless: true });
async function ready(page, route) {
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    window.__editorialAssetsReady = false;
    Promise.all([document.fonts.ready, ...[...document.images].map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })]).then(() => { window.__editorialAssetsReady = true; });
  });
  await page.waitForFunction(() => window.__editorialAssetsReady, null, { timeout: 30000 });
}
async function auditSupportGallery(disclosure, width) {
  const galleries = disclosure.locator('.cse-support-gallery');
  for (const gallery of await galleries.all()) {
    const figures = await gallery.locator(':scope > figure').evaluateAll(elements => elements.map(el => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, bottom: r.bottom };
    }));
    check(figures.every(f => f.width > 0 && f.width <= 281), 'support illustrations exceed their compact width');
    if (figures.length > 1) {
      if (width >= 480 && width < 1024) {
        check(Math.abs(figures[0].y - figures[1].y) < 1 && figures[1].x >= figures[0].x + figures[0].width, 'inline illustrations must appear side by side');
      } else {
        check(Math.abs(figures[0].x - figures[1].x) < 1 && figures[1].y >= figures[0].bottom, 'narrow or margin illustrations must stack without overlap');
      }
    }
  }
}
async function auditSupport(page, width, route) {
  const disclosures = page.locator('.cse-support-disclosure');
  if (!await disclosures.count()) return;
  if (route === '/design-system/case-study.html') check(await disclosures.count() === 2, 'support reference needs short and illustrated examples');
  const states = await disclosures.evaluateAll(elements => elements.map(el => ({ open: el.open, label: el.querySelector('summary').textContent.trim(), named: el.closest('aside').getAttribute('aria-labelledby') === el.querySelector('summary').id })));
  check(states.every(state => state.open === (width >= 1024) && state.label && state.named), 'support defaults or accessible labels are incorrect');
  const first = disclosures.first();
  const summary = first.locator('summary');
  const aside = first.locator('..');
  const primary = aside.locator('..').locator(':scope > :first-child');
  const before = await primary.boundingBox();
  if (width < 1024) {
    const row = await first.boundingBox();
    check(row.y >= before.y + before.height && row.height <= 120, 'illustrated story must be a compact row after the complete story group');
    check(!await first.locator('.cse-support-content').isVisible(), 'collapsed support still exposes its content');
    await page.keyboard.press('Tab');
    await summary.focus();
    check(await summary.evaluate(el => getComputedStyle(el).outlineWidth === '3px'), 'support summary has no visible keyboard focus');
    await summary.press('Enter');
    await page.waitForFunction(() => document.querySelector('.cse-support-disclosure').open);
    check(await first.locator('.cse-support-content').isVisible(), 'opening does not reveal the supporting content');
    await auditSupportGallery(first, width);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'expanded supporting content overflows the viewport');
    check(await summary.evaluate(el => parseFloat(getComputedStyle(el).transitionDuration) < .01), 'support does not respect reduced motion');
    const after = await primary.boundingBox();
    check(Math.abs(after.x - before.x) < 1 && Math.abs(after.width - before.width) < 1, 'opening support shifts or resizes primary content');
    await first.locator('.cse-support-content').evaluate(el => { el.tabIndex = -1; el.focus(); });
    await page.keyboard.press('Escape');
    check(!await first.evaluate(el => el.open) && await summary.evaluate(el => el === document.activeElement), 'Escape leaves content open or loses focus');
    await summary.press('Space');
    await page.waitForFunction(() => document.querySelector('.cse-support-disclosure').open);
    await disclosures.last().locator('summary').press('Enter');
    check(await disclosures.evaluateAll(elements => elements[0].open && elements.at(-1).open), 'support unnecessarily permits only one open story');
    await summary.press('Space');
    await page.waitForFunction(() => !document.querySelector('.cse-support-disclosure').open);
    await disclosures.last().locator('summary').press('Enter');
    if (width === 390) {
      await page.setViewportSize({ width: 1024, height: 900 });
      await page.waitForFunction(() => document.querySelector('.cse-support-disclosure').open);
      await first.locator('.cse-support-content').evaluate(el => { el.tabIndex = -1; el.focus({ preventScroll: true }); });
      await page.setViewportSize({ width: 1023, height: 900 });
      await page.waitForFunction(() => !document.querySelector('.cse-support-disclosure').open);
      check(await summary.evaluate(el => el === document.activeElement), 'resize leaves focus in hidden support');
      await page.setViewportSize({ width, height: 900 });
      await summary.press('Enter');
      await page.waitForFunction(() => document.querySelector('.cse-support-disclosure').open);
      await page.setViewportSize({ width: 1024, height: 900 });
      await page.setViewportSize({ width, height: 900 });
      check(await first.evaluate(el => el.open), 'resize forgets the inline reader choice');
      await summary.press('Escape');
    }
  }
  if (width >= 1024) await auditSupportGallery(first, width);
  if (route === '/design-system/case-study.html' && process.env.CSE_SUPPORT_CAPTURE_DIR && [390, 1075, 1440].includes(width)) {
    fs.mkdirSync(process.env.CSE_SUPPORT_CAPTURE_DIR, { recursive: true });
    const options = { style: '.site-nav-section, .cse-toc { visibility: hidden !important; }' };
    await aside.screenshot({ ...options, path: path.join(process.env.CSE_SUPPORT_CAPTURE_DIR, `support-${width}.png`) });
    if (width < 1024) {
      await summary.press('Enter');
      await aside.screenshot({ ...options, path: path.join(process.env.CSE_SUPPORT_CAPTURE_DIR, `support-open-${width}.png`) });
      await summary.press('Escape');
    }
  }
  await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
  await page.waitForFunction(() => document.querySelector('.cse-toc').dataset.visible === 'false');
}
for (const route of ROUTES) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    // Local geometry checks should not hang on the external font service.
    // Actual font delivery is inspected in the browser preview separately.
    await context.route('https://**/*', request => request.abort());
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await ready(page, route);
      if (route === '/projects/gamers_compete_with_ease/' && width === WIDTHS[0]) {
        const content = await page.locator('.cse-article').evaluate(article => {
          const normalise = text => text.replace(/\s+/g, ' ').trim();
          return {
            blocks: [...article.querySelectorAll('[data-arium-source]')].map(el => ({ id: el.dataset.ariumSource, text: normalise(el.textContent) })),
            emphasis: [...article.querySelectorAll('strong, em')].map(el => [el.tagName.toLowerCase(), normalise(el.textContent)]),
            links: [...article.querySelectorAll('[data-arium-link]')].map(el => ({ id: el.dataset.ariumLink, text: normalise(el.textContent), href: el.getAttribute('href') })),
            media: [...article.querySelectorAll('[data-arium-media]')].map(el => ({ id: el.dataset.ariumMedia, tag: el.tagName.toLowerCase(), attributes: Object.fromEntries(['width', 'height', 'alt', 'aria-label', 'aria-describedby', 'src', 'poster'].filter(key => el.hasAttribute(key)).map(key => [key, el.getAttribute(key)])) })),
            sections: [...article.querySelectorAll('.cse-section')].map(el => el.id),
            facts: [...article.querySelectorAll('[data-cse-opening] > .cse-facts > div')].map(el => normalise(el.textContent)),
            videos: [...article.querySelectorAll('video')].every(el => el.controls && el.hasAttribute('playsinline') && el.preload === 'none' && !el.autoplay && el.loop === el.hasAttribute('data-arium-autoplay') && el.poster && (el.closest('.arium-previews') ? el.querySelector('a[href]') : el.closest('figure').querySelector('[data-arium-added-link]'))),
          };
        });
        for (const key of ['blocks', 'emphasis', 'links', 'media', 'sections']) {
          check(JSON.stringify(content[key]) === JSON.stringify(ariumContract[key]), `Arium approved source ${key} changed or moved`);
        }
        check(content.facts.length === 4 && content.videos, 'Arium opening facts or reader-controlled video access is missing');
      }
      if (route === '/projects/creator-delight/' && width === WIDTHS[0]) {
        const content = await page.locator('.cse-article').evaluate(article => {
          const normalise = text => text.replace(/\s+/g, ' ').trim();
          const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
          const textNodes = []; let node;
          while ((node = walker.nextNode())) { const value = normalise(node.textContent); if (value) textNodes.push(value); }
          return { textNodes, emphasis: [...article.querySelectorAll('strong, em')].map(el => [el.tagName.toLowerCase(), normalise(el.textContent)]) };
        });
        check(JSON.stringify(content.textNodes) === JSON.stringify(betatrendsContract.textNodes), 'Betatrends exact story wording/order differs from the approved v5 source');
        check(JSON.stringify(content.emphasis) === JSON.stringify(betatrendsContract.emphasis), 'Betatrends source emphasis changed');
      }
      const data = await page.evaluate(() => {
        const box = el => { const r = el.getBoundingClientRect(); return { x: r.x, right: r.right, y: r.y, width: r.width }; };
        const links = [...document.querySelectorAll('.cse-toc a')];
        const sections = [...document.querySelectorAll('.cse-section')];
        const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
        const missingLinks = [...document.querySelectorAll('a[href]')].filter(link => link.hash && new URL(link.href).pathname === location.pathname && !document.getElementById(link.hash.slice(1))).map(link => link.href);
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          duplicateIDs: ids.length !== new Set(ids).size,
          missingLinks,
          links: links.map(link => link.hash), sections: sections.map(el => `#${el.id}`),
          current: links.filter(link => link.getAttribute('aria-current') === 'location').length,
          legacy: !!document.querySelector('link[href$="/case-study.css"], .case-study-page, .cs-section'),
          brokenImages: [...document.images].filter(img => !img.naturalWidth || !img.hasAttribute('alt') || !img.width || !img.height).length,
          stylesLoaded: [...document.querySelectorAll('link[rel="stylesheet"]')].filter(link => new URL(link.href).origin === location.origin).every(link => !!link.sheet),
          bounds: [...document.querySelectorAll('.cse-section > .cse-prose, .cse-section > .cse-heading, .cse-section > .cse-title, .cse-section > .cse-caption, .cse-section > .cse-result:not(.cse-wide), .cse-pair > .cse-prose, .cse-support-main > .cse-prose, .cse-support-main > .cse-heading, .cse-support-main > .cse-subheading')].map(box),
          defaultVisuals: [...document.querySelectorAll('.cse-section > .cse-figure:not(.cse-wide), .cse-pair > .cse-figure:not(.cse-wide), .cse-section > .cse-comparison:not(.cse-wide), .cse-support-main > .cse-figure:not(.cse-wide), .cse-support-main > .cse-comparison:not(.cse-wide)')].map(box),
          results: [...document.querySelectorAll('.cse-result')].map(el => ({
            labelled: !!document.getElementById(el.getAttribute('aria-labelledby')),
            source: !!el.querySelector('.cse-result-source')?.textContent.trim(),
            values: el.querySelectorAll('.cse-result-value').length,
            labels: el.querySelectorAll('.cse-results-grid dt').length,
            columns: getComputedStyle(el.querySelector('.cse-results-grid')).gridTemplateColumns.split(' ').length,
          })),
          devices: [...document.querySelectorAll('.cse-device')].map(device => {
            const shell = device.querySelector('.cse-device-shell');
            const media = device.querySelector('img, video');
            const figure = device.closest('figure');
            return { box: box(device), shell: box(shell), screen: box(media), height: media.getBoundingClientRect().height,
              ratio: Number(media.getAttribute('width')) / Number(media.getAttribute('height')),
              phone: device.classList.contains('cse-device--phone'),
              composite: !!device.closest('.arium-previews'),
              captionOutside: !!figure?.querySelector(':scope > figcaption.cse-caption'),
              naturalSizing: getComputedStyle(media).objectFit !== 'cover',
              playable: media.tagName !== 'VIDEO' || (media.controls && !media.autoplay && media.hasAttribute('playsinline') && media.preload === 'none' && (device.closest('.arium-previews') ? !!media.querySelector('a[href]') : !!figure.querySelector('figcaption a[href]'))),
            };
          }),
          media: [...document.querySelectorAll('.cse-media')].filter(el => el.getBoundingClientRect().width > 0).map(box),
          notes: [...document.querySelectorAll('.cse-note')].map(note => ({ note: box(note), fragment: box(note.previousElementSibling), support: note.classList.contains('cse-support') })),
          noindex: document.querySelector('meta[name="robots"]')?.content.includes('noindex'),
          toc: box(document.querySelector('.cse-toc')),
        };
      });
      check(!data.overflow && !data.duplicateIDs && !data.missingLinks.length, 'overflow, duplicate IDs, or broken fragment links');
      check(!data.legacy && data.stylesLoaded && !data.brokenImages, 'legacy style coupling, missing stylesheet, or broken/unlabelled image');
      check(data.noindex || route !== '/design-system/case-study.html', 'reference must stay noindex');
      check(data.current === 1 && JSON.stringify(data.links) === JSON.stringify(data.sections), 'TOC must cover each section once and mark one current section');
      check(await page.locator('.cse-toc a').evaluateAll(links => links.every(link => link.getAttribute('aria-label') === link.querySelector('.cse-nav-label').textContent.trim())), 'collapsed links lose their complete accessible names');
      check(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto'), 'reduced motion leaves smooth anchor scrolling enabled');
      for (const b of data.bounds) check(b.width <= 761 && Math.abs(b.x + b.width / 2 - width / 2) <= 1, 'reading column is not centred or exceeds 760px');
      for (const b of data.defaultVisuals) check(b.width <= 761 && Math.abs(b.x + b.width / 2 - width / 2) <= 1, 'default visual is not aligned with the centred reading column');
      if (route === '/design-system/case-study.html') check(data.results.length >= 1, 'results reference is missing its reusable example');
      for (const result of data.results) check(result.labelled && (result.source || route === '/design-system/case-study.html') && result.values > 0 && result.values === result.labels && result.columns === (width < 768 ? 1 : 2), 'result labels, source context, or responsive columns are missing');
      if (route === '/design-system/case-study.html') check(data.devices.length === 2 && data.devices.some(d => d.phone) && data.devices.some(d => !d.phone), 'phone or desktop device reference is missing');
      for (const device of data.devices) {
        check((device.composite || Math.abs(device.box.x + device.box.width / 2 - width / 2) <= 1) && (!device.phone || device.box.width <= 321), 'device frame is not centred or phone exceeds its cap');
        check(device.screen.x > device.shell.x && device.screen.right < device.shell.right && Math.abs(device.screen.width / device.height - device.ratio) < .01, 'device clips or stretches its screen');
        check(device.captionOutside && device.naturalSizing && device.playable, 'device caption, natural media sizing, or reader-controlled playback is missing');
      }
      if (route === '/projects/gamers_compete_with_ease/') {
        const previews = await page.locator('.arium-previews > .cse-device').evaluateAll(devices => devices.map(el => {
          const r = el.getBoundingClientRect(); return { x: r.x, right: r.right, y: r.y, width: r.width };
        }));
        check(previews.length === 2 && previews.every(p => p.width > 0) && Math.abs(previews[0].y - previews[1].y) < 1 && previews[0].right < previews[1].x, 'Arium devices must remain side by side at every width');
        check(await page.locator('[data-arium-fullscreen]:visible').count() === (width < 768 ? 2 : 0), 'Arium tap-to-fullscreen must be available only on mobile');
        const supporting = page.locator('.arium-support-disclosure');
        check(await supporting.count() === 3 && await supporting.evaluateAll(elements => elements.every(el => !el.open && el.parentElement.classList.contains('cse-section'))), 'Arium evidence must start collapsed in the reading flow at every width');
        check(await page.locator('.cse-note, .cse-support, .cse-pair').count() === 0, 'Arium must not place supporting evidence in the side rail');
        for (const disclosure of await supporting.all()) {
          await disclosure.locator('summary').evaluate(el => el.click());
          const geometry = await disclosure.evaluate(el => {
            const r = el.getBoundingClientRect();
            return { open: el.open, centre: r.x + r.width / 2, width: r.width, figures: [...el.querySelectorAll('figure')].every(figure => figure.getBoundingClientRect().width > 0) };
          });
          check(geometry.open && geometry.figures && geometry.width <= 761 && Math.abs(geometry.centre - width / 2) < 1, 'Arium disclosure or expanded evidence leaves the centred reading flow');
          await disclosure.locator('summary').evaluate(el => el.click());
        }
      }
      if (route === '/design-system/case-study.html' && width === WIDTHS[0]) {
        const video = page.locator('.cse-device video');
        await video.scrollIntoViewIfNeeded();
        await video.evaluate(el => { el.preload = 'metadata'; el.load(); });
        await page.waitForFunction(() => { const v = document.querySelector('.cse-device video'); return v.readyState >= 1 || v.error; }, null, { timeout: 15000 });
        check(await video.evaluate(el => !el.error && el.videoWidth === el.width && el.videoHeight === el.height), 'device video is broken or intrinsic dimensions are incorrect');
        await video.evaluate(async el => { el.muted = true; await el.play(); });
        await page.waitForFunction(() => document.querySelector('.cse-device video').currentTime > .05, null, { timeout: 5000 });
        await video.evaluate(el => { el.pause(); el.muted = false; });
        // Verify both media types inside both silhouettes without changing the reference.
        const swapped = await page.evaluate(() => {
          const phone = document.querySelector('.cse-device--phone .cse-device-shell');
          const desktop = document.querySelector('.cse-device--desktop .cse-device-shell');
          const image = phone.querySelector('.cse-media');
          const recording = desktop.querySelector('.cse-media');
          phone.append(recording); desktop.append(image);
          const valid = [...document.querySelectorAll('.cse-device')].every(device => {
            const el = device.querySelector('img, video'); const r = el.getBoundingClientRect(); const shell = device.querySelector('.cse-device-shell').getBoundingClientRect();
            return r.left >= shell.left && r.right <= shell.right && Math.abs(r.width / r.height - Number(el.getAttribute('width')) / Number(el.getAttribute('height'))) < .01;
          });
          phone.append(image); desktop.append(recording);
          return valid;
        });
        check(swapped, 'phone video or desktop image clips or distorts media');
        await video.evaluate(el => { el.preload = 'none'; el.load(); });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForFunction(() => document.querySelector('.cse-toc').dataset.visible === 'false');
      }
      if (route === '/design-system/case-study.html' && process.env.CSE_CAPTURE_DIR && [390, 1075, 1440].includes(width)) {
        fs.mkdirSync(process.env.CSE_CAPTURE_DIR, { recursive: true });
        for (const kind of ['phone', 'desktop']) await page.locator(`.cse-device--${kind}`).screenshot({ path: path.join(process.env.CSE_CAPTURE_DIR, `${kind}-${width}.png`) });
        // Captures scroll the page; restore the opening before navigation checks.
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForFunction(() => document.querySelector('.cse-toc').dataset.visible === 'false');
      }
      for (const b of data.media) {
        check(b.width <= 1201 && b.x >= 0 && b.right <= width, 'evidence exceeds the central column');
        if (width >= 1024) check(b.x >= data.toc.right + 15, 'evidence collides with the left rail');
      }
      for (const { note, fragment, support } of data.notes) {
        if (width >= 1440 || (support && width >= 1024)) check(note.x >= fragment.right + (width >= 1440 ? 31 : 23) && Math.abs(note.y - fragment.y) < 1, 'note is not beside its related fragment');
        else check(note.y > fragment.y && note.x >= 0 && note.right <= width, 'note does not follow its fragment');
      }
      await auditSupport(page, width, route);
      check(await page.locator('.cse-toc').evaluate(el => el.inert && el.dataset.visible === 'false'), 'navigator should stay hidden and out of keyboard order during the opening');
      const oldBounds = data.bounds;
      const newBounds = await page.evaluate(() => {
        document.querySelectorAll('.cse-note').forEach(note => note.remove());
        return [...document.querySelectorAll('.cse-section > .cse-prose, .cse-section > .cse-heading, .cse-section > .cse-title, .cse-section > .cse-caption, .cse-section > .cse-result:not(.cse-wide), .cse-pair > .cse-prose, .cse-support-main > .cse-prose, .cse-support-main > .cse-heading, .cse-support-main > .cse-subheading')].map(el => { const r = el.getBoundingClientRect(); return { x: r.x, width: r.width }; });
      });
      check(newBounds.every((b, i) => Math.abs(b.x - oldBounds[i].x) < 1 && Math.abs(b.width - oldBounds[i].width) < 1), 'removing notes moves or resizes the reading column');
      await ready(page, route);
      await page.locator('.cse-section').nth(1).evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
      await page.waitForFunction(() => document.querySelector('.cse-toc').dataset.visible === 'true');
      await page.waitForFunction(() => { const s = getComputedStyle(document.querySelector('.cse-toc')); return s.visibility === 'visible' && s.opacity === '1'; }, null, { timeout: 5000 });
      check(await page.locator('.cse-toc').evaluate(el => !el.inert), 'visible navigator remains inert');
      if (width >= 1024) {
        await page.waitForFunction(() => [...document.querySelectorAll('.cse-toc a:not([aria-current]) .cse-nav-label')].every(label => getComputedStyle(label).opacity === '0'), null, { timeout: 5000 });
        const collapsed = await page.locator('.cse-toc').evaluate(el => [...el.querySelectorAll('a:not([aria-current]) .cse-nav-label')].every(label => getComputedStyle(label).opacity === '0'));
        check(collapsed, 'inactive desktop names are not collapsed');
        const active = await page.locator('.cse-toc [aria-current] .cse-nav-label').evaluate(el => getComputedStyle(el).opacity);
        check(active === '1', 'the current section name is hidden');
      }
      if (width < 1024) {
        const dock = await page.evaluate(() => {
          const header = document.querySelector('.floating-nav').getBoundingClientRect();
          const bar = document.querySelector('.cse-toc').getBoundingClientRect();
          return { gap: bar.top - header.bottom, x: bar.x - header.x, width: bar.width - header.width, height: bar.height };
        });
        check(Math.abs(dock.gap) < 1 && Math.abs(dock.x) < 1 && Math.abs(dock.width) < 1 && dock.height <= 45, 'mobile section row is not slim and flush with the header');
        check(!await page.locator('.cse-toc').evaluate(el => el.open), 'enhanced mobile disclosure should start collapsed');
        // Playwright's click scrolls the sticky header's source position into view.
        // Focus without scrolling and activate it with the keyboard instead.
        await page.locator('.floating-nav__toggle').evaluate(el => el.focus({ preventScroll: true }));
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => document.querySelector('.cse-toc').inert, null, { timeout: 5000 });
        check(await page.locator('.cse-toc').evaluate(el => getComputedStyle(el).visibility === 'hidden'), 'website menu does not suppress the section control');
        // Playwright's click scrolls the sticky header's source position into view.
        // Focus without scrolling and activate it with the keyboard instead.
        await page.locator('.floating-nav__toggle').evaluate(el => el.focus({ preventScroll: true }));
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => { const toc = document.querySelector('.cse-toc'); return !toc.inert && getComputedStyle(toc).visibility === 'visible'; }, null, { timeout: 5000 });
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        await page.locator('.cse-toc summary').evaluate(el => el.focus({ preventScroll: true }));
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => document.querySelector('.cse-toc').open, null, { timeout: 5000 });
        check(await page.locator('.cse-toc').evaluate(el => el.open), 'keyboard cannot open disclosure');
      }
      const link = page.locator('.cse-toc a').nth(Math.min(2, data.links.length - 1));
      const targetID = (await link.getAttribute('href')).slice(1);
      // Enter keyboard modality; programmatic focus after pointer navigation
      // alone need not match :focus-visible in a browser.
      await page.keyboard.press('Tab');
      // Native Tab can scroll to the nearest figure before scroll tracking runs.
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await page.waitForFunction(() => { const toc = document.querySelector('.cse-toc'); return !toc.inert && getComputedStyle(toc).visibility === 'visible'; }, null, { timeout: 5000 });
      const readingScroll = await page.evaluate(() => scrollY);
      await link.evaluate(el => el.focus({ preventScroll: true }));
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      check(Math.abs(await page.evaluate(() => scrollY) - readingScroll) < 1, 'focusing section links moves the reading position');
      const focus = await link.evaluate(el => { const s = getComputedStyle(el); return { width: s.outlineWidth, style: s.outlineStyle, active: document.activeElement === el, visible: el.matches(':focus-visible'), tag: document.activeElement?.tagName, cls: document.activeElement?.className, inert: el.closest('.cse-toc').inert, visibility: getComputedStyle(el.closest('.cse-toc')).visibility, open: el.closest('.cse-toc').open, shown: el.closest('.cse-toc').dataset.visible, scroll: scrollY };  });
      check(focus.width === '3px' && focus.style !== 'none', `keyboard focus is not visible (${JSON.stringify(focus)})`);
      if (width >= 1024) {
        await page.waitForTimeout(220);
        check(await page.locator('.cse-toc').getAttribute('data-visible') === 'true', 'keyboard reveal unexpectedly hides the navigator');
        check(await page.locator('.cse-toc').evaluate(el => [...el.querySelectorAll('.cse-nav-label')].every(label => getComputedStyle(label).opacity === '1')), 'keyboard focus does not reveal every section name');
        const articleBefore = await page.locator('.cse-heading').first().boundingBox();
        await link.blur();
        await page.mouse.move(width - 10, 800);
        await page.waitForTimeout(220);
        await page.locator('.cse-toc').hover();
        await page.waitForTimeout(220);
        check(await page.locator('.cse-toc').evaluate(el => [...el.querySelectorAll('.cse-nav-label')].every(label => getComputedStyle(label).opacity === '1')), 'hover does not reveal every section name');
        const articleAfter = await page.locator('.cse-heading').first().boundingBox();
        check(Math.abs(articleBefore.x - articleAfter.x) < 1, 'expanding navigation shifts the article');
      }
      await link.click();
      await page.waitForTimeout(100);
      const target = await page.locator(`[id="${targetID}"]`).evaluate(el => ({ y: el.getBoundingClientRect().top, header: document.querySelector('.site-nav-section').getBoundingClientRect().bottom, toc: document.querySelector('.cse-toc').getBoundingClientRect().bottom }));
      check(target.y >= target.header && (width >= 1024 || target.y >= target.toc), 'anchor heading is obscured by sticky controls');
      check(await link.getAttribute('aria-current') === 'location', `selected section is not reflected in navigation (${JSON.stringify(await page.evaluate(() => ({ current: document.querySelector('.cse-toc [aria-current]')?.hash, offset: getComputedStyle(document.body).getPropertyValue('--cse-header-offset'), target: document.querySelector(document.querySelector('.cse-toc a:focus')?.hash || '.cse-section').getBoundingClientRect().top })))})`);
      if (width < 1024) {
        check(!await page.locator('.cse-toc').evaluate(el => el.open), 'mobile disclosure stays open after selection');
        check((await page.locator('.cse-toc-current').textContent()).trim() === (await link.textContent()).trim(), 'mobile bar does not show the current section');
        await page.locator('.cse-toc summary').press('Enter');
        await page.keyboard.press('Escape');
        check(!await page.locator('.cse-toc').evaluate(el => el.open), 'Escape does not close the section menu');
      }
      // A long list must stay usable inside the viewport, including compact mode.
      await page.evaluate(() => { const list = document.querySelector('.cse-toc ul'); for (let i = 0; i < 30; i++) list.append(list.firstElementChild.cloneNode(true)); document.querySelector('.cse-toc').open = true; });
      const longList = await page.locator('.cse-toc nav').evaluate(el => ({ overflow: getComputedStyle(el).overflowY, height: el.clientHeight, total: el.scrollHeight, bottom: el.getBoundingClientRect().bottom }));
      check(longList.overflow === 'auto' && longList.total > longList.height && longList.bottom <= 901, 'long section lists cannot scroll inside the viewport');
      // Simulate future semantic overrides, without adding a theme implementation.
      await page.evaluate(() => {
        const root = document.querySelector('.case-study-editorial');
        root.style.setProperty('--ds-background', 'rgb(240, 240, 240)');
        root.style.setProperty('--ds-text', 'rgb(20, 20, 20)');
        root.style.setProperty('--ds-text-heading', 'rgb(30, 40, 50)');
      });
      await page.waitForFunction(() => getComputedStyle(document.querySelector('.case-study-editorial')).backgroundColor === 'rgb(240, 240, 240)' && getComputedStyle(document.querySelector('.cse-heading')).color === 'rgb(30, 40, 50)', null, { timeout: 5000 });
      const semanticColours = await page.evaluate(() => ({
        body: getComputedStyle(document.querySelector('.case-study-editorial')).color,
        resultHeadings: [...document.querySelectorAll('.cse-result-title, .cse-result-headline, .cse-result-value')].map(el => getComputedStyle(el).color),
      }));
      check(semanticColours.body === 'rgb(20, 20, 20)', 'editorial body does not inherit the shared body-text role');
      check(semanticColours.resultHeadings.every(colour => colour === 'rgb(30, 40, 50)'), 'result titles, headlines, or values do not inherit the shared heading role');
      // The control intentionally stays available while it owns keyboard focus.
      // Release focus before testing its opening-boundary disappearance.
      await page.evaluate(() => document.activeElement?.blur());
      await page.locator('.cse-section').first().evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
      await page.waitForFunction(() => document.querySelector('.cse-toc').dataset.visible === 'false');
      check(!errors.length, `JavaScript errors: ${errors.join(', ')}`);
      console.log(`OK ${route} at ${width}px`);
    } catch (error) { failures.push(`${route} at ${width}px: ${error.message}`); }
    finally { await context.close(); }
  }
  for (const width of [390, 1200, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: false });
    await context.route('https://**/*', request => request.abort());
    const page = await context.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
      check(await page.locator('.cse-toc a').first().isVisible(), 'section links unavailable without JavaScript');
      if (route === '/projects/gamers_compete_with_ease/') {
        const supporting = page.locator('.arium-support-disclosure');
        check(await supporting.count() === 3 && await supporting.evaluateAll(elements => elements.every(el => !el.open)), 'Arium native disclosures should match the refined source defaults');
        for (const disclosure of await supporting.all()) {
          await disclosure.locator('summary').press('Enter');
          check(await disclosure.locator('.cse-media').first().isVisible(), 'Arium supporting evidence cannot be expanded without JavaScript');
        }
      }
      const supports = page.locator('.cse-support-disclosure');
      if (await supports.count()) {
        check(await supports.evaluateAll(elements => elements.every(el => el.open)), 'support is hidden without JavaScript');
        const control = supports.first().locator('summary');
        await control.press('Enter');
        check(!await supports.first().evaluate(el => el.open), 'native support control fails without JavaScript');
        await control.press('Enter');
        check(await supports.first().locator('.cse-media').first().isVisible(), 'native support cannot reveal its content');
      }
      // Native disclosure keyboard checks focus deep content. Release that focus
      // and cancel its smooth scroll before the independent pointer-anchor check.
      await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
      // requestAnimationFrame callbacks do not run with JavaScript disabled.
      // Allow native focus/scroll and image layout to settle from the test runner.
      await page.waitForTimeout(300);
      const nativeLink = page.locator('.cse-toc a').last();
      const nativeHash = await nativeLink.getAttribute('href');
      await nativeLink.click();
      check(new URL(page.url()).hash === nativeHash, 'native anchors fail without JavaScript');
      const nativePosition = await page.locator(`[id="${nativeHash.slice(1)}"]`).evaluate(el => ({ top: el.getBoundingClientRect().top, header: document.querySelector('.site-nav-section').getBoundingClientRect().bottom }));
      check(nativePosition.top >= nativePosition.header, 'native heading is obscured without JavaScript');
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no-JavaScript layout overflows');
    } catch (error) { failures.push(`${route}, no JavaScript at ${width}px: ${error.message}`); }
    finally { await context.close(); }
  }
}
// Exercise actual touch selection and smooth-scroll completion as well as
// the reduced-motion geometry checks above.
const touchContext = await browser.newContext({ viewport: { width: 1396, height: 855 }, hasTouch: true });
await touchContext.route('https://**/*', request => request.abort());
const touchPage = await touchContext.newPage();
try {
  await ready(touchPage, `${ROUTES[0]}#context`);
  const link = touchPage.locator('.cse-toc a').nth(2);
  await link.tap();
  check(await touchPage.locator('.cse-toc').getAttribute('data-expanded') === 'true', 'first desktop touch does not reveal the section list');
  check(new URL(touchPage.url()).hash === '#context', 'first desktop touch unexpectedly navigates');
  await link.tap();
  await touchPage.waitForFunction(() => {
    const root = document.querySelector('.case-study-editorial');
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    return location.hash === '#directions' && Math.abs(target.getBoundingClientRect().top - parseFloat(getComputedStyle(root).getPropertyValue('--cse-header-offset'))) < 2;
  }, null, { timeout: 5000 });
  check(await touchPage.locator('.cse-toc a').nth(2).getAttribute('aria-current') === 'location', 'smooth touch jump does not update location');
  await touchPage.goBack();
  await touchPage.waitForFunction(() => document.querySelector('.cse-toc [aria-current]')?.hash === '#context', null, { timeout: 5000 });
  console.log('OK desktop touch reveal, smooth jump, and history');
} catch (error) { failures.push(`Touch / normal motion: ${error.message}`); }
finally { await touchContext.close(); }
await browser.close();
for (const issue of failures) console.error(`ERROR ${issue}`);
console.log(`Editorial template audit: ${failures.length ? `${failures.length} error(s).` : 'OK.'}`);
process.exitCode = failures.length ? 1 : 0;
