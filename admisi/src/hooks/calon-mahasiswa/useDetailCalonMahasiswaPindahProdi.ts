import { getDetailCalonMahasiswaPindahProdi } from "@/service/calonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useDetailCalonMahasiswaPindahProdi = (
  token: string,
  status: string,
  nomorDaftar: string,
  isKepala?: boolean,
) =>
  useQuery({
    queryKey: ["detail-calon-mahasiswa", nomorDaftar],
    queryFn: () =>
      getDetailCalonMahasiswaPindahProdi(token, nomorDaftar, isKepala),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
