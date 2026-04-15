import {
  Book,
  Brain,
  Calendar,
  Cross,
  Lightbulb,
  Notebook,
  School,
  Smile,
  SunMoon,
  UserStar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { FormIsiWawancaraType } from "@/types/MulaiWawancaraTypes";
import { Button } from "./ui/button";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";

export default function WawancaraInformasiWawancara({
  data,
  formData,
  setFormData,
  readOnly = false,
}: {
  data: any;
  formData: FormIsiWawancaraType;
  setFormData: (value: any, key: string) => void;
  readOnly?: boolean;
}) {
  const isCamhsFK = data?.camhs_data?.ProdiId === 81;
  const dataTesKesehatan = data?.data_test_kesehatan || null;

  console.log("formData", formData);
  return (
    <Card className="border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
            <i className="bx bx-user-voice text-xl"></i>
          </div>
          <div>
            <CardTitle className="text-lg">Informasi Wawancara</CardTitle>
            <CardDescription className="text-xs">
              Isi semua parameter penilaian di bawah ini.
            </CardDescription>
          </div>
        </div>
        {isCamhsFK && dataTesKesehatan && (
          <Dialog>
            <DialogTrigger asChild>
              <button className="btn rounded-md btn-sm bg-red-600 text-white border-none shadow-none hover:bg-red-700">
                <Cross className="w-4 h-4" /> Lihat Hasil Tes Kesehatan
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-base">
                  Hasil Tes Kesehatan
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Detail hasil tes kesehatan calon mahasiswa FK.
                </DialogDescription>
              </DialogHeader>
              <hr />
              {dataTesKesehatan?.IsFilled === "y" ? (
                <div className="space-y-4 text-sm">
                  {/* Data rows */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tanggal Tes</span>
                      <span className="font-medium">
                        {dataTesKesehatan.tanggal_test &&
                          IndonesianDateFormat(dataTesKesehatan.tanggal_test)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lokasi</span>
                      <span className="font-medium">
                        {dataTesKesehatan.lokasi_test}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Waktu</span>
                      <span className="font-medium">
                        {dataTesKesehatan.jam_mulai_test &&
                          dataTesKesehatan.jam_mulai_test.slice(0, 5)}{" "}
                        -{" "}
                        {dataTesKesehatan.jam_selesai_test &&
                          dataTesKesehatan.jam_selesai_test.slice(0, 5)}
                      </span>
                    </div>
                    <hr className="border-slate-100 dark:border-zinc-800" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Status Kesehatan</span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          dataTesKesehatan.status_kesehatan === "Sehat"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {dataTesKesehatan.status_kesehatan}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Hasil Buta Warna</span>
                      <span className="font-medium">
                        {dataTesKesehatan.hasil_buta_warna}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Hasil Narkoba</span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          dataTesKesehatan.hasil_narkoba === "Negatif"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {dataTesKesehatan.hasil_narkoba}
                      </span>
                    </div>
                  </div>

                  {/* Riwayat Penyakit */}
                  <div className="space-y-1.5">
                    <span className="text-slate-500 text-xs font-semibold">
                      Riwayat Penyakit
                    </span>
                    <p className="p-3 bg-slate-50 dark:bg-zinc-900 rounded-md text-slate-600 dark:text-zinc-400 whitespace-pre-wrap text-[13px] leading-relaxed">
                      {dataTesKesehatan.riwayat_penyakit ||
                        "Tidak ada riwayat penyakit"}
                    </p>
                  </div>

                  {/* Pemeriksa */}
                  <div className="flex justify-between text-xs text-slate-400 pt-1 border-t border-slate-100 dark:border-zinc-800">
                    <span>Pemeriksa: {dataTesKesehatan.NamaUserHasil}</span>
                    <span>{dataTesKesehatan.TglHasil}</span>
                  </div>

                  {/* Document Button */}
                  {dataTesKesehatan.DokumenPsikotes && (
                    <Button
                      onClick={() =>
                        window.open(dataTesKesehatan.DokumenPsikotes, "_blank")
                      }
                      className="w-full bg-[#2A3955] hover:bg-[#2A3955]/80 text-white font-normal h-9 rounded-md"
                    >
                      <i className="bx bx-file text-base mr-1"></i>
                      Lihat Dokumen Psikotes
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-10 mb-10">
                  <div className="p-6 bg-slate-200 dark:bg-zinc-900 rounded-full">
                    <Notebook className="w-20 h-20 text-slate-500" />
                  </div>
                  <span className="text-slate-500 text-md font-medium mt-4">
                    Tes kesehatan sudah dijadwalkan namun belum diisi
                  </span>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {isCamhsFK ? (
          <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-zinc-900">
            {/* Hasil Wawancara Psikotest */}
            <div className="space-y-2">
              <Label
                htmlFor="hasilWawancaraPsikotest"
                className="text-xs font-bold uppercase tracking-wide text-black flex items-center gap-2"
              >
                <Smile className="text-red-500 w-4 h-4" /> Hasil Wawancara
                Psikotest <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="hasilWawancaraPsikotest"
                placeholder="Tuliskan hasil wawancara psikotest..."
                className="min-h-[100px] bg-slate-50 dark:bg-zinc-900 border-none resize-none"
                value={formData.hasilWawancaraPsikotest}
                onChange={(e) =>
                  setFormData(e.target.value, "hasilWawancaraPsikotest")
                }
              />
            </div>
            {/* Parameter Etika & Komunikasi */}
            <div className="space-y-2">
              <Label
                htmlFor="parameterEtikaKomunikasi"
                className="text-xs font-bold uppercase tracking-wide text-black flex items-center gap-2"
              >
                <i className="bx bx-user-voice text-amber-500 text-sm"></i>{" "}
                Parameter Etika & Komunikasi
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="parameterEtikaKomunikasi"
                placeholder="Tuliskan parameter etika & komunikasi..."
                className="min-h-[100px] bg-slate-50 dark:bg-zinc-900 border-none resize-none"
                value={formData.parameterEtikaKomunikasi}
                onChange={(e) =>
                  setFormData(e.target.value, "parameterEtikaKomunikasi")
                }
              />
            </div>

            {/* Parameter Kemampuan Analisa */}
            <div className="space-y-2">
              <Label
                htmlFor="parameterKemampuanAnalisa"
                className="text-xs font-bold uppercase tracking-wide text-black flex items-center gap-2"
              >
                <Brain className="text-blue-500 w-4 h-4" />
                Parameter Kemampuan Analisa
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="parameterKemampuanAnalisa"
                placeholder="Tuliskan parameter kemampuan analisa..."
                className="min-h-[100px] bg-slate-50 dark:bg-zinc-900 border-none resize-none"
                value={formData.parameterKemampuanAnalisa}
                onChange={(e) =>
                  setFormData(e.target.value, "parameterKemampuanAnalisa")
                }
              />
            </div>

            {/* Parameter Problem Solving */}
            <div className="space-y-2">
              <Label
                htmlFor="parameterProblemSolving"
                className="text-xs font-bold uppercase tracking-wide text-black flex items-center gap-2"
              >
                <Lightbulb className="text-amber-500 w-4 h-4" /> Parameter
                Problem Solving <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="parameterProblemSolving"
                placeholder="Tuliskan parameter problem solving..."
                className="min-h-[100px] bg-slate-50 dark:bg-zinc-900 border-none resize-none"
                value={formData.parameterProblemSolving}
                onChange={(e) =>
                  setFormData(e.target.value, "parameterProblemSolving")
                }
              />
            </div>

            {/* Parameter Profesionalisme */}
            <div className="space-y-2">
              <Label
                htmlFor="parameterProfesionalisme"
                className="text-xs font-bold uppercase tracking-wide text-black flex items-center gap-2"
              >
                <UserStar className="text-green-500 w-4 h-4" /> Parameter
                Profesionalisme <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="parameterProfesionalisme"
                placeholder="Tuliskan parameter profesionalisme..."
                className="min-h-[100px] bg-slate-50 dark:bg-zinc-900 border-none resize-none"
                value={formData.parameterProfesionalisme}
                onChange={(e) =>
                  setFormData(e.target.value, "parameterProfesionalisme")
                }
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-zinc-900">
            {/* Prestasi */}
            <div className="space-y-2">
              <Label
                htmlFor="prestasi"
                className="text-xs font-bold uppercase tracking-wide text-black flex items-center gap-2"
              >
                <i className="bx bx-trophy text-amber-500 text-sm"></i> Prestasi{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="prestasi"
                placeholder="Tuliskan prestasi yang pernah dicapai..."
                className="min-h-[100px] bg-slate-50 dark:bg-zinc-900 border-none resize-none"
                value={formData.prestasi}
                onChange={(e) => setFormData(e.target.value, "prestasi")}
              />
            </div>

            {/* Catatan (Latar Belakang Orang Tua & Motivasi) */}
            <div className="space-y-2">
              <Label
                htmlFor="latarBelakang"
                className="text-xs font-bold uppercase tracking-wide text-black flex items-center gap-2"
              >
                <i className="bx bx-info-circle text-blue-500 text-sm"></i>{" "}
                Catatan (Latar Belakang Orang Tua & Motivasi){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="latarBelakang"
                placeholder="Tuliskan catatan latar belakang dan motivasi..."
                className="min-h-[100px] bg-slate-50 dark:bg-zinc-900 border-none resize-none"
                value={formData.catatanLatarBelakang}
                onChange={(e) =>
                  setFormData(e.target.value, "catatanLatarBelakang")
                }
              />
            </div>

            {/* Catatan Parameter Perilaku */}
            <div className="space-y-2">
              <Label
                htmlFor="perilaku"
                className="text-xs font-bold uppercase tracking-wide text-black flex items-center gap-2"
              >
                <i className="bx bx-face text-purple-500 text-sm"></i> Catatan
                Parameter Perilaku <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="perilaku"
                placeholder="Tuliskan evaluasi pengamatan perilaku..."
                className="min-h-[100px] bg-slate-50 dark:bg-zinc-900 border-none resize-none"
                value={formData.catatanPerilaku}
                onChange={(e) => setFormData(e.target.value, "catatanPerilaku")}
              />
            </div>

            {/* Keperluan Kerja */}
            <div className="space-y-2">
              <Label
                htmlFor="keperluanKerja"
                className="text-xs font-bold uppercase tracking-wide text-black flex items-center gap-2"
              >
                <i className="bx bx-briefcase text-emerald-500 text-sm"></i>{" "}
                Keperluan Kerja <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="keperluanKerja"
                placeholder="Tuliskan keperluan kerja calon mahasiswa jika ada..."
                className="min-h-[100px] bg-slate-50 dark:bg-zinc-900 border-none resize-none"
                value={formData.keperluanKerja}
                onChange={(e) => setFormData(e.target.value, "keperluanKerja")}
              />
            </div>
          </div>
        )}

        {!isCamhsFK && (
          <>
            <div className="pt-4 border-t border-slate-50 dark:border-zinc-900">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wide text-black">
                  Darimana calon mahasiswa tahu tentang UIB?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.sumberInformasi}
                  onValueChange={(value) =>
                    setFormData(value, "sumberInformasi")
                  }
                >
                  <SelectTrigger className="bg-slate-50 dark:bg-zinc-900 border-none w-full">
                    <SelectValue placeholder="Pilih sumber informasi..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Keluarga">Keluarga</SelectItem>
                    <SelectItem value="Saudara">Saudara</SelectItem>
                    <SelectItem value="Teman">Teman</SelectItem>
                    <SelectItem value="Sekolah">Sekolah</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Media Sosial">Media Sosial</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {formData.sumberInformasi === "Lainnya" && (
              <div className="border-slate-50 dark:border-zinc-900">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wide text-black">
                    Sumber Lainnya <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    required
                    id="sumberInformasiLainnya"
                    placeholder="Tuliskan sumber informasi lainnya..."
                    className="bg-slate-50 dark:bg-zinc-900 border-none w-full"
                    value={formData.sumberInformasiLainnya}
                    onChange={(e) =>
                      setFormData(e.target.value, "sumberInformasiLainnya")
                    }
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-50 dark:border-zinc-900">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wide text-black">
                  Pemberi Rekomendasi <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.pemberiRekomendasi}
                  onValueChange={(value) =>
                    setFormData(value, "pemberiRekomendasi")
                  }
                >
                  <SelectTrigger className="bg-slate-50 dark:bg-zinc-900 border-none w-full">
                    <SelectValue placeholder="Pilih pemberi rekomendasi..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tidak ada yang memberi rekomendasi">
                      Tidak ada yang memberi rekomendasi
                    </SelectItem>
                    <SelectItem value="Guru BK">Guru BK</SelectItem>
                    <SelectItem value="Yayasan">Yayasan</SelectItem>
                    <SelectItem value="Pemerintah">Pemerintah</SelectItem>
                    <SelectItem value="Sekolah">Sekolah</SelectItem>
                    <SelectItem value="Rektorat">Rektorat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {formData.pemberiRekomendasi === "Guru BK" && (
              <div className="border-slate-50 dark:border-zinc-900">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wide text-black">
                    Nama Guru BK <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="namaGuruBK"
                    required
                    placeholder="Tuliskan nama guru BK..."
                    className="bg-slate-50 dark:bg-zinc-900 border-none w-full"
                    value={formData.namaGuruBK}
                    onChange={(e) => setFormData(e.target.value, "namaGuruBK")}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
