# Prompt template: website company profile (Astro + Decap CMS + Cloudflare)

Template ini merangkum arsitektur grintecs.com beserta semua perbaikan dan gotcha yang sudah ditemui, supaya proyek berikutnya tidak mulai dari nol.

**Cara pakai**

1. Buat repo kosong baru, buka Claude Code di foldernya.
2. Isi blok **Variabel** di bawah. Hapus baris modul opsional yang tidak dipakai.
3. Salin semuanya mulai dari judul **Prompt** sampai akhir file, tempel ke Claude Code.
4. Kalau repo GRINTEC ada di komputer yang sama, biarkan `REFERENSI_LOKAL` terisi. Agent akan menyalin file yang sudah terbukti jalan, bukan menulis ulang dari nol.

---

## Variabel

```yaml
NAMA_BRAND: ""            # mis. GRINTEC (tulis sesuai brand; domain bukan nama brand)
TAGLINE: ""
DOMAIN: ""                # mis. contoh.com (tanpa www, tanpa https)
REPO_GITHUB: ""           # OWNER/REPO
BAHASA: [en, id]          # elemen pertama = bahasa default
WARNA_BRAND:
  primer: ""              # hex
  aksen: ""               # hex
FONT:
  heading: ""             # mis. Plus Jakarta Sans
  body: ""                # mis. Inter
LOGO:
  warna: ""               # path file logo untuk latar terang
  putih: ""               # path file logo untuk footer gelap
  ikon: ""                # untuk favicon dan apple-touch-icon
KONTAK:
  email: ""
  whatsapp: ""            # angka saja, kosongkan bila tidak ada
  sosmed: {instagram: "", linkedin: "", youtube: ""}
KOLEKSI: [services, solutions, industries, insights]   # tambahkan subservices, works bila perlu
MODUL_OPSIONAL:
  form_kontak_sheets: true     # Apps Script + Turnstile -> Google Sheet
  sub_layanan: false           # /services/<induk>/<slug>/
  our_works: false             # portofolio/studi kasus
  pricing_gate: false          # harga dari Sheet, dibuka dengan email
  video_hero: false
  tracking: true               # Search Console, GTM, GA4, Meta Pixel dari CMS
REFERENSI_LOKAL: /Users/andreasabipermana/Documents/Work/Grintec/web
BAHAN_KONTEN: ""          # path brief/company profile/PDF, atau "belum ada"
```

---

## Prompt

Bangun website company profile statis untuk **{{NAMA_BRAND}}** dengan arsitektur yang sama seperti website GRINTEC (grintecs.com). Arsitektur ini sudah berjalan di produksi, jadi ikuti keputusan di bawah dan jangan menggantinya dengan pendekatan lain tanpa bertanya dulu.

Variabel proyek ada di blok YAML di atas prompt ini. Baca dulu, lalu baca `BAHAN_KONTEN` bila ada.

### 0. Referensi implementasi

Repo referensi ada di `{{REFERENSI_LOKAL}}`. Sebelum menulis kode, baca `README.md`, `src/content.config.ts`, `public/admin/config.yml`, dan `src/lib/content.ts` di sana.

File berikut **salin lalu sesuaikan** (ganti nama brand, domain, warna, dan teks). Jangan menulis ulang dari nol:

| File | Isi |
|---|---|
| `oauth-proxy/` (src/index.js, wrangler.toml, test.mjs) | Cloudflare Worker untuk login GitHub di Decap |
| `apps-script/Code.gs`, `apps-script/test.mjs` | Penerima form ke Google Sheet + verifikasi Turnstile |
| `.github/workflows/deploy.yml` | Build + deploy GitHub Pages |
| `src/lib/url.ts` | `withBase()`, `stripBase()`, `bodyHtml()` |
| `src/lib/content.ts` | `byLang`, `getPage`, `getSettings`, `keyOf`, `findByKey`, `alternatesFor` |
| `src/i18n/utils.ts`, struktur `src/i18n/ui.ts` | helper bahasa, `t()`, `localizePath()` |
| `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`, `src/pages/index.astro` | alias sitemap, robots, root tanpa redirect |
| `src/components/SEO.astro`, `Tracking.astro`, `LanguageSwitcher.astro` | meta, hreflang, OG, tracking dari CMS |
| `public/admin/index.html`, `preview.css` | Decap dengan versi di-pin + preview bergaya situs |
| `src/components/PricingGate.astro` (bila `pricing_gate`) | tabel paket ber-mask + opt-in email |
| `src/components/WorksSection.astro`, `src/pages/[lang]/works/[slug].astro` (bila `our_works`) | portofolio |

