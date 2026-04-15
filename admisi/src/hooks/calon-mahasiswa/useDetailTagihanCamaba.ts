import { getDetailTagihanCamaba } from "@/service/calonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useDetailTagihanCamaba = (
  token: string,
  status: string,
  nomorDaftar: string,
) =>
  useQuery({
    queryKey: ["detail-tagihan-camaba", nomorDaftar],
    queryFn: () => getDetailTagihanCamaba(token, nomorDaftar),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
