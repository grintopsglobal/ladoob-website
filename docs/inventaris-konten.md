# Inventaris konten mockup Ladoob

> **Catatan 22 November 2026:** dokumen ini mencatat teks mockup asli dan keputusan Fase 0-1. Setelah redesain, copy di situs ditulis ulang; perubahannya ada di `docs/revisi-copy.md`, dan arah desainnya di `DESIGN.md`.

Sumber: `referensi/mockup/ladoob_beyond_smart_travel_landing_page.html`. Teks ditulis persis seperti di mockup, kecuali yang ditandai **[ubah]** sesuai keputusan pemilik di bawah. Kolom "Field" memetakan teks ke schema CMS (A5). `komponen` berarti teks tetap di kode komponen (ilustrasi produk dengan data contoh, tidak masuk CMS).

## Keputusan pemilik (antislop, 22 November 2026)

| No | Keputusan | Penerapan |
|---|---|---|
| 1 | Em dash dihapus | 9 em dash di teks tampil diganti tanda baca biasa (lihat tanda **[ubah]**). Rentang angka dengan en dash (`3–7 hari`) tetap. |
| 2 | Klaim tanpa sumber diberi flag | Klaim tetap dibangun, tetapi ditandai `[REAL DATA]` dan dicek saat rilis. Build memberi peringatan dan cek rilis gagal sampai pemilik mengonfirmasi tiap klaim. Daftar klaim ada di bagian "Klaim yang diberi flag". |
| 3 | Pita tier Business | "★ Paling Populer" diganti "★ Rekomendasi". |
| 4 | Ikon `sparkles` | Diganti `badge-check` di label "Full Brand Identity". |
| 5 | Badge pill di atas H1 | Tetap, termasuk titik berdenyut (berhenti saat `prefers-reduced-motion`). |
| 6 | Lucide + Inter | Tetap. Alasannya: dipilih pemilik di mockup (Variabel `IKON`, `FONT`). |

## Jawaban A7 (22 November 2026)

| No | Jawaban | Penerapan |
|---|---|---|
| 1 | Domain `ladoob.my.id` | Teks footer dan copyright memakai `ladoob.my.id`. Domain contoh di ilustrasi hero (`core.ladoob.com`, `ladoob.app/r/budi123`) tetap, sesuai A7. |
| 2 | Email dan nomor WhatsApp dikosongkan dulu | Baris email/telepon di footer disembunyikan selama kosong. CTA tetap ke `wa.me/?text=…` (WhatsApp membuka pilihan kontak). `npm run build` memberi peringatan dan cek rilis gagal selama nomor kosong. |
| 3 | (tidak dijawab) | Default: logo SVG mockup. |
| 5 | Nama hotel generik | "Pullman Zamzam" diganti "Hotel Bintang 5". |
| 6 | Bahasa Indonesia saja | Struktur i18n tetap disiapkan. |
| 7 | Bakukan "Umrah" | "Umroh Reguler 9 Hari" menjadi "Umrah Reguler 9 Hari". |
| 8-10 | (tidak dijawab) | Default: artikel `draft: false`; dua field ikon pilar; pita "★ Rekomendasi" dengan bintang. |
| 11 | Git belakangan | Belum `git init`. |

## Klaim yang diberi flag (keputusan 2)

| Klaim | Lokasi | Field |
|---|---|---|
| 75% lebih cepat menyusun manifest | Manfaat, metrik 1 | `home.manfaat.metrik[0]` |
| 0% kebocoran selisih kurs & HPP | Manfaat, metrik 2 | `home.manfaat.metrik[1]` |
| 10x kapasitas jaringan agen | Manfaat, metrik 3 | `home.manfaat.metrik[2]` |
| 100% kepemilikan lisensi | Manfaat, metrik 4 | `home.manfaat.metrik[3]` |
| "Ribuan agen, reseller, dan affiliator" | Manfaat, poin 2 | `home.manfaat.poin[1]` |
| SLA uptime 99.9% & Dedicated Account Manager | Harga, Enterprise | `paket/enterprise.fitur[4]` |
| Server online 24/7, backup database harian | FAQ 1 | `faq/one-time.jawaban` |
| Durasi implementasi 3–7 hari / 2–5 minggu | FAQ 5 | `faq/implementasi.jawaban` |
| "Sangat terjamin", isolasi database, enkripsi SSL/TLS end-to-end, RBAC, audit trail, backup harian | FAQ 6 | `faq/keamanan.jawaban` |
| Aplikasi di Play Store / App Store | Harga Business & Whitelabel, FAQ 5 | `paket/*.fitur` |
| Integrasi payment gateway | Harga Business | `paket/business.fitur[4]` |
| Audio pendamping doa | Pilar Masar | `pilar/masar.fitur[0]` |
| Cicilan | Pilar Compass, kartu Compass | `pilar/compass.*` |