Desain visual (warna, font, layout, ikon) **dibuat baru** sesuai brand ini. Jangan meniru tampilan GRINTEC.

### 1. Stack (pin versi persis, jangan pakai `^`)

- Astro 7.x, `output: 'static'`, `trailingSlash: 'always'`
- Tailwind CSS 4 lewat `@tailwindcss/vite` (tanpa `tailwind.config.js`; token warna di `@theme` pada `global.css`)
- `@astrojs/sitemap`
- Decap CMS 3.x dimuat dari unpkg dengan versi di-pin di `public/admin/index.html`; `decap-server` sebagai devDependency (`npm run cms`)
- Node 22.22+ lokal, Node 24 di GitHub Actions
- Hosting GitHub Pages lewat Actions, custom domain di `public/CNAME`, `public/.nojekyll`
- Tanpa framework UI (React/Vue). Interaksi kecil memakai `<script>` Astro biasa dan elemen native (`<dialog>`, `<details>`).

Cek versi stabil terbaru tiap paket yang setidaknya sudah dua minggu rilis, lalu pin. Kalau versi major berbeda dari referensi, catat perbedaannya di README.

### 2. i18n dan routing

- `i18n.locales = {{BAHASA}}`, `defaultLocale` = bahasa pertama, `prefixDefaultLocale: true`, `redirectToDefaultLocale: false`.
- Semua halaman di `src/pages/[lang]/...`. Root `/` **merender** homepage bahasa default secara langsung (GitHub Pages tidak punya redirect server).
- Teks UI statis (menu, tombol, label form, pesan error) di `src/i18n/ui.ts`, diakses lewat `t('kunci')`, fallback ke bahasa default.
- Konten per bahasa di `src/content/<koleksi>/<bahasa>/<file>.md|yml`.
- **Slug boleh berbeda per bahasa** (SEO tiap bahasa). Pasangan terjemahan dikaitkan lewat **nama file**, bukan slug. Nama file mengikuti slug bahasa default saat entry dibuat, dan relasi antar-entry menyimpan nama file itu (`keyOf()`).
- Language switcher dan hreflang memakai `alternatesFor()`. Kalau terjemahan belum ada, arahkan ke halaman listing bahasa itu, jangan 404.

### 3. Content collections (`src/content.config.ts`)

- Loader `glob` dengan `generateId` = path file tanpa ekstensi (mis. `en/erp-implementation`). **Wajib**: loader default memakai field `slug` sebagai ID dan akan bentrok antar bahasa.
- Decap menulis `""` untuk field kosong. Pakai helper:
  - `str = z.string().nullish().transform(v => v ?? '')`
  - `list(item) = z.array(item).nullish().transform(v => v ?? [])`
- Koleksi singleton (halaman beranda, tentang, kontak, pengaturan situs) disimpan sebagai folder collection `pages/<bahasa>/<type>.yml` dengan field `type` dan schema discriminated union. Alasannya: collection bertipe `files` di Decap hanya mendukung i18n `single_file`.
- Setiap koleksi punya `order` (urutan menu dan grid) dan, untuk artikel dan karya, `draft`.
- ID tracking dari CMS divalidasi regex di schema (GTM `GTM-XXXX`, GA4 `G-XXXX`, Pixel angka saja, Search Console token). Build gagal dengan pesan jelas bila format salah, karena nilainya disisipkan ke script inline.

### 4. Decap CMS (`public/admin/config.yml`)

- Nama field **harus sama persis** dengan schema Zod. Tulis komentar itu di baris pertama file.
- `backend: github`, `repo: {{REPO_GITHUB}}`, `branch: main`, `base_url` = URL Worker OAuth, `auth_endpoint: auth`.
- `commit_messages` berbahasa Indonesia, mis. `cms: ubah {{collection}} "{{slug}}"`.
- `local_backend: true` (lokal memakai `npx decap-server`, tanpa login).
- `media_folder: public/uploads`, `public_folder: /uploads`.
- `i18n: { structure: multiple_folders, locales: {{BAHASA}}, default_locale: <bahasa pertama> }`.
- Field `slug` per bahasa (`i18n: true`) dengan `pattern` huruf kecil-angka-tanda hubung, plus hint bahwa mengubah slug halaman yang sudah tayang membuat URL lama 404. Collection memakai `slug: '{{fields.slug}}'`.
- Anchor YAML untuk daftar ikon, slug, SEO, dan section agar tidak berulang.
- Halaman singleton: `folder` + `filter: { field: type, value: home }` + `create: false`.
- Label field dalam bahasa Indonesia untuk editor.
- `index.html`: versi Decap di-pin, `meta robots noindex`, `registerPreviewStyle` untuk font dan `preview.css` (versi ringkas global.css).

