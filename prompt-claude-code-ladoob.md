# Prompt Claude Code: website Ladoob (Beyond Smart Travel)

Turunan dari `prompt-template-web-astro-decap.md`. Isinya sudah diisi untuk Ladoob dan ditambah Bagian A, yang mengatur supaya website sama dengan mockup landing page.

**Cara pakai**

1. Ekstrak zip ini ke root repo `ladoob-website`. Folder `referensi/` sudah berisi bahan dengan nama yang benar:

   ```
   referensi/
   ├── mockup/ladoob_beyond_smart_travel_landing_page.html   (SUMBER UTAMA desain + copy)
   ├── logo/Ladoob_logo.jpg, Ladoob_Compass_logo.jpg, Ladoob_Masar_logo.jpg, Ladoob_Agent_logo.jpg
   ├── screenshot/agent-bagikan-paket.png, masar-peta-offline.png, masar-dasbor-jamaah.png   (cadangan, lihat A1)
   └── template/prompt-template-web-astro-decap.md   (template asli, hanya arsip)
   ```

2. Buka Claude Code di root repo, lalu ketik: *"Baca `prompt-claude-code-ladoob.md` dan jalankan mulai dari bagian Prompt. Mulai dari Fase 0."*

---

## Variabel

```yaml
NAMA_BRAND: "Ladoob"
TAGLINE: "Beyond Smart Travel"              # dari mockup
DOMAIN: "ladoob.my.id"                      # apex sebagai domain utama, www dialihkan (lihat A10)
REPO_GITHUB: "grintopsglobal/ladoob-website"   # remote: git@github.com:grintopsglobal/ladoob-website.git
BAHASA: [id]                                # mockup hanya bahasa Indonesia; struktur i18n tetap disiapkan untuk menambah `en` nanti
WARNA_BRAND:                                # persis dari tailwind.config di mockup
  navy: "#183654"
  navyDark: "#0F253B"
  navyLight: "#234B73"
  compass: "#B8332A"
  compassLight: "#FDF2F1"
  masar: "#C27838"
  masarLight: "#FDF7F2"
  agent: "#1E5648"
  agentLight: "#F1F8F6"
  slateBg: "#F8FAFC"
FONT:
  heading: "Plus Jakarta Sans"              # 600, 700, 800
  body: "Inter"                             # 400, 500, 600, 700
IKON: "Lucide"                              # mockup memakai Lucide; versi di-pin, dirender saat build
LOGO:
  sumber: "SVG inline di header mockup"     # heksagon navy + cincin kompas + pesawat, viewBox 0 0 88 98
  terang: "heksagon #183654"                # header
  gelap: "heksagon #234B73"                 # footer di atas navyDark
  referensi_jpg: "referensi/logo/"          # logo resmi berbentuk JPG, desainnya berbeda dari SVG mockup (lihat A7)
KONTAK:
  email: "halo@ladoob.com"                  # dari mockup, perlu konfirmasi (domain ladoob.com ≠ ladoob.my.id)
  whatsapp: "6281234567890"                 # dari mockup, KEMUNGKINAN DUMMY: wajib diganti sebelum rilis
  sosmed: {instagram: "", linkedin: "", youtube: "", tiktok: ""}   # tidak ada di mockup; ikon disembunyikan selama kosong
KOLEKSI: [pilar, paket, faq, blog]
MODUL_OPSIONAL:
  form_kontak_sheets: false                 # mockup tidak punya form; semua CTA ke WhatsApp
  sub_layanan: false
  our_works: false
  pricing_gate: false                       # harga tampil terbuka sesuai mockup
  video_hero: false
  tracking: true
REFERENSI_LOKAL: /Users/andreasabipermana/Documents/Work/Grintec/web
MOCKUP: "referensi/mockup/ladoob_beyond_smart_travel_landing_page.html"
```

---

## Prompt

