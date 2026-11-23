// Bahasa Inggris ditambahkan nanti: tambahkan `en` di languages dan blok ui.en.
export const languages = { id: 'Indonesia' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'id';
export const locales = Object.keys(languages) as Lang[];

export const ui = {
  id: {
    'nav.home': 'Ladoob Beranda',
    'nav.open': 'Buka menu navigasi',
    'nav.close': 'Tutup menu navigasi',
    'pilar.tablist': 'Pilih aplikasi Ladoob',
    'pilar.cta': 'Jadwalkan demo {nama}',
    'visual.contoh': 'Contoh tampilan. Nama dan angka hanya ilustrasi.',
    'blog.read': 'Baca ringkasan',
    'blog.readMore': 'Baca selengkapnya',
    'blog.all': 'Semua artikel',
    'blog.estimate': '{n} menit baca',
    'blog.modalCta': 'Ingin menerapkan sistem ini di travel Anda?',
    'blog.close': 'Tutup artikel',
    'footer.pilar': 'Aplikasi',
    'footer.links': 'Tautan',
    'footer.whatsapp': '(WhatsApp Business)',
    'copy.label': 'Salin Link',
    'copy.done': 'Tersalin!',
    '404.title': 'Halaman tidak ditemukan',
    '404.text': 'Alamat yang Anda buka tidak ada atau sudah dipindahkan.',
    '404.home': 'Kembali ke beranda',
  },
} as const;

export type UIKey = keyof (typeof ui)['id'];