### 5. Login CMS: Cloudflare Worker OAuth (`oauth-proxy/`)

Salin dari referensi. Perilaku yang harus dipertahankan:

- `GET /auth` redirect ke GitHub authorize dengan `state` acak di cookie `HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=600`.
- `GET /callback` cek `state` sama dengan cookie, tukar `code` ke token, lalu render halaman handshake Decap (`authorizing:github` lalu `authorization:github:success:{...}`).
- Token **hanya** di-`postMessage` ke origin di `ALLOWED_ORIGINS` (`wrangler.toml` vars): `https://{{DOMAIN}}`, `http://{{DOMAIN}}`, `http://localhost:4321`.
- JSON di dalam `<script>` di-escape `<` menjadi `<`.
- `GITHUB_CLIENT_ID` dan `GITHUB_CLIENT_SECRET` lewat `wrangler secret put`, tidak pernah di repo.
- `node oauth-proxy/test.mjs` tanpa dependensi.

### 6. Halaman dan komponen inti

- `BaseLayout` dengan `SEO` (title, description, canonical, hreflang, OG image dari hero halaman), `Tracking`, Header, Footer.
- Header dengan mega menu (layanan dan solusi) dan `MobileNav`; footer dengan logo putih, ikon kontak dan sosmed.
- Beranda: hero (poster dulu, video opsional), daftar layanan, solusi, industri, insight terbaru, CTA.
- Listing + detail untuk tiap koleksi. Detail layanan menampilkan ilustrasi header (`heroImage`) yang melebur ke halaman (latar putih, tepi memudar dengan mask, tanpa kotak).
- Insights: satu route `[...path].astro` untuk listing, kategori, dan pagination supaya semua kombinasi ter-generate statis.
- Halaman kontak: form + tombol WhatsApp (`wa.me/<nomor>?text=<template per bahasa>`). CTA dari halaman layanan membawa `?service=<judul>` dan memilih layanan otomatis di dropdown (optgroup per layanan induk).
- Satu halaman `404.astro` (GitHub Pages hanya memakai satu 404) dengan tautan ke beranda tiap bahasa.
- **Section yang datanya belum ada disembunyikan**, jangan diisi angka atau nama karangan (sejarah, tim, statistik, testimoni, logo klien, portofolio). Placeholder yang memang harus tampil ditandai `[REAL DATA]` dan dicatat di README.

### 7. Media dan performa

- Gambar CMS di `public/uploads/`, dirender dengan `<img>` biasa + `width`/`height` + `loading="lazy"` di bawah fold + `withBase()`. Jangan pakai `astro:assets` untuk media CMS (Decap menyimpan path publik absolut).
- `bodyHtml()` menambahkan base path ke `src`/`href` `/uploads/` di body markdown.
- Gambar diunggah sekitar 1600 px, WebP, di bawah ~200 KB. Kompres sebelum commit.
- Font non-blocking (preconnect + `display=swap`), logo header responsif.
- Video hero dimuat lewat script, tidak dengan atribut `autoplay`, dan **tidak** dimuat bila `prefers-reduced-motion` atau `navigator.connection.saveData`. Poster tampil dulu (LCP).
- Turnstile dan script pihak ketiga lain dimuat saat dibutuhkan.

### 8. SEO dan tracking

- `@astrojs/sitemap` dengan `filter` hanya halaman berbahasa, **tanpa** opsi i18n (slug beda per bahasa membuat hreflang di sitemap salah). hreflang dipasang di `<head>` tiap halaman.
- Endpoint `/sitemap.xml` sebagai alias `sitemap-index.xml`. `robots.txt` dengan `Disallow: /admin/` dan baris `Sitemap:`.
- Tracking dari CMS (Pengaturan Situs > SEO & Tracking): Search Console, GTM, GA4, Meta Pixel, meta tag tambahan. Field kosong tidak memuat apa pun. README menjelaskan: pilih GTM **atau** GA4/Pixel langsung, jangan keduanya.

### 9. Form kontak ke Google Sheets (bila `form_kontak_sheets`)

Salin `apps-script/Code.gs`. Perilaku yang harus dipertahankan:

