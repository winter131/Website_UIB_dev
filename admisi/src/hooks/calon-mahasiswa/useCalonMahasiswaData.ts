import { getCalonMahasiswa } from "@/service/calonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useCalonMahasiswaData = (
  token: string,
  status: string,
  filter: {
    gelombangId?: string;
    periodeId?: string;
    jenjang?: string;
    lokasiUjian?: string;
    jalur?: string;
    justDaftarUlang?: string;
    justDiterima?: string;
    isLoa?: string;
  },
  isKepala?: boolean,
) =>
  useQuery({
    queryKey: ["calon-mahasiswa-data", filter, isKepala],
    queryFn: () => getCalonMahasiswa(token, filter, isKepala),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
