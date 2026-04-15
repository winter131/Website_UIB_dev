import { getDetailKeuanganDaftarUlang } from "@/service/calonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useDetailKeuanganDaftarUlang = (
  token: string,
  status: string,
  nomorDaftar: string,
) =>
  useQuery({
    queryKey: ["detail-keuangan-daftar-ulang", nomorDaftar],
    queryFn: () => getDetailKeuanganDaftarUlang(token, nomorDaftar),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
