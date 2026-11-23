# Website Ladoob

Website marketing **Ladoob**, *Beyond Smart Travel*: platform manajemen travel wisata dan Umrah (Ladoob Core, Compass, Masar, dan Agent). Struktur dan isi berasal dari mockup `referensi/mockup/ladoob_beyond_smart_travel_landing_page.html`, lalu tampilannya dirapikan mengikuti `DESIGN.md` (tenang dan tepercaya, tanpa pola template AI). Semua teks bisa diedit lewat CMS.

- **Stack:** Astro 7.4.7 (output static) + Tailwind CSS 4.3.5 (`@tailwindcss/vite`) + Decap CMS 3.17.3 + Lucide 1.70.0 (dirender jadi SVG saat build, tanpa JS)
- **Bahasa:** Indonesia (`/id/`). Struktur i18n sudah siap untuk menambah `en`.
- **Hosting:** GitHub Pages lewat GitHub Actions, domain `https://ladoob.my.id/`
- **Repo:** `grintopsglobal/ladoob-website`

## Syarat sebelum rilis

```bash
npm run cek-rilis
```

Perintah ini gagal selama syarat rilis belum terpenuhi. `npm run build` biasa tetap jalan, tetapi menampilkan peringatan yang sama:

1. **Nomor WhatsApp** di Pengaturan Situs wajib terisi (sekarang memakai kontak GRINTEC, +62 851 6136 4811). Semua tombol "Jadwalkan Demo" mengarah ke WhatsApp; bila dikosongkan, WhatsApp membuka pilihan kontak, bukan chat ke tim.
2. **12 klaim belum terverifikasi** (Pengaturan Situs > Klaim yang perlu diverifikasi): metrik 75% / 0% / 10x / 100%, SLA 99.9%, server 24/7, durasi implementasi, keamanan data, Play Store/App Store, payment gateway, audio doa, dan cicilan. Klaim iklan yang tidak bisa dibuktikan berisiko secara hukum (UU Perlindungan Konsumen), dan klaim keamanan data terkait UU PDP. Centang *Terverifikasi* setelah ada bukti, atau ubah/hapus teksnya.

## Menjalankan di komputer lokal

Butuh Node.js 22.22 atau lebih baru.

```bash
npm install
npm run dev        # http://localhost:4321/  (root / langsung merender beranda /id/)
npm run build      # hasil di dist/
npm run preview    # menyajikan dist/ seperti di produksi
```

Astro 7 menjalankan `dev` dan `preview` sebagai proses latar. Hentikan dengan `npx astro dev stop` atau `npx astro preview stop`.

## Memakai CMS secara lokal

```bash
npm run dev
npm run cms        # decap-server, port 8081
```

Buka **`http://localhost:4321/admin/index.html`** (di mode dev Astro 7, `/admin/` tanpa `index.html` menghasilkan 404; di situs live `/admin/` berfungsi). Di localhost, Decap langsung menulis ke file di `src/content/` dan `public/uploads/`, tanpa login GitHub.

Tips untuk editor:

- Buka entry dengan mengklik dari daftar koleksi. Membuka entry lewat URL yang diketik langsung bisa memuat data entry sebelumnya.
- Tombol **Publish** dan **Delete entry** bersebelahan di kiri atas. Delete meminta konfirmasi; batalkan bila tidak sengaja.
- Teks yang mendukung `**tebal**` dan `*miring*` diberi keterangan di bawah field-nya.

## Struktur folder