Bangun website marketing statis untuk **Ladoob** (tagline "Beyond Smart Travel"), platform manajemen travel wisata dan Umrah yang terdiri dari Ladoob Core, Compass, Masar (مسار), dan Agent.

**Desain dan copy sudah final dalam bentuk mockup**: `referensi/mockup/ladoob_beyond_smart_travel_landing_page.html`. Tugasmu adalah memindahkan mockup itu ke Astro + Decap CMS **semirip mungkin**, sehingga semua teksnya bisa diedit lewat CMS. Ini bukan pekerjaan mendesain ulang.

Arsitektur teknis mengikuti website GRINTEC (Bagian B, berasal dari template yang sudah berjalan di produksi). **Bagian A mengalahkan Bagian B bila bertentangan.** Secara khusus:

- Aturan Bagian B §11 "desain dibuat baru" dan "ikon custom" tidak berlaku. Desain mengikuti mockup, dan ikon memakai Lucide.
- Bagian B §6 diganti oleh A2.
- Bagian B §9, §10, dan §15 tidak dipakai atau diganti oleh A.

Baca blok Variabel dan seluruh file mockup (HTML, CSS, dan JavaScript-nya) sebelum menulis kode.

## Bagian A: Kesesuaian dengan mockup

### A1. Sumber kebenaran

1. **Mockup adalah spesifikasi.** Yang harus sama dengan mockup:
   - Layout, urutan section, jarak, ukuran font, warna, radius, bayangan, ikon, animasi, dan perilaku responsif di setiap breakpoint.
   - Semua teks, persis, termasuk ejaan campuran seperti "Umrah/Umroh" dan "affiliator". Ketidakkonsistenan cukup dicatat sebagai pertanyaan, jangan diperbaiki diam-diam.
   - Pemakaian kelas Tailwind dari mockup. Salin kelasnya, jangan menafsirkan ulang.
2. **Penyimpangan yang diizinkan hanya ini:**
   - **Port teknis.** Tailwind CDN diganti Tailwind 4 build. Lucide `unpkg@latest` diganti paket Lucide versi pin yang dirender jadi SVG saat build, tanpa JS runtime. Konten yang di mockup di-render lewat JavaScript (`pillarData`, `blogArticles`) di-render oleh Astro dari CMS. Hasil visualnya tetap harus sama.
   - **Aksesibilitas tanpa mengubah tampilan default:**
     - Animasi float berhenti saat `prefers-reduced-motion`.
     - Tab pilar memakai ARIA tablist, dan accordion memakai `button` + `aria-expanded`.
     - Modal artikel memakai `<dialog>` native.
     - Fokus keyboard terlihat.
     - Warna teks/tombol Masar digelapkan sesuai A4.
   - **Penambahan untuk SEO/CMS:** halaman detail artikel blog, halaman 404, `/admin/`, sitemap, dan robots (A2).
   - Untuk penyimpangan lain, tanya dulu.
3. **Screenshot di `referensi/screenshot/` tidak dipakai** di website karena tidak ada di mockup. Simpan sebagai bahan cadangan untuk halaman produk di masa depan.

### A2. Struktur situs

**Beranda (`/` dan `/id/`)** adalah replika satu halaman mockup dengan anchor yang sama: `#hero`, `#fitur`, `#manfaat`, `#harga`, `#blog`, `#faq`. Urutan section:

1. **Header fixed.** Tinggi `h-20`, `bg-white/95 backdrop-blur`, logo SVG + "Ladoob®" + "Beyond Smart Travel", menu (Fitur & Ekosistem, Manfaat Bisnis, Harga, Blog, FAQ), tombol "Coba Sekarang", hamburger + drawer di mobile, `scroll-margin-top: 84px` untuk section.
2. **Hero, grid 12 kolom.**
   - Kiri (col-span-5) berisi badge, H1, paragraf, 2 CTA, dan baris trust highlight.
   - Kanan (col-span-7) berisi komposisi visual HTML: jendela browser Ladoob Core (`core.ladoob.com`, sidebar navy, 3 KPI, chart SVG), kartu melayang Masar, dan kartu melayang Agent dengan tombol "Salin Link" yang berfungsi.
   - Visual ini adalah ilustrasi produk dengan data contoh. Teks judul dan label sekitarnya diambil dari CMS, isi visualnya (angka demo) tetap di komponen.
