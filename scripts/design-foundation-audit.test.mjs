import test from 'node:test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { checkFoundation } from './design-foundation-audit.mjs';
const token = ':root { --ds-text: #fff1df; }';
const page = '<link href="../../css/webflow-style.css" rel="stylesheet"><link href="../../css/design-tokens.css" rel="stylesheet"><link href="../../css/site-chrome.css" rel="stylesheet"><link href="../../css/case-study.css" rel="stylesheet">';
test('nested page paths and versioned stylesheet links are accepted', () => {
  assert.deepEqual(checkFoundation(token, { 'shared.css': 'p { color:var(--ds-text); }' }, { 'nested/index.html': page.replace('site-chrome.css', 'site-chrome.css?v=2') }), []);
});
test('missing or late tokens fail before a page can silently lose styles', () => {
  assert.ok(checkFoundation(token, {}, { page: page.replace('<link href="../../css/design-tokens.css" rel="stylesheet">', '') }).some(s => s.includes('expected Webflow')));
  assert.ok(checkFoundation(token, {}, { page: page.replace('<link href="../../css/design-tokens.css" rel="stylesheet">', '') + '<link href="../../css/design-tokens.css" rel="stylesheet">' }).some(s => s.includes('expected Webflow')));
  assert.ok(checkFoundation(token, {}, { page: page + '<link href="../../css/design-tokens.css" rel="stylesheet">' }).some(s => s.includes('exactly one')));
});
test('unknown token consumers and circular aliases are rejected', () => {
  assert.ok(checkFoundation(token, { css: 'p { color:var(--ds-typo); }' }, {}).some(s => s.includes('undefined token')));
  assert.ok(checkFoundation(token, {}, { page: '<p style="color:var(--ds-missing)">Text</p>' }).some(s => s.includes('undefined token')));
  assert.ok(checkFoundation(':root { --ds-a:var(--ds-b); --ds-b:var(--ds-a); }', {}, {}).some(s => s.includes('Circular')));
});
test('duplicate definitions are rejected and redirect-only pages are allowed', () => {
  assert.ok(checkFoundation(token + token, {}, {}).some(s => s.includes('Duplicate')));
  assert.deepEqual(checkFoundation(token, {}, { redirect: '<meta http-equiv="refresh" content="0; url=../projects.html">' }), []);
});
test('editorial pages load their opt-in styles after chrome without legacy styles', () => {
  const editorial = page.replace('case-study.css', 'case-study-editorial.css');
  assert.deepEqual(checkFoundation(token, {}, { page: editorial }), []);
  assert.ok(checkFoundation(token, {}, { page: editorial + '<link href="../../css/case-study.css" rel="stylesheet">' }).some(s => s.includes('independent')));
  const early = editorial.replace('<link href="../../css/case-study-editorial.css" rel="stylesheet">', '');
  assert.ok(checkFoundation(token, {}, { page: '<link href="../../css/case-study-editorial.css" rel="stylesheet">' + early }).some(s => s.includes('follow shared chrome')));
});

test('editorial starter retains opening facts and all verified-field placeholders', () => {
  const starter = fs.readFileSync(new URL('../templates/case-study.html.template', import.meta.url), 'utf8');
  const file = 'templates/case-study.html.template';
  assert.deepEqual(checkFoundation(token, {}, { [file]: starter }), []);
  const facts = starter.match(/<dl class="cse-facts">[^]*?<\/dl>/)[0];
  for (const changed of [starter.replace(facts, ''), starter.replace(facts, '') + facts, starter.replace(facts, `<!-- ${facts} -->`)]) {
    assert.ok(checkFoundation(token, {}, { [file]: changed }).some(s => s.includes('opening dl.cse-facts')));
  }
  assert.ok(checkFoundation(token, {}, { [file]: starter.replace('{{COLLABORATORS}}', '') }).some(s => s.includes('COLLABORATORS placeholder')));
  // Published pages may legitimately omit unverified fields; this guard is for the starter.
  assert.deepEqual(checkFoundation(token, {}, { 'projects/example/index.html': starter.replace(facts, '') }), []);
});
