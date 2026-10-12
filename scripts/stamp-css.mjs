// Stamps the stylesheet link with a content hash.
//
// assets/css/styles.css lives at a fixed URL, so without this a returning
// visitor can be served fresh HTML alongside a cached older stylesheet and get
// a broken layout until the cache expires. Hashing the query string means any
// CSS change produces a new URL, so the two can never desync.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const CSS = 'assets/css/styles.css';
const HTML = 'index.html';

const hash = createHash('sha256').update(readFileSync(CSS)).digest('hex').slice(0, 8);
const html = readFileSync(HTML, 'utf8');
const next = html.replace(
  /href="assets\/css\/styles\.css(?:\?v=[a-f0-9]+)?"/,
  `href="${CSS}?v=${hash}"`
);

if (next === html) {
  if (!html.includes(`${CSS}?v=${hash}`)) {
    console.error(`stamp-css: could not find the stylesheet link in ${HTML}`);
    process.exit(1);
  }
  console.log(`stamp-css: already current (${hash})`);
} else {
  writeFileSync(HTML, next);
  console.log(`stamp-css: stylesheet stamped ?v=${hash}`);
}
