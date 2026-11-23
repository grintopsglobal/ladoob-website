// Warna produk hanya untuk mengenali produk (DESIGN.md): penanda heksagon, nama/kategori, centang fitur, latar sorotan.
// Kelas ditulis lengkap agar terdeteksi Tailwind. Teks Masar memakai masarText (A4); #C27838 hanya untuk penanda.
export type Aksen = 'navy' | 'compass' | 'masar' | 'agent';

export const A = {
  navy: { hex: '#183654', text: 'text-ladoob-navy', tint: 'bg-ladoob-navy/[0.05]' },
  compass: { hex: '#B8332A', text: 'text-ladoob-compass', tint: 'bg-ladoob-compassLight' },
  masar: { hex: '#C27838', text: 'text-ladoob-masarText', tint: 'bg-ladoob-masarLight' },
  agent: { hex: '#1E5648', text: 'text-ladoob-agent', tint: 'bg-ladoob-agentLight' },
} satisfies Record<Aksen, Record<string, string>>;
