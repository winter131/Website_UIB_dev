import { getCalonMahasiswaRequestPindahProdi } from "@/service/calonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useCalonMahasiswaRequestPindahProdiData = (
  token: string,
  status: string,
  filter: {
    gelombangId?: string;
    periodeId?: string;
    jenjang?: string;
    lokasiUjian?: string;
    jalur?: string;
  },
  isKepala?: boolean,
) =>
  useQuery({
    queryKey: ["calon-mahasiswa-request-pindah-prodi-data", filter, isKepala],
    queryFn: () => getCalonMahasiswaRequestPindahProdi(token, filter, isKepala),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
