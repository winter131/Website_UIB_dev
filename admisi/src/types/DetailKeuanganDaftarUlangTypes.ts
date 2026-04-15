import { CalonMahasiswaType } from "./CalonMahasiswaTypes";

export type DetailKeuanganDaftarUlangType = {
  camhs_data: CalonMahasiswaType;
  data_pembayaran: DetailKeuanganDaftarUlangDataPembayaranType[];
  data_tagihan: DetailKeuanganDaftarUlangDataTagihanType;
  list_bukti_bayar: DetailKeuanganDaftarUlangListBuktiBayarType[];
};

export type DetailKeuanganDaftarUlangDataPembayaranType = {
  NoReferensi: string;
  KodeUnik: string;
  NomorDaftar: string;
  TanggalTransfer: string;
  NomorVa: string;
  KeteranganPembayaran: string;
  JumlahDana: number;
  TanggalUpload: string;
  UserUpload: string;
  NamaUserUpload: string;
};

export type DetailKeuanganDaftarUlangDataTagihanType = {
  PeringkaDicapai: string;
  // S1
  BiayaSpp: number;
  BiayaPpl: number;
  BiayaBpp: number;
  BiayaSks: number;
  BiayaToeic: number;
  BiayaPraktikum: number;
  PotonganSpp: number;
  PotonganBpp: number;
  PotonganSks: number;
  PotonganPraktikum: number;

  // S2
  BiayaSemester1: number;
  BiayaSemester2: number;
  BiayaSemester3: number;
  BiayaMatrikulasi: number;
};

export type DetailKeuanganDaftarUlangListBuktiBayarType = {
  BuktiBayarFile: string;
  BuktiBayarLink: string;
  PemilikRekening: string;
  AsalBank: string;
  TanggalUpload: string;
  IsValid: string;
  TotalDana: number;
};
