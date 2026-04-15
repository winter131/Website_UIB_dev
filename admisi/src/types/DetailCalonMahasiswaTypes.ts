import { CalonMahasiswaType } from "./CalonMahasiswaTypes";

export type DetailCalonMahasiswaType = {
  camhs_data: CalonMahasiswaType;
  can_validate_dokumen: string;
  can_validate_keuangan: string;
  dokumen_beasiswa: DokumenBeasiswaType | null;
  dokumen_s1: DokumenS1Type | null;
  dokumen_s2: DokumenS2Type | null;
  transfer_data: DokumenTransferType | null;
};

export type DokumenBeasiswaType = {
  NomorDaftar: string;
  Raport1Link: string;
  Raport2Link: string;
  Raport3Link: string;
  Raport4Link: string;
  SuratKeteranganTidakMampuLink: string;
  FotoRumahLink: string;
  TagihanListrikLink: string;
  TagihanAirLink: string;
};

export type DokumenS1Type = {
  NomorDaftar: string;
  PasPhotoLink: string;
  KtpLink: string;
  KkLink: string;
};
export type DokumenS2Type = {
  NomorDaftar: string;
  PasPhotoLink: string;
  AktaLahirLink: string;
  KtpLink: string;
  KkLink: string;
  TranskripNilaiLink: string;
  IjazahLink: string;
};

export type DokumenTransferType = {
  NomorDaftar: string;
  universitas: string;
  AsalUniversitas: string;
  prodi_asal: string;
  jenjang_pendidikan: string;
  ipk: string;
  TranskripNilai: string;
  DokPersetujuanTransfer: string;
  IjazahJenjang: string;
};