Mekanisme flag ditetapkan di Fase 2 (usulan: field boolean `terverifikasi` per klaim, build memberi peringatan selama `false`, `npm run cek-rilis` gagal).

---

## 0. Head

| Teks | Field |
|---|---|
| Ladoob — Beyond Smart Travel \| Platform Manajemen Travel & Umrah Terpadu **[ubah]** → `Ladoob: Beyond Smart Travel \| Platform Manajemen Travel & Umrah Terpadu` | `settings.seo.title` |
| Kendali penuh operasional travel wisata & Umrah dalam satu ekosistem terpadu: Ladoob Core, Compass, Masar (مسار), dan Agent App. | `settings.seo.description` |

## 1. Header

| Teks | Field |
|---|---|
| Ladoob / ® | `settings.namaBrand` (tetap "Ladoob") |
| Beyond Smart Travel | `settings.tagline` |
| aria-label "Ladoob Beranda" | `ui.ts` |
| Menu: Fitur & Ekosistem, Manfaat Bisnis, Harga, Blog, FAQ | `home.menu[]` (label + anchor) |
| Coba Sekarang | `home.labelCta` |
| aria-label "Buka menu navigasi" | `ui.ts` |
| WA: "Halo tim Ladoob, saya ingin coba dan jadwalkan demo platform Ladoob." | `home.pesanWa.header` |

## 2. Hero

| Teks | Field |
|---|---|
| Ekosistem Manajemen Travel 4-in-1 | `home.hero.badge` |
| Beyond Smart Travel: Kendali Penuh Operasional & Perjalanan | `home.hero.judul` |
| Hubungkan operasional kantor pusat (**Ladoob Core**), aplikasi pendamping wisatawan & jamaah (**Ladoob Compass** & **Ladoob Masar**), serta jaringan mitra penjualan (**Ladoob Agent**) dalam satu platform terpadu. | `home.hero.paragraf` (markdown; warna nama pilar diterapkan komponen) |
| Coba Sekarang | `home.labelCta` |
| WA: "Halo tim Ladoob, saya ingin coba sekarang dan lihat demo ekosistem Ladoob (Core, Compass, Masar, Agent)." | `home.pesanWa.hero` |
| Lihat Paket Harga | `home.hero.ctaKedua` |
| Lisensi Sekali Bayar / Mode Offline Jamaah / Portal Agen Otomatis | `home.hero.trust[]` |

**Ilustrasi hero (`komponen`, data contoh):**

- Jendela Core: `core.ladoob.com`, "Live Sync Aktif", "L", "Ladoob Core", "Executive Control", menu Dasbor / Inventori / Pembelian / Penjualan / Finansial, Compass "Wisata", "Masar مسار" "Umrah", "Multi-Kurs: IDR • USD • SAR", "Ringkasan Real-Time", "Dasbor Eksekutif", "Kuartal Berjalan", KPI "Pendapatan Bersih / Rp 1,25 M / +18,4%", "Total Closing / 145 Order / 100% Sync", "Net Profit Margin / 36.0% / HPP Aman", "Tren Penjualan vs Realisasi HPP", "Omzet", "Margin".
- Kartu Masar: "Ladoob Masar • مسار", "Aplikasi Jamaah Umrah", "OFFLINE READY", "H. Mursito", "Kloter 04 • Bus 02", "SOS", "Hotel Makkah", "Pullman Zamzam" **[ubah]** → `Hotel Bintang 5`, "Kamar 304", "Status Koper", "Sudah Tiba", "Depan Kamar".
- Kartu Agent: "Ladoob Agent", "Portal Mitra & Affiliator", "Mitra Aktif", "Umroh Reguler 9 Hari" **[ubah]** → `Umrah Reguler 9 Hari`, "12 Seat", "Komisi Mitra:", "Rp 500.000 / jamaah", "ladoob.app/r/budi123", "Salin Link" → "Tersalin!".

## 3. Fitur & 4 Pilar (`#fitur`)

| Teks | Field |
|---|---|
| Arsitektur 4 Pilar Terintegrasi | `home.fitur.label` |
| Satu Pusat Kendali, Tiga Aplikasi Lapangan yang Saling Terhubung | `home.fitur.judul` |
| Setiap lini bisnis travel Anda mendapatkan pengalaman digital yang dirancang khusus sesuai perannya—tanpa duplikasi input data. **[ubah]** → `…sesuai perannya, tanpa duplikasi input data.` | `home.fitur.deskripsi` |
| aria-label tablist "Pilih Pilar Ekosistem Ladoob" | `ui.ts` |
| Lihat detail modul | `ui.ts` |
| Keunggulan Utama | `ui.ts` |
| Coba Sekarang → (panel) | `home.labelCta` |
| WA panel: "Halo Ladoob, saya ingin Coba Sekarang modul " + judul pilar | `settings` template + `pilar.judul` |

