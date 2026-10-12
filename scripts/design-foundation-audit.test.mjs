import test from 'node:test';
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