```
.github/workflows/deploy.yml   Build + deploy ke GitHub Pages setiap push ke main
oauth-proxy/                   Cloudflare Worker untuk login GitHub di Decap
public/admin/                  Decap CMS (index.html, config.yml, preview.css)
public/CNAME                   Domain GitHub Pages (ladoob.my.id)
public/uploads/                Media dari CMS
src/content.config.ts          Schema Zod semua koleksi (nama field = config.yml)
src/content/pilar/id/          4 pilar (core, compass, masar, agent)
src/content/paket/id/          Paket harga
src/content/faq/id/            FAQ
src/content/blog/id/           Artikel blog (markdown)
src/content/pages/id/          home.yml (teks beranda) dan settings.yml (pengaturan situs)
src/i18n/ui.ts                 Teks UI statis (label tombol, aria-label) + helper t()
src/lib/                       content.ts (ambil konten + cek rilis), wa.ts (waLink), aksen.ts, md.ts, url.ts
src/components/                Header, Footer, HomePage, HeroVisual, BlogCard, Logo, Hex (penanda produk), Icon, SEO, Tracking
src/pages/[lang]/              Beranda, listing blog, detail artikel
scripts/bandingkan-mockup.mjs  Perbandingan visual mockup vs hasil build (lihat bawah)
DESIGN.md                      Arah desain: dial, warna, tipografi, motif
docs/inventaris-konten.md      Inventaris teks mockup asli, peta ke field CMS, dan keputusan pemilik
docs/revisi-copy.md            Daftar perubahan copy saat redesain (sebelum dan sesudah)
referensi/                     Mockup, logo, screenshot (cadangan, tidak dipakai di situs)
```

## Membandingkan dengan mockup

```bash
npm run build && npm run bandingkan
```

Script memasang Playwright, pngjs, dan pixelmatch sekali ke `.cache/bandingkan/` (bukan dependensi situs), lalu memotret mockup dan situs di lebar 1440, 1024, 768, 390, dan 360 px. Hasilnya (mockup, situs, diff, dan gambar berdampingan) ada di `docs/perbandingan/` (di-`.gitignore`), beserta `ringkasan.json` yang berisi posisi dan tinggi tiap section. Butuh internet karena mockup memuat Tailwind, Lucide, dan font dari CDN.

Sejak redesain 22 November 2026 situs **sengaja berbeda** dari mockup (lihat `DESIGN.md`), jadi angka selisih piksel tidak lagi menjadi syarat lulus. Script ini tetap berguna untuk melihat perbedaannya berdampingan.

## Deploy ke GitHub Pages

1. Repo lokal memakai remote SSH: `git remote add origin git@github.com:grintopsglobal/ladoob-website.git` (cek dengan `git remote -v`).
2. Push ke branch `main`.
3. Setiap push ke `main` (termasuk commit dari CMS) menjalankan `.github/workflows/deploy.yml` (Node 24, `withastro/action`, `actions/deploy-pages`).

### Checklist manual pemilik

Langkah ini tidak bisa dilakukan dari kode:

1. **DNS** di panel registrar `.my.id`:
   - A record `@` ke `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - AAAA record `@` ke `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - CNAME `www` ke `grintopsglobal.github.io`
   - Hapus record parkir atau forwarding bawaan registrar yang bentrok.
2. **Verifikasi domain** di GitHub: Settings organisasi `grintopsglobal` > Pages > Add a verified domain (TXT record `_github-pages-challenge-…`). Ini mencegah domain diambil alih repo lain.
3. **Repo > Settings > Pages:** Source **GitHub Actions**, Custom domain `ladoob.my.id`, tunggu sertifikat terbit, lalu centang **Enforce HTTPS**. `www.ladoob.my.id` otomatis dialihkan ke apex.
4. Cek `dig ladoob.my.id +short` dan `dig www.ladoob.my.id +short`. Propagasi DNS bisa beberapa jam.
5. **Worker OAuth dan GitHub OAuth App** (bagian berikut).
6. **Search Console:** verifikasi lalu kirim `https://ladoob.my.id/sitemap.xml`.

Sebelum DNS siap, uji dengan `npm run preview`. Jangan mengganti `site` ke URL `github.io`.

## Login CMS di situs live (GitHub OAuth + Cloudflare Worker)

GitHub Pages tidak bisa menjalankan server OAuth, jadi login Decap memakai Worker kecil di `oauth-proxy/`.

**1. Deploy Worker** (akun Cloudflare gratis cukup):

```bash
cd oauth-proxy
npx wrangler login
npx wrangler deploy
```

Catat URL-nya, misalnya `https://ladoob-decap-oauth.<akun>.workers.dev`.

**2. Buat GitHub OAuth App** di *GitHub > Settings > Developer settings > OAuth Apps > New OAuth App* (sebaiknya dari organisasi `grintopsglobal`):

- Homepage URL: `https://ladoob.my.id/`
- Authorization callback URL: `<URL Worker>/callback`

