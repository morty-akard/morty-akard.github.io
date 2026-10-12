#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function checkFoundation(tokens, styles, pages) {
  const issues = [];
  const definitions = [...tokens.matchAll(/(--ds-[\w-]+)\s*:\s*([^;]+);/g)];
  const names = new Set(definitions.map(m => m[1]));
  if (!names.size) issues.push('No design tokens defined');
  if (definitions.length !== names.size) issues.push('Duplicate design token definitions');
  const dependencies = new Map(definitions.map(m => [m[1], [...m[2].matchAll(/var\(\s*(--ds-[\w-]+)/g)].map(v => v[1])]));
  for (const [file, css] of Object.entries({ 'design-tokens.css': tokens, ...styles, ...pages })) {
    for (const match of css.matchAll(/var\(\s*(--ds-[\w-]+)/g)) {
      if (!names.has(match[1])) issues.push(`${file}: undefined token ${match[1]}`);
    }
  }
  const done = new Set();
  function visit(name, active = new Set()) {
    if (active.has(name)) { issues.push(`Circular design token: ${name}`); return; }
    if (done.has(name)) return;
    const next = new Set(active).add(name);
    for (const dependency of dependencies.get(name) || []) visit(dependency, next);
    done.add(name);
  }
  for (const name of names) visit(name);
  for (const [file, html] of Object.entries(pages)) {
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]).filter(tag => /\brel=["']stylesheet["']/i.test(tag)).map(tag => tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || '');
    const index = name => links.findIndex(href => href.split(/[?#]/)[0].endsWith(`/css/${name}`) || href.split(/[?#]/)[0] === `css/${name}`);
    if (index('site-chrome.css') < 0 && index('case-study.css') < 0) continue;
    const webflow = index('webflow-style.css'), foundation = index('design-tokens.css'), chrome = index('site-chrome.css'), study = index('case-study.css');
    if (!(webflow >= 0 && foundation > webflow && chrome > foundation && (study < 0 || study > chrome))) issues.push(`${file}: expected Webflow → tokens → shared chrome → optional case-study styles`);
    if (links.filter(href => /(?:^|\/)css\/design-tokens\.css(?:\?|$)/.test(href)).length !== 1) issues.push(`${file}: expected exactly one token stylesheet`);
  }
  return [...new Set(issues)];
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(import.meta.dirname, '..');
  const styles = {}, pages = {};
  function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (['.git', 'node_modules', '.agents', '.codex'].includes(entry.name)) continue;
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) scan(absolute);
      else if (entry.name.endsWith('.html') || entry.name.endsWith('.html.template') || entry.name.endsWith('.css')) {
        const relative = path.relative(root, absolute);
        (entry.name.endsWith('.css') ? styles : pages)[relative] = fs.readFileSync(absolute, 'utf8');
      }
    }
  }
  scan(root);
  const tokens = styles['css/design-tokens.css'] || '';
  if (!styles['css/design-tokens.css']) console.error('ERROR Missing css/design-tokens.css');
  delete styles['css/design-tokens.css'];
  const issues = checkFoundation(tokens, styles, pages);
  for (const [file, html] of Object.entries(pages)) {
    for (const tag of html.matchAll(/<link\b[^>]*>/gi)) {
      if (!/\brel=["']stylesheet["']/i.test(tag[0])) continue;
      const href = tag[0].match(/\bhref=["']([^"']+)["']/i)?.[1];
      if (!href || /^(?:[a-z]+:|\/\/)/i.test(href)) continue;
      const local = href.split(/[?#]/)[0];
      const absolute = local.startsWith('/') ? path.join(root, local) : path.resolve(root, path.dirname(file), local);
      if (!fs.existsSync(absolute)) issues.push(`${file}: missing stylesheet ${href}`);
    }
  }
  for (const issue of issues) console.error(`ERROR ${issue}`);
  console.log(`Design foundation audit: ${issues.length ? `${issues.length} error(s).` : 'OK.'}`);
  process.exitCode = issues.length ? 1 : 0;
}