- Browser mengirim JSON sebagai `text/plain` tanpa header custom (Apps Script tidak melayani preflight CORS).
- Verifikasi Turnstile ke `siteverify` + cek hostname terhadap `ALLOWED_HOSTNAMES`.
- Konfigurasi lewat Script Properties: `TURNSTILE_SECRET`, `SHEET_ID`, `SHEET_NAME`, `NOTIFY_EMAIL`, `ALLOWED_HOSTNAMES`.
- Tab dan baris header dibuat otomatis bila belum ada. `LockService` saat append.
- Batas panjang per field; nilai berawalan `=`, `+`, `-`, `@` diberi awalan `'` (cegah formula injection).
- URL `/exec` dan site key Turnstile diisi lewat CMS (Pengaturan Situs > Formulir). Selama kosong, tombol kirim nonaktif dan pengunjung diarahkan ke kontak alternatif.
- Kunci uji Turnstile untuk lokal: site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA` (melaporkan hostname `example.com`).
- `node apps-script/test.mjs` tanpa dependensi.

### 10. Modul opsional

**Sub-layanan** (bila `sub_layanan`): koleksi `subservices` dengan `parent` (kunci file layanan induk), URL `/services/<induk>/<slug>/`, tampil sebagai kartu "Layanan turunan" di halaman induk, tidak masuk mega menu. Field: excerpt, tagline, heroImage, process, deliverables, pricing, FAQ, ctaLabel. CTA membuka kontak dengan layanan terpilih.

**Our Works** (bila `our_works`): koleksi `works` dengan relasi ke services/subservices/solutions (kunci file), `/works/<slug>/`, section kartu di halaman yang ditautkan dan disembunyikan bila kosong. Entry baru default `draft: true`. Studi kasus klien wajib anonim (nama klien, URL, IP, nama orang, logo disamarkan) sebelum terbit.

**Pricing gate** (bila `pricing_gate`, butuh `form_kontak_sheets`):

- Flag `priceGate: true` di sub-layanan. Kartu paket dan cakupan **selalu tampil**, harga di-mask `Rp XXX.XXX`, ada skeleton loading selama data dimuat.
- Harga **tidak pernah** ada di HTML statis maupun markdown. Sumbernya tab `Prices` di Sheet (`Key | Bahasa | Paket | Harga | Cakupan | Urutan`), bisa diedit tanpa deploy.
- Action Apps Script `scopes` mengembalikan nama + cakupan dengan harga numerik dihapus. Label non-angka seperti "Hubungi kami" ikut terkirim.
- Action `pricing`: dialog native `<dialog>` di tengah layar (`showModal` + `m-auto`) berisi email + persetujuan + Turnstile (explicit render). Lead dicatat ke tab `PricingLeads` (`Waktu | Email | Layanan | Sub-layanan | Paket | Bahasa | Halaman`), lalu harga asli menggantikan mask.
- Validasi email di browser: typo domain populer, blokir email sekali pakai, cek MX lewat `dns.google`.
- Email disimpan di `localStorage` dan dipakai untuk prefill. Setelah harga terbuka, tombol jadi "Choose this service" dan mencatat enquiry (action `enquiry`, tab `Enquiry`) tanpa pindah halaman, lalu tampil pesan "tim kami akan segera menghubungi Anda". Paket Custom selalu berlabel "Let's Discuss".
- Fallback: bila endpoint belum punya action `scopes`, tampilkan caption + satu tombol "Lihat harga".
- Pemeriksaan wajib: `grep` harga di `dist/` harus kosong.

**Video hero** (bila `video_hero`): WebM + MP4 + poster dari CMS, di bawah 5 MB, 1080p, tanpa audio. Perintah ffmpeg ada di README referensi.

### 11. Aksesibilitas dan desain

- Warna tombol dan link harus lolos kontras WCAG AA 4.5:1 dengan teks putih. Bila warna primer brand gagal, pakai varian lebih gelap untuk teks/tombol dan simpan warna asli untuk ikon, garis, motif (batas 3:1). Hitung rasionya dan catat di README.
- Fokus keyboard terlihat, `alt` pada gambar konten, label pada semua input, target sentuh memadai, tidak ada scroll horizontal di lebar 360 px.
- Ikon custom satu gaya (bukan set ikon generik), daftar kuncinya di `Icon.astro` dan sama dengan `_icons` di `config.yml`.
- Tema terang saja kecuali logo mendukung latar gelap.

### 12. Deploy dan domain

- `.github/workflows/deploy.yml`: trigger push ke `main` (termasuk commit dari CMS) + `workflow_dispatch`, `withastro/action`, `actions/deploy-pages`, `concurrency: pages`.
- Domain dipakai di empat tempat yang harus selalu sinkron: `public/CNAME`, `SITE` di `astro.config.mjs`, `site_url`/`display_url` di `config.yml`, `ALLOWED_ORIGINS` di Worker. Tulis daftar ini di README.

### 13. Gotcha yang sudah pernah terjadi (jangan diulang)

1. Glob loader tanpa `generateId` membuat entry ID dan EN bentrok.
2. Field kosong dari Decap berupa `""`, bukan `undefined`. Schema harus menerimanya.
3. Collection `files` di Decap tidak mendukung `multiple_folders`.
4. Mengubah `Code.gs` harus di-deploy lewat **Manage deployments > Edit > Version: New version**. "New deployment" membuat URL baru dan situs tetap memanggil kode lama. Gejalanya: respons `{"error":"invalid"}`.
5. `curl` ke URL `/exec` mengembalikan halaman interstitial Google. Uji Apps Script dari browser.
6. Turnstile di dalam `<dialog>` harus explicit render setelah dialog dibuka. Token hanya berlaku sekali, jadi `turnstile.reset()` setelah submit.
7. Hreflang di sitemap salah bila slug beda per bahasa.
8. Atribut `autoplay` tetap mengunduh video walau pengguna memilih reduced motion.
9. Warna hijau brand terang di bawah teks putih gagal kontras.
10. Kalimat ber-": " di dalam YAML scalar biasa merusak frontmatter. Pakai tanda kutip.

### 14. Aturan kerja

- **Uji di Chrome** sebelum melapor selesai: halaman yang diubah, versi mobile (360 px), console bersih. `npm run build` harus lolos.
- Jangan mengarang data perusahaan: angka, klien, testimoni, sertifikasi, NDA, cara penanganan data. Bila copy butuh klaim seperti itu, tulis netral lalu daftarkan sebagai pertanyaan untuk pemilik bisnis.
- Copy bahasa Indonesia disunting dengan skill `humanizer-indonesia`, copy bahasa Inggris dengan `humanizer`. Tanpa em dash, tanpa pola "bukan X, melainkan Y".
- Nama brand ditulis sesuai `NAMA_BRAND` di semua teks; domain bukan nama brand.
- Rahasia (client secret, Turnstile secret) hanya lewat `wrangler secret` dan Script Properties. Jangan pernah di repo atau chat.
- Tanya dulu sebelum push. Commit message berbahasa Indonesia.
- Solusi paling sederhana yang benar. Tanpa dependensi baru kecuali benar-benar perlu.

### 15. Urutan kerja

Kerjakan per fase, build dan cek di Chrome di akhir tiap fase, lalu laporkan singkat sebelum lanjut:

1. Scaffold Astro + Tailwind + i18n + layout + `ui.ts` + token warna/font.
2. Schema koleksi + konten awal (dari `BAHAN_KONTEN`, atau draft netral yang ditandai) + halaman listing/detail.
3. Decap `config.yml` yang cocok dengan schema; uji lokal dengan `npm run dev` + `npm run cms`, buat dan ubah satu entry tiap koleksi.
4. SEO, sitemap, robots, tracking.
5. Workflow deploy + `CNAME`.
6. Worker OAuth (kode dan test saja; deploy dilakukan pemilik).
7. Form kontak + Apps Script.
8. Modul opsional yang dipilih.
9. README lengkap.

### 16. Yang harus diserahkan

- Repo yang build-nya lolos dan sudah diuji di Chrome.
- `README.md` berbahasa Indonesia: cara jalan lokal, CMS lokal, struktur folder, deploy, langkah login CMS, langkah form + Apps Script, SEO & tracking, cara menambah konten, domain (empat tempat), tabel data yang masih perlu diisi, dan bagian "Keputusan teknis dan alasannya".
- **Checklist langkah manual untuk pemilik** (agent tidak bisa melakukannya):
  1. Settings > Pages > Source: GitHub Actions; DNS domain ke GitHub Pages.
  2. `npx wrangler login` lalu `npx wrangler deploy` di `oauth-proxy/`; catat URL Worker.
  3. GitHub OAuth App: Homepage `https://{{DOMAIN}}/`, callback `<URL Worker>/callback`; simpan `GITHUB_CLIENT_ID` dan `GITHUB_CLIENT_SECRET` dengan `wrangler secret put`.
  4. Isi `base_url` di `config.yml`.
  5. Widget Turnstile (hostname `{{DOMAIN}}`), Apps Script + Script Properties, deploy sebagai Web app (Execute as Me, Anyone), isi URL `/exec` + site key di CMS.
  6. Bila `pricing_gate`: buat tab `Prices` di Sheet.
  7. Verifikasi Search Console, kirim `/sitemap.xml`.