**3. Simpan kredensial di Worker** (jangan pernah di repo atau chat):

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

**4. Isi `base_url`** di `public/admin/config.yml` dengan URL Worker (sekarang berisi tebakan `https://ladoob-decap-oauth.grintopsglobal.workers.dev`), commit, dan push.

Token hanya dikirim ke origin di `ALLOWED_ORIGINS` (`oauth-proxy/wrangler.toml`). Editor perlu akses write ke repo. Cek Worker tanpa dependensi: `node oauth-proxy/test.mjs`.

## Domain: lima tempat yang harus sama

| Tempat | Nilai |
|---|---|
| `public/CNAME` | `ladoob.my.id` |
| `SITE` di `astro.config.mjs` | `https://ladoob.my.id` |
| `site_url` dan `display_url` di `public/admin/config.yml` | `https://ladoob.my.id/` |
| `ALLOWED_ORIGINS` di `oauth-proxy/wrangler.toml` | `https://ladoob.my.id,https://www.ladoob.my.id,http://localhost:4321` |
| Homepage URL di GitHub OAuth App | `https://ladoob.my.id/` |

`base` tetap `/`. Semua path internal lewat `withBase()`, jadi preview di `grintopsglobal.github.io/ladoob-website/` tidak rusak bila suatu saat dipakai.

## SEO & tracking

Diisi lewat CMS: **Pengaturan Situs > SEO** dan **SEO & Tracking**. Field kosong tidak memuat apa pun.

| Field | Isi | Dari mana |
|---|---|---|
| Kode verifikasi Search Console | hanya kode di `content="..."` | Search Console > URL prefix `https://ladoob.my.id/` > HTML tag |
| Google Tag Manager ID | `GTM-XXXXXXX` | tagmanager.google.com |
| Google Analytics 4 ID | `G-XXXXXXXXXX` | GA4 > Admin > Data streams |
| Meta Pixel ID | angka saja | Meta Events Manager |
| Meta tag tambahan | pasangan `name` / `content` | mis. `msvalidate.01` (Bing) |
| Gambar OG | 1200x630 | dibuat tim desain |

- Pilih **GTM saja** (GA4 dan Pixel dipasang di dalam GTM) **atau** GA4/Pixel langsung. Jangan keduanya, page view tercatat ganda.
- Format ID dikunci di schema: build gagal dengan pesan jelas bila salah, sehingga isian tidak bisa menyisipkan script lain.
- Selama Gambar OG kosong, tag `og:image` tidak dipasang (kartu share tanpa gambar).
- Halaman memakai canonical `/id/...`, hreflang di `<head>`, sitemap `/sitemap.xml` (alias `sitemap-index.xml`), `robots.txt` dengan `Disallow: /admin/`, dan JSON-LD `Article` di halaman artikel. Halaman 404 `noindex`.

## Mengubah konten

Semua teks beranda ada di CMS:

| Yang diubah | Koleksi CMS |
|---|---|
| Menu, label tombol WhatsApp, hero, judul tiap section, metrik & poin Manfaat, catatan harga, banner bawah, tautan footer | Halaman: Beranda |
| Empat produk (tab dan panel) | Produk (4 aplikasi) |
| Paket harga (pesan WA tiap paket otomatis ikut harga) | Paket Harga |
| FAQ (nomor urut otomatis) | FAQ |
| Artikel (3 terbaru tampil di beranda, semua di `/id/blog/`) | Blog |
| Nomor WA, email, footer, atribusi, SEO, pesan WhatsApp, klaim, tracking | Pengaturan Situs |

- **Pesan WhatsApp** punya placeholder: `{nama}` (nama produk atau paket), `{harga}` (paket), `{tahun}` (copyright).
- **Paragraf hero:** nama produk yang ditebalkan (`**Ladoob Core**`) otomatis diberi warna produknya.
- **Artikel baru:** isi *Slug URL* (huruf kecil dan tanda hubung). Mengubah slug artikel yang sudah tayang membuat URL lama 404. Artikel `draft` tidak tampil.
- **Gambar:** unggah sekitar 1600 px, WebP, di bawah 200 KB.
- Ilustrasi produk di hero (jendela Core, kartu Masar dan Agent) berisi **data contoh** dan sengaja tetap di `src/components/HeroVisual.astro`, bukan di CMS.

