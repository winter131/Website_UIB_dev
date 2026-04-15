import { CalonMahasiswaType } from "./CalonMahasiswaTypes";

export type HasilUSMType = {
  NomorDaftar: string;
  NamaMaba: string;
  WaktuMulai: string;
  WaktuSelesai: string;
  CanReset: string;
};

export type HasilUjianSaringanMasukType = CalonMahasiswaType & {
  DetailUsm: DetailHasilUjianSaringanMasukType[] | null;
};

export type DetailHasilUjianSaringanMasukType = {
  SesiUsm: string;
  NilaiCamhs: number;
  StatusMengikuti: "y" | "n";
};
