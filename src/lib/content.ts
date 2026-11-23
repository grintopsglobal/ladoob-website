import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { locales, type Lang } from '../i18n/ui';

type Urut = 'pilar' | 'paket' | 'faq';

export async function byLang<C extends Urut>(collection: C, lang: Lang) {
  const items = (await getCollection(collection, (e) => e.id.startsWith(`${lang}/`))) as CollectionEntry<C>[];
  return items.sort((a, b) => a.data.order - b.data.order);
}

/** Artikel terbit, terbaru dulu. */
export async function blogByLang(lang: Lang) {
  const items = await getCollection('blog', (e) => e.id.startsWith(`${lang}/`) && !e.data.draft);
  return items.sort((a, b) => b.data.tanggal.getTime() - a.data.tanggal.getTime());
}

type PageData = CollectionEntry<'pages'>['data'];

export async function getPage<T extends PageData['type']>(lang: Lang, type: T) {
  const entry = await getEntry('pages', `${lang}/${type}`);
  if (!entry || entry.data.type !== type) throw new Error(`Konten halaman "${lang}/${type}" tidak ditemukan.`);
  return entry.data as Extract<PageData, { type: T }>;
}

let sudahDicek = false;

/**
 * Pengaturan situs. Sekali per build: peringatan bila nomor WhatsApp kosong atau ada klaim belum terverifikasi.
 * `npm run cek-rilis` (CEK_RILIS=1) mengubah peringatan itu menjadi error sehingga build gagal.
 */
export async function getSettings(lang: Lang) {
  const s = await getPage(lang, 'settings');
  if (!sudahDicek) {
    sudahDicek = true;
    const masalah = [
      ...(s.whatsapp ? [] : ['Nomor WhatsApp masih kosong (Pengaturan Situs > WhatsApp).']),
      ...(s.whatsapp === '6281234567890' ? ['Nomor WhatsApp masih nomor contoh dari mockup.'] : []),
      ...s.klaim.filter((k) => !k.terverifikasi).map((k) => `Klaim belum terverifikasi: ${k.klaim} (${k.lokasi})`),
    ];
    if (masalah.length) {
      const pesan = `\n[Ladoob] Syarat rilis belum terpenuhi:\n  - ${masalah.join('\n  - ')}\n`;
      if (process.env.CEK_RILIS) throw new Error(pesan);
      console.warn(pesan);
    }
  }
  return s;
}

/** Kunci pasangan terjemahan = nama file tanpa bahasa, mis. "core". Slug boleh beda per bahasa. */
export const keyOf = (entry: { id: string }) => entry.id.replace(/^[a-z]{2}\//, '');

/** Path padanan artikel di tiap bahasa (hreflang). Terjemahan belum ada: arahkan ke listing blog bahasa itu. */
export async function blogAlternates(key: string) {
  const all = await getCollection('blog', (e) => !e.data.draft);
  return Object.fromEntries(
    locales.map((lang) => {
      const e = all.find((x) => x.id === `${lang}/${key}`);
      return [lang, e ? `/blog/${e.data.slug}/` : '/blog/'];
    }),
  ) as Record<Lang, string>;
}

/** "{nama}" dan sejenisnya diganti dari objek nilai. */
export const isi = (template: string, nilai: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (m, k) => nilai[k] ?? m);
