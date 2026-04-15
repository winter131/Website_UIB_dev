import {
  getDetailCalonMahasiswa,
  getDetailCalonMahasiswaRPL,
} from "@/service/calonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useDetailCalonMahasiswaRPL = (
  token: string,
  status: string,
  nomorDaftar: string,
  isKepala?: boolean,
) =>
  useQuery({
    queryKey: ["detail-calon-mahasiswa-rpl", nomorDaftar],
    queryFn: () => getDetailCalonMahasiswaRPL(token, nomorDaftar, isKepala),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
