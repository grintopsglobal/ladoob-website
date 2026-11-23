// Markdown sebaris untuk teks pendek dari CMS: **tebal** dan *miring*. HTML di-escape dulu.
export const inline = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

/** Teks multi-paragraf (dipisah baris kosong) menjadi daftar HTML paragraf sebaris. */
export const paragraf = (s: string) => s.split(/\n\s*\n/).map((p) => inline(p.trim())).filter(Boolean);
