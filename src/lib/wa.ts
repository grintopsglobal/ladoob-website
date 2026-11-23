// wa.me tanpa nomor tetap berfungsi: WhatsApp membuka pilihan kontak dengan pesan terisi.
// Nomor diisi di CMS (Pengaturan Situs); build memberi peringatan selama kosong.
export const waLink = (pesan: string, nomor: string) =>
  `https://wa.me/${nomor.replace(/\D/g, '')}?text=${encodeURIComponent(pesan)}`;
