import { getSekolahData } from "@/service/sekolah.service";
import { useQuery } from "@tanstack/react-query";

export const useSekolahData = (token: string, status: string, query: string) =>
  useQuery({
    queryKey: ["sekolahData", query],
    queryFn: () => getSekolahData(token, query),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
