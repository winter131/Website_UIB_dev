import { getKewarganegaraanData } from "@/service/kewarganegaraan.service";
import { useQuery } from "@tanstack/react-query";

export const useKewarganegaraanData = (token: string, status: string) =>
  useQuery({
    queryKey: ["kewarganegaraanData"],
    queryFn: () => getKewarganegaraanData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