**Koleksi `pilar`** (urutan, ikon tab, ikon kartu, aksen):

| key | order | namaTab | ikon tab / kartu | aksen |
|---|---|---|---|---|
| core | 1 | 1. Ladoob Core (Web) | layout-dashboard / server | navy |
| compass | 2 | 2. Ladoob Compass | compass / compass | compass |
| masar | 3 | 3. Ladoob Masar (مسار) | navigation / navigation | masar |
| agent | 4 | 4. Ladoob Agent | briefcase / users | agent |

Catatan: ikon tab dan ikon kartu berbeda untuk Core dan Agent, jadi schema butuh dua field (`ikonTab`, `ikonKartu`) atau satu field bila pemilik setuju diseragamkan. Usulan: dua field, agar sama dengan mockup.

**core**

- labelKartu: Web Dashboard • Owner & Pusat
- judulKartu: Ladoob Core
- deskripsiKartu: Pusat kendali manajemen paket & HPP (tiket, hotel, visa, LA), akuntansi & arus kas, manifest otomatis, kontrol margin, dan laporan real-time.
- badge: Pilar 1 • Web Dashboard Pusat
- judul: Ladoob Core — Pusat Kendali Owner & Tim Operasional **[ubah]** → `Ladoob Core: Pusat Kendali Owner & Tim Operasional`
- subjudul: Satu layar komando untuk mengontrol seluruh produk wisata & Umrah, biaya vendor, arus kas, dan kinerja cabang maupun agen.
- fitur:
  - Kalkulator HPP & Harga Jual Multi-Mata Uang (IDR, USD, SAR) dengan kunci margin otomatis
  - Manajemen Manifest, Roomlist Hotel, Pembagian Bus & Status Dokumen Paspor/Visa
  - Akuntansi & Arus Kas Terintegrasi (Piutang Jamaah, Hutang Vendor, Laba Rugi per Keberangkatan)
  - Kontrol Stok Seat & Inventaris Perlengkapan Koper/Ihram Real-Time
- highlightJudul: Kontrol Penuh Sebelum Keberangkatan
- highlightDeskripsi: Setiap perubahan jadwal penerbangan atau nomor kamar hotel di Ladoob Core langsung tersinkronisasi otomatis ke aplikasi Compass, Masar, dan Agent tanpa input ulang.

**compass**

- labelKartu: Customer App • Wisata Umum
- judulKartu: Ladoob Compass
- deskripsiKartu: Aplikasi mobile untuk open trip, private tour & corporate. Itinerary digital interaktif, e-ticket & voucher hotel, cicilan, hingga live trip update.
- badge: Pilar 2 • Mobile App Wisatawan Umum
- judul: Ladoob Compass — Pendamping Perjalanan Wisata Modern **[ubah]** → `Ladoob Compass: Pendamping Perjalanan Wisata Modern`
- subjudul: Dirancang khusus untuk segmen Open Trip, Private Tour, MICE, dan Corporate Incentive dengan tampilan bersih dan interaktif.
- fitur:
  - Itinerary Digital Harian Lengkap dengan Peta Lokasi, Titik Kumpul & Kontak Tour Leader
  - Dompet Dokumen Perjalanan (E-Ticket Pesawat, Voucher Hotel, Asuransi & Visa)
  - Pemesanan Paket Mandiri & Pelacakan Jadwal Pembayaran Cicilan Transparan
  - Notifikasi Live Trip Update & Pengumuman Rombongan Secara Real-Time
- highlightJudul: Bebas Repot File PDF Tercecer
- highlightDeskripsi: Wisatawan cukup membuka satu aplikasi beridentitas travel Anda untuk mengakses seluruh jadwal tur dan tiket perjalanan bahkan saat koneksi terbatas.

**masar**

- labelKartu: Customer App • Umrah & Haji
- judulKartu: Ladoob Masar + "مسار" (span aksen)
- deskripsiKartu: Aplikasi khusus jamaah Umrah & Haji. Panduan manasik digital & doa harian, jadwal pembagian kamar/bus, pelacakan koper & grup, serta notifikasi ibadah.
- badge: Pilar 3 • Mobile App Jamaah Umrah & Haji
- judul: Ladoob Masar (مسار) — Pendamping Ibadah & Perjalanan Tanah Suci **[ubah]** → `Ladoob Masar (مسار): Pendamping Ibadah & Perjalanan Tanah Suci`
- subjudul: Menghadirkan ketenangan bagi jamaah dan keluarga di tanah air melalui panduan ibadah serta informasi logistik yang terstruktur.
- fitur:
  - Panduan Manasik Digital, Niat & Doa Thawaf/Sa’i Interaktif Beserta Audio Pendamping
  - Informasi Nomor Kamar Hotel Makkah-Madinah, Nomor Kursi Bus & Kontak Muthawwif
  - Pelacakan Status Koper Bagasi, Checklist Perlengkapan & Jadwal Keberangkatan
  - Notifikasi Waktu Shalat Lokal & Pengingat Agenda Ziarah / Raudhah
