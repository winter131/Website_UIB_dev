import { Book, Calendar, School, SunMoon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SelectSearch from "./SelectSearch";
import { ucFirst } from "@/utils/UcFirst";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function WawancaraInformasiCalonMahasiswa({
  data,
  tahunLulusan,
  setTahunLulusan,
  jenjang,
  readOnly = false,
}: {
  data: any;
  tahunLulusan: string;
  setTahunLulusan: (value: string) => void;
  jenjang: string;
  readOnly?: boolean;
}) {
  // Pilihan select tahun lulusan
  const tahunStart = 1980;
  const tahunEnd = new Date().getFullYear();
  const tahunOptions = Array.from(
    { length: tahunEnd - tahunStart + 1 },
    (_, i) => ({
      value: String(tahunEnd - i),
      label: String(tahunEnd - i),
    }),
  );
  const [isLoadingTahunLulusanOptions, setIsLoadingTahunLulusanOptions] =
    useState(false);
  const [searchTahunLulusanQuery, setSearchTahunLulusanQuery] = useState("");
  const [debouncedSearchTahunLulusanQuery] = useDebounce(
    searchTahunLulusanQuery,
    500,
  );
  const [tahunLulusanOptions, setTahunLulusanOptions] = useState<
    { value: string; label: string }[]
  >([...tahunOptions]);

  // Filter tahun lulusan
  useEffect(() => {
    if (!data) return;

    setIsLoadingTahunLulusanOptions(true);
    const search = debouncedSearchTahunLulusanQuery.toLowerCase();

    const filtered = (tahunOptions || []).filter((per: any) =>
      per.label.toLowerCase().includes(search),
    );

    setTahunLulusanOptions(
      filtered.map((per: any) => ({
        value: String(per.value),
        label: `${per.label}`,
      })),
    );
    setIsLoadingTahunLulusanOptions(false);
  }, [debouncedSearchTahunLulusanQuery]);
  return (
    <Card className="border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
            <i className="bx bx-user text-xl"></i>
          </div>
          <div>
            <CardTitle className="text-lg">Informasi Calon Mahasiswa</CardTitle>
            <CardDescription className="text-xs">
              Informasi calon mahasiswa yang akan diwawancara.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Asal Sekolah/Universitas */}
          <div className="space-y-2">
            <Label
              htmlFor="sekolah"
              className="text-xs font-bold uppercase tracking-wide text-black"
            >
              <School className="w-4" />
              {jenjang === "S1" ? "Asal Sekolah" : "Asal Universitas"}
            </Label>
            <Input
              readOnly
              id="sekolah"
              placeholder={`Masukkan nama ${jenjang === "S1" ? "sekolah" : "universitas"}...`}
              defaultValue={data?.camhs_data?.AsalSekolah}
              className="bg-slate-50 dark:bg-zinc-900 border-none focus-visible:ring-1 focus-visible:ring-slate-300"
            />
          </div>

          {/* Tahun Lulusan */}
          <div className="space-y-2">
            <Label
              htmlFor="tahunLulus"
              className="text-xs font-bold uppercase tracking-wide text-black"
            >
              <Calendar className="w-4" />
              Tahun Lulusan <span className="text-red-500">*</span>
            </Label>
            {readOnly ? (
              <Input
                readOnly
                id="tahunLulus"
                value={tahunLulusan}
                className="bg-slate-50 dark:bg-zinc-900 border-none focus-visible:ring-1 focus-visible:ring-slate-300"
              />
            ) : (
              <SelectSearch
                data={tahunLulusanOptions}
                value={tahunLulusan}
                setValue={(value) => setTahunLulusan(value)}
                fieldName="Tahun Lulusan"
                defaultEmptyValue={{
                  value: "",
                  label: "Pilih tahun lulusan...",
                }}
                placeholder="Pilih tahun lulusan..."
                isLoading={isLoadingTahunLulusanOptions}
                searchQuery={searchTahunLulusanQuery}
                setSearchQuery={setSearchTahunLulusanQuery}
                className="bg-slate-50 dark:bg-zinc-900 border-none focus-visible:ring-1 focus-visible:ring-slate-300"
              />
            )}
          </div>

          {/* Program Studi */}
          <div className="space-y-2">
            <Label
              htmlFor="programStudi"
              className="text-xs font-bold uppercase tracking-wide text-black"
            >
              <Book className="w-4" />
              Program Studi
            </Label>
            <Input
              readOnly
              id="programStudi"
              placeholder="Masukkan program studi..."
              defaultValue={data?.camhs_data?.NamaProdi}
              className="bg-slate-50 dark:bg-zinc-900 border-none focus-visible:ring-1 focus-visible:ring-slate-300"
            />
          </div>

          {/* Waktu Kuliah */}
          <div className="space-y-2">
            <Label
              htmlFor="waktuKuliah"
              className="text-xs font-bold uppercase tracking-wide text-black"
            >
              <SunMoon className="w-4" />
              Waktu Kuliah
            </Label>
            <Input
              readOnly
              id="waktuKuliah"
              placeholder="Contoh: Pagi"
              defaultValue={
                data?.camhs_data?.WaktuKuliah &&
                ucFirst(data?.camhs_data?.WaktuKuliah)
              }
              className="bg-slate-50 dark:bg-zinc-900 border-none focus-visible:ring-1 focus-visible:ring-slate-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
