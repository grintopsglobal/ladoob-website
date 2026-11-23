import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Nama field di sini HARUS sama persis dengan public/admin/config.yml.

// ID entry = path tanpa ekstensi, mis. "id/core". Glob loader default memakai `slug` sebagai ID dan bentrok antar bahasa.
const loader = (dir: string, pattern = '**/*.yml') =>
  glob({ base: `./src/content/${dir}`, pattern, generateId: ({ entry }) => entry.replace(/\.(md|ya?ml)$/, '') });

// Decap menulis "" untuk field kosong, jadi string opsional selalu punya default "".
const str = z.string().nullish().transform((v) => v ?? '');
const list = <T extends z.ZodType>(item: T) => z.array(item).nullish().transform((v) => v ?? []);
const aksen = z.enum(['navy', 'compass', 'masar', 'agent']);
const anchor = z.object({ label: z.string(), anchor: z.enum(['hero', 'fitur', 'manfaat', 'harga', 'blog', 'faq']) });
// ID tracking disisipkan ke script inline, jadi formatnya dikunci ketat (atau kosong).
const trackingId = (re: RegExp, hint: string) =>
  z.string().nullish().transform((v) => (v ?? '').trim())
    .refine((v) => v === '' || re.test(v), { message: `Format tidak valid, contoh: ${hint}` });

const pilar = defineCollection({
  loader: loader('pilar'),
  schema: z.object({
    order: z.number().default(99),
    aksen,
    nama: z.string(),
    namaArab: str,
    peran: z.string(),
    labelFooter: z.string(),
    judul: z.string(),
    subjudul: z.string(),
    fitur: list(z.string()),
    highlightJudul: z.string(),
    highlightDeskripsi: z.string(),
  }),
});

const paket = defineCollection({
  loader: loader('paket'),
  schema: z.object({
    nama: z.string(),
    order: z.number().default(99),
    gaya: z.enum(['biasa', 'sorot', 'gelap']).default('biasa'),
    pita: str,
    deskripsi: z.string(),
    labelHarga: z.string(),
    harga: z.string(),
    labelMaintenance: z.string(),
    maintenance: z.string(),
    catatanMaintenance: str,
    warnaCatatan: z.enum(['hijau', 'navy']).default('hijau'),
    fitur: list(z.string()),
    // Kosong = dirakit dari settings.pesanWa.paket ({nama}, {harga}), jadi ikut berubah bila harga diubah.
    pesanWa: str,
  }),
});

const faq = defineCollection({
  loader: loader('faq'),
  schema: z.object({
    pertanyaan: z.string(),
    jawaban: z.string(),
    order: z.number().default(99),
  }),
});

const blog = defineCollection({
  loader: loader('blog', '**/*.md'),
  schema: z.object({
    judul: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    kategori: z.string(),
    estimasiBaca: z.number().int().positive(),
    ringkasan: z.string(),
    ringkasanModal: z.string(),
    tanggal: z.coerce.date(),
    aksen: aksen.default('navy'),
    gambar: str,
    draft: z.boolean().default(false),
  }),
});

const home = z.object({
  type: z.literal('home'),
  menu: list(anchor),
  labelCta: z.string(),
  // Tombol di header, menu mobile, dan tombol WhatsApp melayang.
  labelCtaHeader: z.string(),
  hero: z.object({
    judul: z.string(),
    paragraf: z.string(),
    ctaKedua: z.string(),
    poin: list(z.string()),
  }),
  fitur: z.object({ judul: z.string(), deskripsi: z.string() }),
  manfaat: z.object({
    judul: z.string(),
    narasi: z.string(),
    judulMetrik: z.string(),
    metrik: list(z.object({ angka: z.string(), keterangan: z.string() })),
    poin: list(z.object({ judul: z.string(), deskripsi: z.string() })),
  }),
  harga: z.object({ judul: z.string(), deskripsi: z.string(), catatan: z.string(), labelCta: z.string() }),
  blog: z.object({ judul: z.string(), deskripsi: z.string() }),
  faq: z.object({ judul: z.string(), deskripsi: z.string() }),
  banner: z.object({ judul: z.string(), deskripsi: z.string(), catatan: z.string() }),
  tautanFooter: list(anchor),
});

const settings = z.object({
  type: z.literal('settings'),
  // Format internasional tanpa + dan spasi, mis. 6281234567890. Kosong = CTA membuka pilihan kontak WhatsApp.
  whatsapp: z.string().nullish().transform((v) => (v ?? '').replace(/\D/g, '')),
  email: z.union([z.string().email(), z.literal('')]).nullish().transform((v) => v ?? ''),
  websiteResmi: z.string(),
  deskripsiFooter: z.string(),
  taglineFooter: z.string(),
  copyright: z.string(),
  seo: z.object({ title: z.string(), description: z.string(), ogImage: str }),
  pesanWa: z.object({
    umum: z.string(),
    melayang: z.string(),
    hero: z.string(),
    banner: z.string(),
    artikel: z.string(),
    pilar: z.string(),
    paket: z.string(),
    footer: z.string(),
  }),
  // Klaim yang tampil di situs tetapi belum terverifikasi. `npm run cek-rilis` gagal selama ada yang belum dicentang.
  klaim: list(z.object({ klaim: z.string(), lokasi: z.string(), terverifikasi: z.boolean().default(false) })),
  tracking: z.object({
    gscVerification: trackingId(/^[A-Za-z0-9_-]{10,100}$/, 'kode dari content="..." Search Console'),
    gtmId: trackingId(/^GTM-[A-Z0-9]{4,12}$/, 'GTM-ABC1234'),
    ga4Id: trackingId(/^G-[A-Z0-9]{4,15}$/, 'G-ABC123XYZ'),
    metaPixelId: trackingId(/^\d{10,20}$/, '1234567890123456'),
    metaTags: list(z.object({ name: z.string().regex(/^[A-Za-z0-9:._-]{1,80}$/), content: z.string().max(300) })),
  }),
});

const pages = defineCollection({
  loader: loader('pages'),
  schema: z.discriminatedUnion('type', [home, settings]),
});

export const collections = { pilar, paket, faq, blog, pages };