- highlightJudul: Khusyuk Beribadah, Tenang Secara Logistik
- highlightDeskripsi: Membantu pembimbing ibadah (Muthawwif) dan tim operasional mengurangi ratusan pertanyaan berulang terkait lokasi titik kumpul dan pembagian kamar.

**agent**

- labelKartu: Mitra App • Agen & Affiliator
- judulKartu: Ladoob Agent
- deskripsiKartu: Portal & aplikasi mobile untuk agen, reseller, dan affiliator. Katalog paket siap jual dengan link afiliasi unik, booking instan, dan pelacakan komisi transparan.
- badge: Pilar 4 • Portal & App Mitra Penjualan
- judul: Ladoob Agent — Akselerator Jaringan Agen, Reseller & Affiliator **[ubah]** → `Ladoob Agent: Akselerator Jaringan Agen, Reseller & Affiliator`
- subjudul: Ubah jaringan mitra dan alumni jamaah menjadi mesin penjualan yang terukur dengan transparansi komisi otomatis.
- fitur:
  - Katalog Paket & Materi Promosi Siap Sebar Lengkap dengan Link Afiliasi Unik
  - Input Pendaftaran Jamaah/Peserta & Upload Dokumen KTP/Paspor Langsung dari Ponsel
  - Dashboard Pelacakan Status Pembayaran Prospek & Estimasi Komisi Real-Time
  - Sistem Tiering Agen & Pengajuan Pencairan Komisi yang Rapi dan Terdokumentasi
- highlightJudul: Perluas Jangkauan Tanpa Beban Admin
- highlightDeskripsi: Mitra dapat memantau sisa seat dan status pelunasan jamaahnya sendiri kapan saja tanpa harus terus bertanya ke admin kantor pusat.

## 4. Manfaat Bisnis (`#manfaat`)

| Teks | Field |
|---|---|
| Business Value & ROI | `home.manfaat.label` |
| Dirancang untuk Melindungi Profit & Mempercepat Skala Bisnis Travel Anda | `home.manfaat.judul` |
| Banyak biro perjalanan kehilangan margin bukan karena kurang jamaah atau peserta, melainkan karena kebocoran HPP dan lambatnya proses administrasi manual. | `home.manfaat.narasi` |
| Dampak Operasional Terukur | `home.manfaat.judulMetrik` |

Metrik (`home.manfaat.metrik[]`: angka, keterangan, warna angka). Semua diberi flag:

| Angka | Keterangan | Warna |
|---|---|---|
| 75% | Lebih cepat menyusun manifest, roomlist & dokumen keberangkatan | white |
| 0% | Kebocoran selisih kurs & biaya komponen HPP tak tercatat | amber-300 |
| 10x | Kapasitas jaringan agen & affiliator tanpa tambah staf admin | emerald-300 |
| 100% | Kepemilikan lisensi platform tanpa potongan per jamaah/pax | white |

Poin (`home.manfaat.poin[]`: ikon, aksen, judul, deskripsi):

| Ikon / aksen | Judul | Deskripsi |
|---|---|---|
| shield-check / navy | Kebocoran HPP & Margin Terkendali | Kalkulasi otomatis seluruh komponen biaya perjalanan (tiket pesawat, hotel Makkah/Madinah/destinasi, visa, transport, handling) dengan konversi kurs sebelum paket dirilis ke agen. |
| network / agent | Skalabilitas Jaringan Agen Tanpa Tambah Admin | Ribuan agen, reseller, dan affiliator dapat membagikan katalog, menginput pendaftaran jamaah/peserta, hingga memantau status komisi secara mandiri lewat aplikasi Ladoob Agent. |
| smartphone / masar | Pengalaman Jamaah & Wisatawan Lebih Profesional | Tidak perlu lagi mengirim file PDF itinerary, nomor kamar, atau e-ticket berulang kali di grup chat. Seluruh dokumen, panduan manasik, dan notifikasi jadwal tersaji rapi di Compass & Masar. |
| key-round / compass | Kepemilikan Platform (One-Time License) | Investasi lisensi platform sekali bayar di awal—bukan skema sewa per kepala atau potongan per transaksi yang membengkak saat musim ramai. Cukup perpanjang biaya cloud & maintenance tahunan. **[ubah]** → `…sekali bayar di awal, bukan skema sewa…` |

## 5. Harga (`#harga`)

