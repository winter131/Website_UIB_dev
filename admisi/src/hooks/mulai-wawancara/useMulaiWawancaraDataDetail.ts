import { getMulaiWawancaraDataDetail } from "@/service/mulaiWawancara.service";
import { useQuery } from "@tanstack/react-query";

export const useMulaiWawancaraDataDetail = (
  token: string,
  status: string,
  nomorDaftar: string,
) =>
  useQuery({
    queryKey: ["mulaiWawancaraDataDetail", nomorDaftar],
    queryFn: () => getMulaiWawancaraDataDetail(token, nomorDaftar),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
