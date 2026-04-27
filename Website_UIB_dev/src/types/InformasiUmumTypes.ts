export interface InformasiUmumType {
    id_informasi: number;
    header_gambar: string | null;
    judul_informasi: string;
    is_aktif: string;
    TanggalUpload: string;
    keterangan_info?: string;
    body_informasi?: string;
}