| Teks | Field |
|---|---|
| Investasi Transparan & Terukur | `home.harga.label` |
| Pilih Paket Ekosistem Sesuai Skala Travel Anda | `home.harga.judul` |
| Seluruh paket menggunakan skema lisensi platform **One-Time (Sekali Bayar)** dengan biaya Cloud & Maintenance tahunan yang ringan dan dapat diprediksi. | `home.harga.deskripsi` (markdown) |
| Catatan Penting: Harga paket di atas khusus untuk lisensi platform & ekosistem Ladoob, tidak termasuk pembuatan website company profile perusahaan travel. | `home.harga.disclaimerJudul` |
| Seluruh paket menerapkan biaya lisensi platform **One-Time (sekali bayar)** dan perpanjangan **Cloud & Maintenance tahunan**. Layanan pembuatan website *company profile* perusahaan travel tersedia sebagai opsi tambahan (*add-on*) terpisah. | `home.harga.disclaimer` (markdown) |
| Coba Sekarang | `home.labelCta` |

**Koleksi `paket`** (`labelHarga` sama untuk semua: "Harga Platform (One-Time)"; `labelMaintenance` sama: "Cloud + Maintenance Tahunan:"):

| order | nama | deskripsi | harga | maintenance | pita | sorot |
|---|---|---|---|---|---|---|
| 1 | Starter | Cocok untuk travel rintisan & agensi baru. | Rp 14.500.000 | **Rp 3.600.000 / tahun** (Gratis tahun pertama) | | false |
| 2 | Business | Ideal untuk biro wisata & travel Umrah berkembang. | Rp 29.000.000 | **Rp 6.000.000 / tahun** (Gratis tahun pertama) | ★ Paling Populer **[ubah]** → `★ Rekomendasi` | true |
| 3 | Enterprise | Untuk travel multi-cabang & penyelenggara Umrah/Haji skala besar. | Rp 55.000.000 | **Rp 10.800.000 / tahun** (Dedicated Cloud) | | false |
| 4 | Custom Whitelabel | Ekosistem penuh dengan identitas merek & domain Anda sendiri. | Mulai Rp 85.000.000 | Sesuai kapasitas infrastruktur server | label "Full Brand Identity" (ikon `badge-check`) | gaya gelap |

Catatan: field `maintenance` butuh dua bagian (nominal tebal + catatan berwarna). Usulan: `maintenance` (teks) + `catatanMaintenance` (teks). Kartu Whitelabel memakai gaya gelap tersendiri, jadi `sorot` diganti pilihan `gaya: biasa | sorot | gelap`.

Fitur:

- **Starter**: **Ladoob Core Web** (hingga 3 akun admin) · Modul manajemen paket & manifest dasar · Laporan keuangan & arus kas standar · Kapasitas hingga **25 agen aktif** · Dukungan teknis email & WA jam kerja
- **Business**: **Ladoob Core Web** (unlimited admin & role akses) · Aplikasi Android/iOS **Ladoob Compass atau Masar** · **Ladoob Agent App** untuk jaringan mitra & affiliator · Kalkulator HPP & multi-currency (IDR / USD / SAR) · Integrasi Payment Gateway & Prioritas Support WA
- **Enterprise**: **Full 4 Pilar Ekosistem** (Core Web + Compass + Masar + Agent App) · Multi-cabang & multi-gudang logistik perlengkapan · Hierarki komisi agen bertingkat (tiering & override) · API & webhook integrasi software akuntansi · SLA uptime 99.9% & Dedicated Account Manager
- **Custom Whitelabel**: **100% Whitelabel** (nama aplikasi, ikon, warna & domain milik brand Anda di Play Store / App Store) · Kustomisasi alur bisnis & modul spesifik perusahaan · Opsi deployment di cloud/server pribadi perusahaan · Opsi full source-code / escrow agreement resmi

Pesan WA mockup (dirakit dari data, A6):

- Starter/Business/Enterprise: "Halo Ladoob, saya tertarik Coba Sekarang untuk paket {nama} ({harga} One-Time)."
- Whitelabel: "Halo Ladoob, saya tertarik Coba Sekarang untuk paket Custom Whitelabel." (tanpa harga, karena "Mulai …"). Usulan: `pesanWa` per paket opsional, default dirakit dari template.

## 6. Blog (`#blog`)

| Teks | Field |
|---|---|
| Blog & Wawasan Industri | `home.blog.label` |
| Strategi Operasional & Digitalisasi Travel Modern | `home.blog.judul` |
| Panduan praktis bagi pemilik biro wisata dan penyelenggara Umrah dalam mengelola margin, agen, dan pengalaman jamaah. | `home.blog.deskripsi` |
| Estimasi baca: {n} menit | `ui.ts` + `blog.estimasiBaca` |
| Baca Artikel | `ui.ts` |
| Ingin menerapkan sistem ini di travel Anda? | `ui.ts` |
| WA modal: "Halo Ladoob, saya baru membaca artikel di website dan ingin coba sistem travel Ladoob." | `home.pesanWa.artikel` |
| aria-label "Tutup artikel" | `ui.ts` |
| (baru) Baca selengkapnya | `ui.ts` |

