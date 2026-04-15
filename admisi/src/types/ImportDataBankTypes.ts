export type ImportDataBankType = {
  UniqueCode: string;
  UserUpload: string;
  UserUploadNama: string;
  TanggalUpload: string;
  TotalData: number;
  JumlahDana: number;
  DetailData: ImportDataBankDetailType[];
};

export type ImportDataBankDetailType = {
  UniqueCode: string;
  NoReferensi: string;
  NomorDaftar: string;
  NamaCamhs: string;
  TanggalTransfer: string;
  TotalDana: number;
  NomorVa: string;
  KeteranganUpload: string;
  UserUpload: string;
  UserUploadNama: string;
  TanggalUpload: string;
  IsTransfer: string;
  TglTransfer: string;
  UserTransfer: string;
};
