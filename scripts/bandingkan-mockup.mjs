// Bandingkan mockup dengan hasil build (A8). Pakai: npm run build && npm run bandingkan
// Playwright, pngjs, dan pixelmatch dipasang sekali ke .cache/bandingkan (bukan dependensi situs).
// Mockup memuat Tailwind, Lucide, dan Google Fonts dari CDN, jadi butuh internet.
import { execSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE = path.join(ROOT, '.cache/bandingkan');
const OUT = path.join(ROOT, 'docs/perbandingan');
const MOCKUP = 'file://' + path.join(ROOT, 'referensi/mockup/ladoob_beyond_smart_travel_landing_page.html');
const PORT = 4329;
const SITUS = `http://localhost:${PORT}/id/`;
const LEBAR = [1440, 1024, 768, 390, 360];
const SECTION = ['hero', 'fitur', 'manfaat', 'harga', 'blog', 'faq'];

if (!fs.existsSync(path.join(CACHE, 'node_modules/playwright'))) {
  execSync(`npm i --no-save --prefix "${CACHE}" playwright@1.65.0 pngjs@7.0.0 pixelmatch@7.1.0`, { stdio: 'inherit' });
  execSync(`npx --prefix "${CACHE}" playwright install chromium`, { stdio: 'inherit' });
}
const req = createRequire(path.join(CACHE, 'package.json'));
const { chromium } = req('playwright');
const { PNG } = req('pngjs');
const pixelmatch = (await import(req.resolve('pixelmatch'))).default;

fs.mkdirSync(OUT, { recursive: true });
// Astro 7 menjalankan preview sebagai daemon; dihentikan lewat `astro preview stop` di akhir.
execSync('npx astro preview stop', { cwd: ROOT, stdio: 'ignore' });
spawn('npx', ['astro', 'preview', '--port', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
for (let i = 0; ; i++) {
  try { await fetch(SITUS); break; } catch { if (i > 50) throw new Error('preview tidak menyala'); await new Promise((r) => setTimeout(r, 200)); }
}

const DIAM = '*,*::before,*::after{animation:none!important;transition:none!important}html{scroll-behavior:auto!important}';

async function potret(page, url, file) {
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: DIAM });
  await page.evaluate(() => document.fonts.ready);
  const info = await page.evaluate((ids) => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    tinggi: document.documentElement.scrollHeight,
    section: Object.fromEntries(ids.map((id) => {
      const r = document.getElementById(id)?.getBoundingClientRect();
      return [id, r ? [Math.round(r.top + scrollY), Math.round(r.height)] : null];
    })),
  }), SECTION);
  await page.screenshot({ path: file, fullPage: true });
  return { ...info, errors };
}

function pad(png, w, h) {
  const out = new PNG({ width: w, height: h });
  out.data.fill(255);
  PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0);
  return out;
}

const browser = await chromium.launch();
const ringkasan = [];
try {
  for (const w of LEBAR) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const fm = path.join(OUT, `${w}-mockup.png`);
    const fs_ = path.join(OUT, `${w}-situs.png`);
    const m = await potret(await ctx.newPage(), MOCKUP, fm);
    const s = await potret(await ctx.newPage(), SITUS, fs_);
    await ctx.close();

    const a = PNG.sync.read(fs.readFileSync(fm));
    const b = PNG.sync.read(fs.readFileSync(fs_));
    const W = Math.max(a.width, b.width), H = Math.max(a.height, b.height);
    const [pa, pb] = [pad(a, W, H), pad(b, W, H)];
    const diff = new PNG({ width: W, height: H });
    const beda = pixelmatch(pa.data, pb.data, diff.data, W, H, { threshold: 0.1 });

    // Berdampingan: mockup | situs | diff
    const sisi = new PNG({ width: W * 3, height: H });
    sisi.data.fill(255);
    [pa, pb, diff].forEach((img, i) => PNG.bitblt(img, sisi, 0, 0, W, H, W * i, 0));
    fs.writeFileSync(path.join(OUT, `${w}-diff.png`), PNG.sync.write(diff));
    fs.writeFileSync(path.join(OUT, `${w}-berdampingan.png`), PNG.sync.write(sisi));

    ringkasan.push({ w, bedaPersen: +((beda / (W * H)) * 100).toFixed(2), tinggi: [m.tinggi, s.tinggi], overflowSitus: s.overflow, errorSitus: s.errors, section: Object.fromEntries(SECTION.map((id) => [id, { mockup: m.section[id], situs: s.section[id] }])) });
  }
} finally {
  await browser.close();
  execSync('npx astro preview stop', { cwd: ROOT, stdio: 'ignore' });
}

fs.writeFileSync(path.join(OUT, 'ringkasan.json'), JSON.stringify(ringkasan, null, 2));
for (const r of ringkasan) {
  console.log(`\n${r.w}px  beda ${r.bedaPersen}%  tinggi mockup ${r.tinggi[0]} / situs ${r.tinggi[1]}  overflow-x situs ${r.overflowSitus}px  error console ${r.errorSitus.length}`);
  for (const [id, v] of Object.entries(r.section)) console.log(`  #${id.padEnd(8)} mockup [top,tinggi] ${JSON.stringify(v.mockup)}  situs ${JSON.stringify(v.situs)}`);
  r.errorSitus.forEach((e) => console.log('  ERROR', e));
}