**Koleksi `blog`** (warna kartu dan ikon dekoratif per artikel butuh field `aksen` + `ikon`):

| slug | kategori | estimasi | aksen / ikon |
|---|---|---|---|
| hpp-paket-umrah-multi-mata-uang | Manajemen Travel Umrah | 4 | masar / calculator |
| sistem-komisi-affiliator-reseller | Strategi Pertumbuhan Agen | 5 | agent / share-2 |
| spreadsheet-ke-ekosistem-terintegrasi | Digitalisasi Operasional | 4 | navy / layers |

Slug di atas usulan (mockup tidak punya slug).

1. **Cara Menghitung HPP Paket Umrah Multi-Mata Uang (SAR, USD, IDR) Agar Margin Tidak Terkikis Kurs**
   - ringkasan: Fluktuasi nilai tukar Riyal Saudi (SAR) dan Dolar AS (USD) sering kali menggerus keuntungan paket Umrah yang sudah terlanjur dipublikasikan ke agen. Pelajari struktur penguncian HPP berbasis komponen.
   - ringkasanModal / body:
     1. Salah satu tantangan terbesar penyelenggara perjalanan Umrah adalah struktur biaya yang terbagi ke dalam tiga mata uang sekaligus: komponen Land Arrangement (hotel Makkah-Madinah, transportasi darat, muthawwif, konsumsi) dalam Riyal Saudi (SAR), tiket penerbangan internasional & visa dalam Dolar AS (USD), serta perlengkapan dan operasional lokal dalam Rupiah (IDR).
     2. Ketika harga paket sudah dirilis ke ratusan agen beberapa bulan sebelum keberangkatan tanpa penguncian kurs penyangga (buffer rate), kenaikan kurs sebesar Rp 150–Rp 300 per SAR saja dapat memangkas margin bersih secara signifikan.
     3. Melalui modul kalkulator HPP di Ladoob Core, setiap komponen biaya dicatat dalam mata uang aslinya beserta kurs acuan dan margin pengaman. Saat terjadi pelunasan ke vendor, sistem langsung membandingkan estimasi HPP awal dengan realisasi aktual sehingga owner memiliki visibilitas penuh atas profitabilitas setiap kloter.
2. **Membangun Sistem Komisi Affiliator & Reseller Travel yang Transparan Tanpa Beban Admin Manual**
   - ringkasan: Kunci memperbesar jaringan agen dan syiar Umrah adalah kepercayaan pada perhitungan komisi. Simak bagaimana link afiliasi unik dan dashboard komisi otomatis meningkatkan produktivitas mitra.
   - ringkasanModal / body:
     1. Pertumbuhan banyak biro travel modern bertumpu pada kekuatan jaringan syiar, ketua rombongan, reseller, hingga affiliator digital. Namun, masalah klasik muncul ketika jumlah mitra melewati puluhan orang: rekapitulasi komisi di spreadsheet mulai tertukar dan mitra terus menanyakan status pembayaran jamaah mereka.
     2. Dengan membekali mitra menggunakan aplikasi Ladoob Agent, setiap mitra memiliki katalog paket dengan tautan afiliasi unik dan formulir pendaftaran langsung yang terhubung ke Ladoob Core.
     3. Begitu jamaah melakukan pembayaran DP atau pelunasan yang terverifikasi sistem, status komisi mitra otomatis berubah secara transparan. Tim keuangan pusat cukup meninjau rekap pencairan komisi secara berkala tanpa perlu menghitung manual satu per satu.
3. **Mengapa Travel Modern Beralih dari Spreadsheet ke Ekosistem Terintegrasi untuk Manifest & Itinerary**
   - ringkasan: Mengelola ratusan data paspor, pembagian kamar hotel, dan revisi jadwal penerbangan di banyak file spreadsheet sangat rawan human-error. Lihat perbandingan alur kerja terpusat.
   - ringkasanModal / body:
     1. Spreadsheet memang fleksibel di awal berdiri, tetapi saat menangani beberapa keberangkatan wisata dan Umrah secara bersamaan, menyalin data paspor dari grup chat ke file manifest, lalu menyusun ulang untuk roomlist hotel dan e-ticket sangat rentan terhadap salah ketik.
     2. Lebih jauh lagi, perubahan jadwal penerbangan atau nomor kamar sering kali memaksa admin mengirimkan file PDF revisi berulang kali yang membingungkan peserta.
     3. Dalam ekosistem Ladoob, data jamaah/wisatawan cukup diinput satu kali. Manifest keberangkatan, pembagian kamar, hingga pembaruan itinerary langsung terkirim ke aplikasi Ladoob Compass atau Ladoob Masar di ponsel masing-masing peserta secara real-time.