3. **Fitur & 4 Pilar (`#fitur`).** Berisi header section, tab interaktif 4 pilar dengan panel detail (badge, judul, subjudul, 4 fitur bercentang, kotak "Keunggulan Utama" + CTA WhatsApp), lalu grid 4 kartu pilar. "Lihat detail modul" memilih tab pilar terkait lalu menggulir ke panel.
4. **Manfaat Bisnis (`#manfaat`).** Narasi kiri + kartu "Dampak Operasional Terukur" (4 metrik) dan 4 poin keunggulan di kanan.
5. **Harga (`#harga`).** 4 tier (Starter, Business "★ Paling Populer", Enterprise, Custom Whitelabel "Full Brand Identity") + kotak disclaimer.
6. **Blog (`#blog`).** 3 kartu artikel terbaru. "Baca Artikel" membuka modal baca cepat seperti di mockup, dan modal diberi tambahan tautan "Baca selengkapnya" ke halaman artikel.
7. **FAQ (`#faq`).** Accordion, satu terbuka dalam satu waktu.
8. **Banner CTA bawah** + teks "Terhubung langsung ke WhatsApp Tim Ladoob".
9. **Footer `navyDark`.** Logo varian gelap, deskripsi, "Website resmi", kolom 4 Pilar, kolom Tautan & Kontak, copyright.
10. **Tombol WhatsApp melayang** "Coba Sekarang".

**Halaman tambahan** (tidak ada di mockup, desainnya diturunkan dari komponen mockup):

- `/id/blog/` berisi listing dengan kartu yang sama seperti section blog.
- `/id/blog/<slug>/` berisi detail artikel. Header dan footer sama dengan beranda, dan link menu memakai `/id/#fitur` dan seterusnya.
- `404`.

Tidak ada halaman produk, kontak, atau tentang terpisah.

### A3. Detail implementasi yang sering meleset

- Port `tailwind.config` mockup ke `@theme` di `global.css` dengan nama token yang menghasilkan kelas identik:
  - `bg-ladoob-navy`, `text-ladoob-masar`, `bg-ladoob-compassLight`, dan seterusnya.
  - `shadow-soft` dan `shadow-card` dengan nilai persis.
  - Cek bahwa kelas camelCase (`navyDark`, `compassLight`) benar-benar ter-generate di Tailwind 4. Kalau tidak, ganti ke kebab-case **di semua tempat** dan catat.
- Font: Inter untuk body dan Plus Jakarta Sans untuk `h1–h4` / `.font-heading`, dengan bobot persis seperti URL Google Fonts di mockup.
- Logo: SVG dari header mockup dijadikan `Logo.astro` dengan prop varian `terang` (fill `#183654`, cincin luar opacity 0.95) dan `gelap` (fill `#234B73`). Favicon dan apple-touch-icon dibuat dari SVG yang sama.
- Keyframes `floatSlow`, `floatMedium`, `floatDelayed`, beserta durasi dan delay-nya, disalin persis. Pause saat hover tetap ada.
- Jangan menambahkan `overflow-x: hidden` di `html` atau `body` (ada komentar di mockup soal posisi `fixed`). Pastikan tidak ada scroll horizontal dengan cara lain.
- Panel pilar: render keempat panel di HTML lalu sembunyikan yang tidak aktif. Jangan pakai `innerHTML`. Tab default adalah Core.
- Tombol "Salin Link" memakai `navigator.clipboard` dengan fallback, dan label berubah jadi "Tersalin!" selama 1,8 detik.

