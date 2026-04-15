import { getCalonMahasiswaRPL } from "@/service/calonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useCalonMahasiswaRPLData = (
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
    queryKey: ["calon-mahasiswa-rpl-data", filter, isKepala],
    queryFn: () => getCalonMahasiswaRPL(token, filter, isKepala),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