Catatan: `ringkasanModal` di mockup berupa 3 paragraf, jadi field ini bertipe markdown. Body awal = paragraf yang sama, `draft: false` (keputusan no. 8) supaya beranda sama dengan mockup.

## 7. FAQ (`#faq`)

| Teks | Field |
|---|---|
| Pertanyaan yang Sering Diajukan | `home.faq.label` |
| Informasi Teknis & Skema Kerja Sama Ladoob | `home.faq.judul` |
| Jawaban ringkas untuk membantu Anda mengambil keputusan terbaik bagi operasional travel Anda. | `home.faq.deskripsi` |

**Koleksi `faq`** (nomor "1." dst. di mockup ditulis di teks pertanyaan; usulan: dirender otomatis dari `order`):

1. Apa maksud skema pembayaran One-Time untuk platform dan biaya Cloud + Maintenance tahunan?
   Anda hanya membayar biaya lisensi software **satu kali di awal (One-Time)** tanpa biaya sewa bulanan per pengguna ataupun potongan per jamaah/peserta. Mulai tahun kedua, Anda cukup membayar biaya **Cloud Infrastructure & Maintenance tahunan** untuk menjaga server tetap online 24/7, backup database harian, sertifikat SSL, serta pembaruan keamanan dan pemeliharaan sistem.
2. Apakah harga paket sudah termasuk website company profile perusahaan travel kami?
   **Belum termasuk.** Seluruh paket harga Ladoob difokuskan pada ekosistem sistem manajemen operasional (*Ladoob Core Web*) serta aplikasi mobile pelanggan & mitra (*Compass, Masar, Agent*). Apabila perusahaan Anda belum memiliki website profil atau ingin mengintegrasikan katalog website dengan Ladoob Core, layanan pembuatan website *company profile* tersedia sebagai **add-on terpisah**.
3. Apakah Ladoob bisa digunakan untuk travel wisata umum saja, atau khusus Umrah & Haji?
   **Bisa keduanya maupun salah satu.** Ekosistem Ladoob dirancang modular: Anda dapat menjalankan lini wisata domestik & internasional melalui aplikasi **Ladoob Compass**, serta menjalankan lini perjalanan ibadah Umrah & Haji khusus melalui aplikasi **Ladoob Masar (مسار)**—keduanya dikelola terpusat dari satu dashboard **Ladoob Core**. **[ubah]** → `…**Ladoob Masar (مسار)**. Keduanya dikelola terpusat…`
4. Bagaimana proses migrasi data jamaah, paket, dan agen yang sudah ada sebelumnya?
   Ladoob menyediakan fitur **Bulk Import (Excel/CSV)** dengan template standar yang mudah diisi. Tim *onboarding* kami juga akan mendampingi proses pembersihan dan impor data master pelanggan/jamaah, daftar agen aktif, serta paket keberangkatan yang sedang berjalan agar transisi berjalan mulus.
5. Berapa lama waktu implementasi hingga sistem siap digunakan operasional?
   Untuk paket **Starter** dan **Business**, setup infrastruktur cloud, konfigurasi awal, dan pelatihan tim admin memakan waktu **3–7 hari kerja**. Untuk paket **Enterprise** dan **Custom Whitelabel** (termasuk proses publikasi akun developer Google Play Store & Apple App Store), estimasi implementasi berkisar antara **2–5 minggu** sesuai ruang lingkup kustomisasi.
6. Apakah data keuangan dan database jamaah milik travel kami terjamin keamanannya?
   **Sangat terjamin.** Setiap klien mendapatkan isolasi database terpisah dengan enkripsi SSL/TLS end-to-end, kontrol hak akses berbasis peran (*Role-Based Access Control*), log aktivitas pengguna (*audit trail*), serta pencadangan data otomatis harian. Data Anda sepenuhnya milik perusahaan Anda dan tidak pernah dibagikan ke pihak mana pun.

## 8. Banner CTA bawah

| Teks | Field |
|---|---|
| Jadwalkan Live Demo Gratis | `home.banner.label` |
| Siap Membawa Operasional Travel Anda ke Level Berikutnya? | `home.banner.judul` |
| Diskusikan kebutuhan spesifik biro wisata atau travel Umrah Anda bersama tim konsultan Ladoob dan lihat langsung simulasi **Ladoob Core, Compass, Masar, dan Agent App**. | `home.banner.deskripsi` (markdown) |
| Coba Sekarang | `home.labelCta` |
| Terhubung langsung ke WhatsApp Tim Ladoob | `home.banner.catatan` |
| WA: "Halo tim Ladoob, saya ingin coba sekarang dan melihat demo lengkap ekosistem Ladoob." | `home.pesanWa.banner` |