### A4. Token dan kontras (sudah dihitung, verifikasi ulang dan catat di README)

| Token | Hex | Kontras vs putih | Catatan |
|---|---|---|---|
| navy | `#183654` | 12,4:1 | aman |
| navyDark | `#0F253B` | 15,6:1 | aman; `slate-300` di atasnya 10,5:1 |
| navyLight | `#234B73` | 9,0:1 | aman |
| compass | `#B8332A` | 5,9:1 | aman; di atas `compassLight` 5,4:1 |
| agent | `#1E5648` | 8,5:1 | aman; di atas `agentLight` 7,9:1 |
| **masar** | `#C27838` | **3,5:1** | **gagal AA** untuk teks putih di atasnya dan untuk teks di atas `masarLight` (3,3:1) |

Untuk Masar, tambahkan token `masarText: #9A5A26` (5,4:1 vs putih, 5,1:1 vs `masarLight`). Token ini dipakai untuk latar panel "Keunggulan Utama", lingkaran centang, dan teks badge Masar. `#C27838` tetap dipakai untuk ikon, garis, dan aksen dekoratif. Ini satu-satunya perubahan warna dari mockup, jadi tunjukkan perbandingannya di laporan Fase 1.

### A5. Konten ke CMS

Setiap teks di mockup harus bisa diedit di Decap. Nilai awalnya diisi persis dari mockup.

- **Koleksi `pilar`** (4 entry: core, compass, masar, agent). Field:
  - `key`, `order`
  - `namaTab` ("1. Ladoob Core (Web)")
  - `labelKartu` ("Web Dashboard • Owner & Pusat"), `judulKartu`, `deskripsiKartu`
  - `badge`, `judul`, `subjudul`, `fitur` (list)
  - `highlightJudul`, `highlightDeskripsi`
  - `aksen` (pilihan: navy/compass/masar/agent)
  - `ikon` (nama Lucide)
  - Sumber isi: `pillarData` dan kartu grid di mockup.
- **Koleksi `paket`** (4 tier). Field:
  - `nama`, `order`, `deskripsi`
  - `labelHarga`, `harga` (teks, mis. "Rp 14.500.000" / "Mulai Rp 85.000.000"), `labelMaintenance`, `maintenance`
  - `fitur` (list), `pita` (opsional, mis. "★ Paling Populer"), `sorot` (boolean untuk gaya kartu Business)
  - `pesanWa`
- **Koleksi `faq`.** Field: `pertanyaan`, `jawaban` (markdown, untuk teks tebal), `order`.
- **Koleksi `blog`** (pengganti `insights`, URL `/id/blog/`). Field:
  - `kategori`, `judul`, `slug`, `estimasiBaca`
  - `ringkasan` (teks kartu), `ringkasanModal` (paragraf modal)
  - `tanggal`, `draft`, gambar opsional, body markdown
  - 3 artikel awal diambil dari `blogArticles` di mockup. Body awal = paragraf yang sama, ditandai draft untuk dikembangkan.
- **Singleton `pages/id/home.yml`.** Berisi:
  - Hero: badge, H1, paragraf, label CTA, trust highlight.
  - Header tiap section.
  - Manfaat: narasi, 4 metrik, dan 4 poin.
  - Disclaimer harga.
  - Banner CTA.
  - Label menu.
- **Singleton `settings`.** Berisi:
  - Nomor WhatsApp dan email.
  - Teks "Website resmi" dan copyright.
  - Teks deskripsi footer.
  - Template pesan WA default.
  - SEO & tracking (Bagian B §8).
  - `<title>` dan meta description awal diambil dari mockup.

### A6. CTA WhatsApp

Semua "Coba Sekarang" mengarah ke `https://wa.me/<settings.whatsapp>?text=<pesan>`, dengan pesan sama persis seperti mockup:

| Lokasi | Isi pesan |
|---|---|
| Header, hero, banner bawah, tombol melayang | pesan umum masing-masing |
| Panel pilar | menyebut judul pilar |
| Tiap tier harga | menyebut nama + harga tier, dirakit dari data `paket` supaya otomatis ikut bila harga diubah |
| Modal artikel | pesan "baru membaca artikel" |

Satu helper `waLink(pesan)` di `src/lib/`.

`npm run build` menampilkan **peringatan** (bukan error) selama nomor masih `6281234567890`, dan README mencantumkannya sebagai syarat rilis.

### A7. Pertanyaan untuk pemilik (laporkan di Fase 0, jangan diputuskan sendiri)

1. **Domain.** Mockup menyebut `ladoob.com` di footer, email `halo@ladoob.com`, `core.ladoob.com` di hero, dan `ladoob.app/r/budi123` di kartu Agent, sementara situs tayang di `ladoob.my.id`. Mana yang benar untuk teks footer dan email? Ilustrasi hero dan kartu Agent boleh tetap memakai nama domain contoh.
2. **Nomor WhatsApp** `+62 812-3456-7890` tampak dummy.
3. **Logo.** SVG di mockup (cincin kompas bertanda) berbeda dari `Ladoob_logo.jpg` (lingkaran garis tanpa tanda). Mana yang resmi? Default: ikuti mockup.
4. **Klaim yang perlu dasar sebelum tayang.** Iklan yang menyesatkan berisiko secara hukum (UU Perlindungan Konsumen), dan klaim keamanan data terkait UU PDP.
   - Metrik "75% lebih cepat", "0% kebocoran", "10x kapasitas", "100% kepemilikan".
   - "SLA uptime 99.9%".
   - FAQ 6 soal keamanan ("Sangat terjamin", enkripsi end-to-end, isolasi database).
   - Durasi implementasi 3–7 hari / 2–5 minggu.
   - Ketersediaan di Play Store/App Store, integrasi payment gateway, audio doa, cicilan.
   - Agent tidak mengubah teks ini. Cukup daftar apa yang perlu dikonfirmasi.
5. **Merek pihak ketiga.** "Pullman Zamzam" muncul di kartu Masar hero. Boleh dipakai, atau diganti nama hotel generik?
6. **Bahasa Inggris.** Ditambahkan sekarang atau nanti?
7. **Ejaan Umrah/Umroh.** Mockup memakai keduanya ("Umroh Reguler 9 Hari" di kartu Agent). Dibakukan atau dibiarkan?

### A8. Bukti kesesuaian (wajib di tiap laporan fase)

- Script `scripts/bandingkan-mockup.mjs` (Playwright lewat `npx`, bukan dependensi situs). Script ini memotret mockup dan hasil build (`npm run preview`) di lebar 1440, 1024, 768, 390, dan 360 px, full page. Animasi float dimatikan saat memotret.
- Hasilnya disimpan berdampingan, plus gambar diff piksel, di `docs/perbandingan/` (folder ini di-`.gitignore`).
- Mockup memuat Tailwind, Lucide, dan Google Fonts dari CDN, jadi perbandingan butuh internet.
- Laporkan selisih yang terlihat per section dan perbaiki sebelum lanjut. Selisih yang diizinkan hanya yang ada di A1 poin 2.
- Cek juga dengan keyboard (tab, accordion, modal, drawer), console bersih, dan tidak ada scroll horizontal di 360 px.

### A9. Urutan kerja (menggantikan Bagian B §15)

0. **Persiapan.**
   - Salin file infrastruktur yang diizinkan dari `REFERENSI_LOKAL` (Bagian B §0, kecuali Apps Script, PricingGate, dan Works).
   - Inventaris semua teks mockup ke `docs/inventaris-konten.md`, dikelompokkan per section dan dipetakan ke field CMS di A5.
   - Jawab daftar pertanyaan A7.
   - **Berhenti dan laporkan.**
