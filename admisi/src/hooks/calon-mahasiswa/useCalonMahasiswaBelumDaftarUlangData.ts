import { getCalonMahasiswaBelumDaftarUlang } from "@/service/calonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useCalonMahasiswaBelumDaftarUlangData = (
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
    queryKey: ["calon-mahasiswa-belum-daftar-ulang-data", filter, isKepala],
    queryFn: () => getCalonMahasiswaBelumDaftarUlang(token, filter, isKepala),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