## 9. Footer

| Teks | Field |
|---|---|
| Platform manajemen operasional dan ekosistem aplikasi mobile terpadu untuk biro perjalanan wisata umum dan penyelenggara ibadah Umrah & Haji. | `settings.deskripsiFooter` |
| Website resmi: **ladoob.com** **[ubah]** → `ladoob.my.id` | `settings.websiteResmi` |
| 4 Pilar Ekosistem | `ui.ts` |
| Ladoob Core (Web Dashboard) / Ladoob Compass (Wisata Umum) / Ladoob Masar مسار (Umrah & Haji) / Ladoob Agent (Mitra & Affiliator) | `pilar.labelFooter` |
| Tautan & Kontak | `ui.ts` |
| Manfaat Bisnis & ROI / Paket Harga & Lisensi / Blog & Wawasan Industri / FAQ (Pertanyaan Umum) | `home.tautanFooter[]` |
| halo@ladoob.com **[ubah]** → kosong, baris disembunyikan | `settings.email` |
| +62 812-3456-7890 (WhatsApp Business) **[ubah]** → kosong, baris disembunyikan | dirakit dari `settings.whatsapp` + `ui.ts` "(WhatsApp Business)" |
| © 2026 Ladoob (ladoob.com). Hak Cipta Dilindungi Undang-Undang. **[ubah]** → `Dirancang, dikembangkan oleh Grintec. © {tahun} Ladoob. Hak cipta dilindungi undang-undang.` (atribusi standar Grintec, permintaan pemilik) | `settings.copyright` (tahun otomatis) |
| Beyond Smart Travel — Travel Management Ecosystem **[ubah]** → `Beyond Smart Travel • Travel Management Ecosystem` | `settings.taglineFooter` |

## 10. Tombol WhatsApp melayang

| Teks | Field |
|---|---|
| Coba Sekarang (aria-label "Coba Sekarang via WhatsApp") | `home.labelCta` / `ui.ts` |
| WA: "Halo tim Ladoob, saya ingin coba sekarang platform manajemen travel Ladoob." | `home.pesanWa.melayang` |

## Catatan teknis dari pembacaan mockup

- **Mockup dirender Tailwind 3** (`cdn.tailwindcss.com` = v3.4), situs memakai Tailwind 4. Acuannya **hasil render mockup** (yang dilihat dan disetujui pemilik), bukan nama kelasnya. Aturan port yang dipakai (Fase 1):
  - `shadow-xs`, `shadow-2xs`, `backdrop-blur-xs`: tidak ada di v3, jadi di mockup tidak tampil. Dihapus.
  - `py-4.5` (tombol FAQ): tidak ada di v3, jadi pertanyaan FAQ di mockup menempel ke garis kartu. **Dipertahankan** sebagai pengecualian (target sentuh R-03, jelas maksud desainnya). Akibatnya FAQ +216 px.
  - `shadow-sm` v3 = `shadow-xs` v4: diganti.
  - v3: `sm:text-*` me-reset line-height dan mengalahkan `leading-*`; v4 tidak. Ditambah `sm:leading-*` yang setara (mis. `leading-relaxed sm:leading-6`).
  - v4 menyimpan line-height `text-2xl` sebagai rasio; ukuran arbitrer (`sm:text-[26px]`) diberi `/8` agar 32 px seperti v3.
  - Palet slate/emerald/amber/rose/sky ditimpa ke heksadesimal v3 di `@theme` (palet v4 OKLCH sedikit bergeser).
  - `rounded`, `shadow-md` ke atas, `blur-2xl/3xl`: nilainya sama, tidak diubah.
- Penyimpangan lain yang disengaja: tombol banner `bg-emerald-500` menjadi `bg-emerald-700` (putih 2,5:1 menjadi 5,5:1, Bagian B §11); pill kategori artikel Masar `bg-black/15` (A4); tombol tutup modal `slate-400` menjadi `slate-500` (kontras non-teks 3:1); judul "Dasbor Eksekutif" di ilustrasi hero `h2` menjadi `p` (agar kerangka heading halaman benar); pertanyaan FAQ dibungkus `h3`; area klik "Lihat detail modul", "Baca Artikel", dan link footer diperbesar dengan margin negatif (tampilan tetap).
- `font-heading` di mockup didefinisikan lewat CSS biasa, bukan token Tailwind (`fontFamily.display` tidak dipakai).
- Tombol tab aktif menghapus `border`, jadi lebar tab berubah 2 px saat aktif. Ini perilaku mockup dan tetap ditiru.
- Satu-satunya panah dekoratif (`→`) ada di CTA panel pilar. Tetap, sesuai mockup.
