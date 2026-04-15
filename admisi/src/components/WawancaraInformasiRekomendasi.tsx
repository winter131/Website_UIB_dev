import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { FormIsiWawancaraType } from "@/types/MulaiWawancaraTypes";
import SelectSearch from "./SelectSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { BeasiswaType } from "@/types/BeasiswaTypes";
import { PeringkatType } from "@/types/PeringkatTypes";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function WawancaraInformasiRekomendasi({
  data,
  formData,
  setFormData,
  simpanWawancara,
  isSubmitting,
  readOnly = false,
}: {
  data: any;
  formData: FormIsiWawancaraType;
  setFormData: (value: any, key: string) => void;
  simpanWawancara: () => void;
  isSubmitting: boolean;
  readOnly?: boolean;
}) {
  // Pilihan select Beasiswa
  const [isLoadingBeasiswaOptions, setIsLoadingBeasiswaOptions] =
    useState(false);
  const [searchBeasiswaQuery, setSearchBeasiswaQuery] = useState("");
  const [debouncedSearchBeasiswaQuery] = useDebounce(searchBeasiswaQuery, 500);
  const [beasiswaOptions, setBeasiswaOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Pilihan select peringkat
  const [isLoadingPeringkatOptions, setIsLoadingPeringkatOptions] =
    useState(false);
  const [searchPeringkatQuery, setSearchPeringkatQuery] = useState("");
  const [debouncedSearchPeringkatQuery] = useDebounce(
    searchPeringkatQuery,
    500,
  );
  const [peringkatOptions, setPeringkatOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Filter beasiswa
  useEffect(() => {
    if (!data) return;

    setIsLoadingBeasiswaOptions(true);
    const search = debouncedSearchBeasiswaQuery.toLowerCase();

    const filtered = (data.all_beasiswa || []).filter((per: BeasiswaType) =>
      per.beasiswa_nama.toLowerCase().includes(search),
    );

    setBeasiswaOptions(
      filtered.map((per: BeasiswaType) => ({
        value: per.beasiswa_id,
        label: `${per.beasiswa_nama}`,
      })),
    );
    setIsLoadingBeasiswaOptions(false);
  }, [data, debouncedSearchBeasiswaQuery]);

  // Filter peringkat
  useEffect(() => {
    if (!data) return;

    setIsLoadingPeringkatOptions(true);
    const search = debouncedSearchPeringkatQuery.toLowerCase();

    const filtered = (data.all_peringkat || []).filter((per: PeringkatType) =>
      per.nama_peringkat.toLowerCase().includes(search),
    );

    setPeringkatOptions(
      filtered.map((per: PeringkatType) => ({
        value: String(per.id_peringkat),
        label: `${per.nama_peringkat}`,
      })),
    );
    setIsLoadingPeringkatOptions(false);
  }, [data, debouncedSearchPeringkatQuery]);
  return (
    <Card className="bg-white border-slate-100 dark:border-zinc-800 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
            <i className="bx bx-award text-xl"></i>
          </div>
          <CardTitle className="text-lg">Rekomendasi</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rekomendasi Beasiswa */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wide text-black">
            Rekomendasi Beasiswa <span className="text-red-500">*</span>
          </Label>
          <SelectSearch
            data={beasiswaOptions || []}
            fieldName="Beasiswa"
            placeholder="Pilih rekomendasi beasiswa..."
            defaultEmptyValue={{
              value: "",
              label: "Pilih rekomendasi beasiswa...",
            }}
            value={formData.rekomendasiBeasiswa || ""}
            setValue={(data) => setFormData(data, "rekomendasiBeasiswa")}
            isLoading={isLoadingBeasiswaOptions}
            searchQuery={searchBeasiswaQuery}
            setSearchQuery={setSearchBeasiswaQuery}
          />
        </div>

        {/* Rekomendasi Peringkat */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wide text-black">
            Rekomendasi Peringkat <span className="text-red-500">*</span>
          </Label>
          <SelectSearch
            data={peringkatOptions || []}
            fieldName="Peringkat"
            placeholder="Pilih rekomendasi peringkat..."
            defaultEmptyValue={{
              value: "",
              label: "Pilih rekomendasi peringkat...",
            }}
            value={formData.rekomendasiPeringkat || ""}
            setValue={(data) => setFormData(data, "rekomendasiPeringkat")}
            isLoading={isLoadingPeringkatOptions}
            searchQuery={searchPeringkatQuery}
            setSearchQuery={setSearchPeringkatQuery}
          />
        </div>

        {/* Rekomendasi Penerimaan */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wide text-black">
            Rekomendasi Penerimaan <span className="text-red-500">*</span>
          </Label>
          <Select
            required
            value={formData.rekomendasiDiterima}
            onValueChange={(value) => setFormData(value, "rekomendasiDiterima")}
          >
            <SelectTrigger className="bg-white dark:bg-zinc-800 border-none shadow-sm w-full">
              <SelectValue placeholder="Pilih rekomendasi..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Terima">Terima</SelectItem>
              <SelectItem value="Tolak">Tolak</SelectItem>
              <SelectItem value="Ragu-ragu">Ragu-ragu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alasan ragu-ragu */}
        {formData.rekomendasiDiterima === "Ragu-ragu" && (
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wide text-black">
              Alasan ragu-ragu <span className="text-red-500">*</span>
            </Label>
            <Textarea
              required
              placeholder="Masukkan alasan ragu-ragu..."
              value={formData.alasanRaguRagu}
              onChange={(e) => setFormData(e.target.value, "alasanRaguRagu")}
              className="w-full bg-white dark:bg-zinc-800 border-none shadow-sm"
            />
          </div>
        )}

        {!readOnly && (
          <div className="pt-6 space-y-3">
            <Button
              disabled={isSubmitting}
              onClick={() => simpanWawancara()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-normal h-8 rounded-md flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <>
                  <i className="bx bx-loader-alt text-lg animate-spin"></i>
                  Menyimpan...
                </>
              ) : (
                <>
                  <i className="bx bx-save text-lg"></i>
                  Simpan Hasil Wawancara
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full border-slate-200 dark:border-zinc-800 hover:bg-red-50 hover:text-red-600 hover:border-red-200 h-8 rounded-md transition-all"
            >
              Batalkan
            </Button>
          </div>
        )}

        <div className="pt-4 px-1">
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-start gap-3">
            <i className="bx bx-info-circle text-slate-400 mt-0.5"></i>
            <p className="text-[10px] text-black dark:text-zinc-400 leading-relaxed font-medium">
              Pastikan informasi yang diinput sudah sesuai dengan hasil
              wawancara tatap muka. Data yang tersimpan akan digunakan sebagai
              basis keputusan penerimaan.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