## Data yang masih perlu diisi

| Data | Lokasi |
|---|---|
| Nomor WhatsApp dan email khusus Ladoob (bila ada) | Pengaturan Situs; sementara memakai kontak GRINTEC (`info@grintecs.com`, +62 851 6136 4811) |
| Bukti tiap klaim | Pengaturan Situs > Klaim yang perlu diverifikasi |
| Gambar OG 1200x630 | Pengaturan Situs > SEO > Gambar OG |
| URL Worker OAuth | `base_url` di `public/admin/config.yml` |
| Konfirmasi logo resmi | Situs memakai logo SVG dari mockup; `referensi/logo/Ladoob_logo.jpg` berbeda desainnya |
| Isi lengkap 3 artikel | Saat ini sama dengan ringkasan baca cepat di mockup; kembangkan di CMS |

Tidak ada testimoni, logo klien, atau angka statistik yang dikarang.

## Keputusan pemilik (22 November 2026)

Lengkapnya di `docs/inventaris-konten.md`.

- Em dash dihapus dari semua teks (diganti titik dua, koma, atau titik).
- Klaim tanpa sumber tetap tampil, tetapi ditandai dan cek rilis gagal sampai diverifikasi.
- Pita paket Business "★ Paling Populer" menjadi "★ Rekomendasi".
- Ikon `sparkles` di "Full Brand Identity" menjadi `badge-check`.
- Label tombol "Coba Sekarang" menjadi "Jadwalkan Demo" (lebih spesifik soal aksinya), dan pesan WhatsApp diselaraskan.
- Domain `ladoob.my.id`; email dan nomor WhatsApp memakai kontak GRINTEC (23 November 2026); "Pullman Zamzam" di ilustrasi menjadi "Hotel Bintang 5"; ejaan dibakukan "Umrah"; bahasa Indonesia saja.
- **Redesain (22 November 2026):** referensi tetap mockup, tampilan dirapikan ke arah "tenang dan tepercaya" (dial ENERGY 1 / RHYTHM 2 / MOTION 1), copy ikut ditulis ulang tanpa menambah fakta (`docs/revisi-copy.md`), visual produk berupa ilustrasi berketerangan "Contoh tampilan" sampai ada screenshot asli bermerek Ladoob. Badge berdenyut di atas H1 dibuang (menggantikan keputusan sebelumnya untuk mempertahankannya).
- Footer memakai atribusi standar Grintec: "Dirancang, dikembangkan oleh Grintec. © {tahun} Ladoob. Hak cipta dilindungi undang-undang."

## Keputusan teknis dan alasannya

- **Acuan visual = hasil render mockup, bukan nama kelasnya.** Mockup memakai nama kelas Tailwind 4 tetapi dimuat dengan Tailwind **3** dari CDN, sehingga beberapa kelas berbeda arti atau tidak berefek. Aturan port:
  - `shadow-xs`, `shadow-2xs`, `backdrop-blur-xs` tidak berefek di mockup, jadi dihapus.
  - `py-4.5` di tombol FAQ juga tidak berefek di mockup (teks pertanyaan menempel ke garis kartu), tetapi **dipertahankan** karena jelas maksud desainnya dan perlu untuk target sentuh.
  - `shadow-sm` v3 = `shadow-xs` v4.
  - Di v3, `sm:text-*` me-reset line-height; di v4 `leading-*` selalu menang. Ditambahkan `sm:leading-*` setara.
  - v4 menyimpan line-height `text-2xl` sebagai rasio, jadi ukuran arbitrer diberi tinggi baris eksplisit (`sm:text-[26px]/8`).
  - Palet slate, emerald, amber, rose, dan sky ditimpa ke nilai heksadesimal v3 di `@theme`.
  - Hasilnya: posisi dan tinggi setiap section sampai Blog sama persis dengan mockup di 5 lebar layar.
