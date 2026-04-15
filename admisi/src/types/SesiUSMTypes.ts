export type SesiUSMType = {
  SesiId: number;
  NamaUjian: string;
  KategoriusmId: number;
  NamaKategori: string;
  TanggalMulai: string;
  JumlahSoal: number;
  DurasiUjian: number;
  UrutanSoal: string;
  ToleransiTerlambat: number;
  TokenUjian: string;
  StatusAktif: string;
  IsUjicoba: string;
};

export type SesiUSMAlternateType = {
  sesi_id: number;
  nama_ujian: string;
  kategori_id: number;
  NamaKategori: string;
  tanggal_mulai: string;
  jumlah_soal: number;
  durasi_ujian: number;
  pengacakan_soal: string;
  toleransi_terlambat: number;
  TokenUjian: string;
  StatusAktif: string;
  is_ujicoba: string;
};

export type SesiUSMFormType = {
  sesi_id: string;
  nama_ujian: string;
  kategori_id: string;
  tanggal_mulai: string;
  jam_mulai: string;
  jumlah_soal: string;
  durasi_ujian: string;
  pengacakan_soal: string;
  toleransi_terlambat: string;
  is_ujicoba: string;
};
