/**
 * Re-telecharge les images des especes depuis Wikipedia.
 * Lance depuis la racine du projet : node scripts/download-espece-images.mjs
 */

import { createWriteStream, readFileSync } from 'fs';
import { get as httpsGet } from 'https';
import { get as httpGet } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'especes');

const content = readFileSync(path.join(ROOT, 'lib', 'especes.ts'), 'utf8');
const slugs = [];
const sciences = [];
let m;
const slugRe = /slug:\s*'([^']+)'/g;
const sciRe  = /nomScientifique:\s*'([^']+)'/g;
while ((m = slugRe.exec(content)) !== null) slugs.push(m[1]);
while ((m = sciRe.exec(content))  !== null) sciences.push(m[1]);

if (slugs.length !== sciences.length) {
  console.error('Mismatch : ' + slugs.length + ' slugs / ' + sciences.length + ' noms scientifiques');
  process.exit(1);
}
console.log(slugs.length + ' especes a traiter\n');

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? httpsGet : httpGet;
    const file = createWriteStream(dest);
    client(url, { headers: { 'User-Agent': 'AquatopiaBot/1.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => { file.close(); reject(err); });
  });
}

async function getWikipediaImageUrl(sciName) {
  const title = sciName.replace(/ /g, '_');
  const apiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title);
  return new Promise((resolve) => {
    httpsGet(apiUrl, { headers: { 'User-Agent': 'AquatopiaBot/1.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const img = json.originalimage || json.thumbnail;
          resolve(img ? img.source : null);
        } catch { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

const errors = [];
const skipped = [];
const ok = [];

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const sci  = sciences[i];
  const dest = path.join(OUT_DIR, slug + '.webp');

  process.stdout.write('[' + (i + 1) + '/' + slugs.length + '] ' + slug + ' (' + sci + ') ... ');

  const imgUrl = await getWikipediaImageUrl(sci);
  if (!imgUrl) {
    console.log('pas image');
    skipped.push({ slug, sci });
    await delay(300);
    continue;
  }

  try {
    await downloadFile(imgUrl, dest);
    console.log('OK');
    ok.push(slug);
  } catch (err) {
    console.log('ERREUR ' + err.message);
    errors.push({ slug, sci, err: err.message });
  }

  await delay(400);
}

console.log('\n-- Resultat --');
console.log('OK       : ' + ok.length);
console.log('Sans img : ' + skipped.length);
console.log('Erreurs  : ' + errors.length);

if (skipped.length) {
  console.log('\nSans image Wikipedia (a traiter manuellement) :');
  skipped.forEach(({ slug, sci }) => console.log('  ' + slug + '  ->  ' + sci));
}
if (errors.length) {
  console.log('\nErreurs :');
  errors.forEach(({ slug, sci, err }) => console.log('  ' + slug + '  ->  ' + sci + '  (' + err + ')'));
}