- **Token camelCase** (`bg-ladoob-navyDark`, `text-ladoob-masarText`) ter-generate normal di Tailwind 4, jadi nama kelas mockup dipertahankan.
- **Kontras (WCAG AA), dihitung ulang:**

  | Token | Hex | Kontras | Catatan |
  |---|---|---|---|
  | navy | `#183654` | 12,39:1 vs putih | aman |
  | navyDark | `#0F253B` | 15,58:1; `slate-300` di atasnya 10,49:1 | aman |
  | navyLight | `#234B73` | 9,03:1 | aman |
  | compass | `#B8332A` | 5,92:1; di atas compassLight 5,40:1 | aman |
  | agent | `#1E5648` | 8,47:1; di atas agentLight 7,86:1 | aman |
  | masar | `#C27838` | 3,48:1; di atas masarLight 3,27:1 | **gagal AA**, hanya untuk ikon, garis, aksen |
  | masarText (baru) | `#9A5A26` | 5,43:1; di atas masarLight 5,11:1 | teks, badge, centang, panel Masar |

  Penyesuaian lain karena kontras: tombol banner `emerald-500` (2,54:1) menjadi `emerald-700` (5,48:1); label kecil `slate-400` (2,56:1) menjadi `slate-500` (4,76:1); pill kategori artikel Masar memakai `bg-black/15` karena putih di atas `white/20` + cokelat Masar hanya 3,65:1; tombol tutup modal `slate-500`.
- **Redesain mengikuti antislop:** tanpa label kapital di atas judul, tanpa badge dan titik berdenyut, tanpa animasi melayang, tanpa orb blur dan gradien dekoratif, tanpa jendela browser palsu, tanpa kartu yang mengulang isi tab. Warna produk hanya untuk mengenali produk; aksen hijau hanya pada tombol WhatsApp di titik konversi. Shadow hanya pada visual produk, menu, modal, dan tombol WhatsApp melayang (yang memang berada di atas konten). Blur hanya di header.
- **Aksesibilitas:** tab produk memakai pola ARIA tablist (panah, Home/End, roving tabindex; tampilan aktif lewat `aria-selected`); FAQ memakai `button` + `aria-expanded` + `inert`; modal artikel memakai `<dialog>` native (Escape, fokus kembali); fokus keyboard dua warna terlihat di latar terang dan gelap; area klik tombol kecil minimal 44 px lewat margin negatif atau `::before` (link footer 30 px karena jarak antarbaris, tetap lolos WCAG AA). Tombol WhatsApp melayang hanya tampil di layar kecil, karena di layar lebar tombol header sudah selalu terlihat.
- **Panel pilar** dirender keempatnya di HTML dan yang tidak aktif disembunyikan (tanpa `innerHTML`); **modal artikel** satu `<dialog>` per artikel dirender saat build.
- **Cek rilis lewat `getSettings()`** (`src/lib/content.ts`): satu tempat untuk peringatan build dan `npm run cek-rilis`, tanpa parser YAML tambahan.
- **Halaman dan pengaturan memakai folder collection dengan `filter`**, karena koleksi `files` di Decap hanya mendukung i18n `single_file`.
- **Media CMS di `public/uploads/` dengan `<img>` biasa**, bukan `astro:assets`, karena Decap menyimpan path publik absolut. `bodyHtml()` menambahkan base path di body markdown.
- **Tema terang saja**, sesuai mockup.
- **Font:** Plus Jakarta Sans (heading 600/700/800) dan Inter (body 400–700), bobot persis URL Google Fonts di mockup, dimuat tanpa memblokir render.
- **Ikon Lucide** (pilihan pemilik di mockup), dipakai hemat: centang, panah, WhatsApp, dan tombol tutup. Paket `lucide` versi pin dirender saat build.
- **Language switcher dihapus** selama hanya ada satu bahasa; tambahkan kembali dari repo referensi bersama `en`.

### Perbedaan versi dengan repo referensi GRINTEC

| Paket | Referensi | Ladoob |
|---|---|---|
| astro | 7.4.1 | 7.4.7 |
| tailwindcss, @tailwindcss/vite | 4.3.3 | 4.3.5 |
| decap-cms (unpkg) | 3.16.3 | 3.17.3 |
| decap-server | 3.11.5 | 3.11.6 |
| @astrojs/sitemap | 3.7.4 | 3.7.4 |

Semua dalam major yang sama. Perbedaan perilaku yang ditemui: di Astro 7.4.7, `dev` dan `preview` berjalan sebagai daemon, dan `/admin/` di mode dev perlu `index.html`.
