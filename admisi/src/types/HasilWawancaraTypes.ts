import { CalonMahasiswaType } from "./CalonMahasiswaTypes";

export type HasilWawancaraType = CalonMahasiswaType & {
  WawancaraData: DetailHasilWawancaraType | null;
};

export type DetailHasilWawancaraType = {
  TahunLulusan: string;
  WaktuKuliah: string;
  PrestasiDicapai: string;
  CatatanPewawancara: string;
  PerilakuCamhs: string;
  KeperluanKerja: string;
  SumberInformasi: string;
  NipPewawancara: string;
  NamaPewawancara: string;
  RekomendasiBeasiswaId: number;
  RekomendasiBeasiswaText: string;
  RekomendasiPeringkatId: number;
  RekomendasiPeringkatText: string;
  RekomendasiPenerimaan: string;
  TambahanPsikotest: string;
  motivasi_camhs: string;
  pengetahuan_dasar: string;
  kemampuan_tim: string;
  kesiapan_mental: string;
};
