import { getAktivasiAkunData } from "@/service/aktivasiAkun.service";
import { useQuery } from "@tanstack/react-query";

export const useAktivasiAkunData = (
  token: string,
  status: string,
  filter: { freeSearch: string; statusAkun: string },
) =>
  useQuery({
    queryKey: ["aktivasiAkunData", filter],
    queryFn: () => getAktivasiAkunData(token, filter),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