1. **Scaffold dan statis.**
   - Scaffold Astro + Tailwind 4 + token + font + Lucide + `Logo.astro`.
   - Bangun beranda **statis** (teks masih hardcoded) sampai perbandingan A8 lolos di 5 lebar layar.
   - **Berhenti dan laporkan** dengan gambar perbandingannya.
2. **Konten ke CMS.** Pindahkan teks ke content collections + schema (A5). Hasil perbandingan A8 harus tetap sama.
3. **Blog.** Listing + detail, modal artikel, 404.
4. **Decap.** `config.yml` cocok dengan schema; uji `npm run dev` + `npm run cms`; ubah satu entry tiap koleksi dan satu harga, lalu cek pesan WA ikut berubah.
5. **SEO dan deploy.** SEO, sitemap, robots, dan tracking (Bagian B §8); workflow deploy + `CNAME` (A10, Bagian B §12); Worker OAuth (Bagian B §5).
6. **README** lengkap (Bagian B §16, dengan bagian form/Apps Script/Turnstile dihapus).

### A10. Deploy: GitHub Pages di `ladoob.my.id`

- Domain kanonik adalah apex `https://ladoob.my.id/`. `www.ladoob.my.id` hanya dialihkan ke apex (GitHub Pages melakukan ini otomatis bila keduanya diarahkan dengan benar).
- Situs berjalan di root domain, jadi `base` di `astro.config.mjs` tetap `/`. `withBase()` tetap dipakai agar preview di `grintopsglobal.github.io/ladoob-website/` juga tidak rusak.
- `ladoob.my.id` harus sama persis di semua tempat berikut, dan daftar ini ditulis di README:
  - `public/CNAME`, berisi satu baris `ladoob.my.id`
  - `site` di `astro.config.mjs`
  - `site_url` dan `display_url` di `public/admin/config.yml`
  - `ALLOWED_ORIGINS` di Worker, berisi `https://ladoob.my.id`, `https://www.ladoob.my.id`, dan `http://localhost:4321`
  - Homepage URL di GitHub OAuth App
- Tambahkan ke checklist manual pemilik di README. Agent tidak melakukannya sendiri.
  1. Di panel DNS registrar `.my.id`:
     - A record untuk `@` ke `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
     - AAAA record untuk `@` ke `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
     - CNAME `www` ke `grintopsglobal.github.io`.
     - Hapus record parkir atau forwarding bawaan registrar yang bentrok dengan record di atas.
  2. Verifikasi domain di GitHub (Settings organisasi `grintopsglobal` > Pages > Add a verified domain, lewat TXT record `_github-pages-challenge-…`) untuk mencegah domain diambil alih repo lain.
  3. Repo > Settings > Pages:
     - Source: GitHub Actions.
     - Custom domain: `ladoob.my.id`.
     - Tunggu sertifikat terbit, lalu centang **Enforce HTTPS**.
  4. Cek `dig ladoob.my.id +short` dan `dig www.ladoob.my.id +short` sebelum melapor selesai. Propagasi DNS bisa memakan beberapa jam.
- Repo lokal memakai remote `git@github.com:grintopsglobal/ladoob-website.git` (SSH). Cek dengan `git remote -v`; tambahkan bila belum ada. Tetap tanya dulu sebelum push.
- Sebelum DNS siap, pengujian memakai `npm run preview` lokal. Jangan mengganti `site` ke URL `github.io`.

---

## Bagian B: Arsitektur teknis (dari template, berlaku kecuali diubah Bagian A)

Catatan: `form_kontak_sheets` dan `pricing_gate` bernilai false, jadi §9, §10, Apps Script, Turnstile, dan langkah manual nomor 5–6 di §16 dilewati. Koleksi di Bagian B (services, solutions, industries, insights) diganti koleksi di A5.

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
