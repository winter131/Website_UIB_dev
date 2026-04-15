import { getHasilWawancaraDetail } from "@/service/mulaiWawancara.service";
import { useQuery } from "@tanstack/react-query";

export const useHasilWawancaraDetail = (
  token: string,
  status: string,
  nomorDaftar: string,
) =>
  useQuery({
    queryKey: ["hasilWawancaraDetail", nomorDaftar],
    queryFn: () => getHasilWawancaraDetail(token, nomorDaftar),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
