# DESIGN.md: Ladoob

Disusun dari jawaban pemilik pada 22 November 2026. Referensi tetap mockup `referensi/mockup/ladoob_beyond_smart_travel_landing_page.html`: urutan section, isi, empat pilar, empat paket harga, palet navy, dan komposisi hero dengan visual produk dipertahankan. Yang diubah adalah perlakuan visual dan copy yang terbaca seperti template AI.

## Identitas

- **Produk:** sistem manajemen travel wisata dan Umrah: Ladoob Core (web, kantor pusat), Compass (wisatawan), Masar مسار (jamaah Umrah dan Haji), Agent (agen, reseller, affiliator).
- **Pembeli:** pemilik biro travel dan penyelenggara Umrah yang membeli lisensi Rp 14,5 juta sampai Rp 85 juta ke atas.
- **Kepribadian:** tenang dan tepercaya, seperti software operasional atau keuangan. Menjelaskan dengan jelas, tidak berteriak.

## Dial

`Dial: ENERGY 1 / RHYTHM 2 / MOTION 2`

- ENERGY 1: ruang putih lega, satu titik fokus per layar, tanpa dekorasi latar.
- RHYTHM 2: kerangka kiri-rata yang konsisten, dengan variasi komposisi pada Fitur (tab vertikal + panel), Manfaat (narasi + kartu 2x2), FAQ (judul kiri, daftar kanan).
- MOTION 2: hover, fokus, transisi accordion dan tab, serta animasi melayang halus pada visual hero (permintaan pemilik 23 November 2026; override R-19, nilai dari mockup, berhenti saat hover dan untuk *reduced motion*). Tanpa animasi lain.

## Warna

| Peran | Token | Alasan |
|---|---|---|
| Dasar | navy `#183654`, navyDark `#0F253B`, slate netral | warna logo, membawa kesan stabil |
| Aksen tunggal | agent `#1E5648` | hanya pada tombol "Jadwalkan Demo" (aksi WhatsApp), titik konversi halaman |
| Penanda produk | compass `#B8332A`, masar `#C27838` / masarText `#9A5A26`, agent `#1E5648`, navy untuk Core | hanya untuk mengenali produk: heksagon penanda, nama kategori, centang fitur di panel produknya |

Warna produk tidak dipakai untuk latar section, angka, atau dekorasi.

## Tipografi

- Heading: Plus Jakarta Sans 700/800 (dipilih pemilik; geometris dan dirancang untuk identitas Jakarta).
- Body: Inter 400/500/600 (pilihan pemilik di mockup; netral dan terbaca baik pada ukuran kecil di tabel harga).
- Tanpa label huruf kapital dengan tracking lebar. Label kecil memakai sentence case.

## Bentuk dan elevasi

- Radius: tombol 8 px, kartu 12 px, bingkai visual produk 16 px.
- Shadow pada visual produk di hero dan saat kartu Manfaat di-hover (penanda interaksi). Elemen lain memakai garis 1 px.

## Keputusan pemilik 23 November 2026

- Tombol header dan tombol melayang: "Coba Sekarang" (override R-15). Tombol harga: "Pilih Ini Sekarang". Tombol lain tetap "Jadwalkan Demo".
- Poin Manfaat memakai kartu berbingkai yang merespons hover, seperti mockup.
- "Grintec" di footer ditautkan ke grintecs.com (tab baru).

## Motif identitas

Heksagon dari logo, dipakai kecil sebagai penanda tiap produk (tab pilar, ilustrasi hero). Satu motif, diulang konsisten.

## Visual produk

Ilustrasi layar aplikasi yang bersih, diberi keterangan "Contoh tampilan". Akan diganti screenshot asli bila tim memotret ulang aplikasi dengan brand Ladoob. Screenshot lama memuat brand klien (ByteTrip, sjg.com), tidak dipakai, dan sudah dihapus dari repo.

## Copy

Ditulis ulang agar spesifik dan natural, makna dan harga tetap. Tanpa label kapital di atas judul, tanpa jargon ("level berikutnya", "terintegrasi", "real-time" sebagai hiasan), tanpa em dash. Daftar perubahan ada di `docs/revisi-copy.md` untuk ditinjau pemilik.
