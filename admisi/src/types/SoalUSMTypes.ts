export type SoalUSMType = {
  soal_id: string;
  kategori_id: string;
  bobot_soal: number;
  FileSoal: string;
  LinkSoal: string;
  pertanyaan_soal: string;
  jawaban_a: string;
  jawaban_b: string;
  jawaban_c: string;
  jawaban_d: string;
  jawaban_benar: string;
  UserUpdate: string;
  LastUpdate: string;
};

export type InserUpdateSoalUSMType = {
  soal_id: string;
  kategori_id: string;
  bobot_soal: string;
  pertanyaan_soal: string;
  jawaban_a: string;
  jawaban_b: string;
  jawaban_c: string;
  jawaban_d: string;
  jawaban_benar: string;
  file_soal: File | null;
  previewImage: string;
};
