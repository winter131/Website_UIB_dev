import { getDetailCalonMahasiswa } from "@/service/calonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useDetailCalonMahasiswa = (
  token: string,
  status: string,
  nomorDaftar: string,
  isKepala?: boolean,
) =>
  useQuery({
    queryKey: ["detail-calon-mahasiswa", nomorDaftar],
    queryFn: () => getDetailCalonMahasiswa(token, nomorDaftar, isKepala),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
