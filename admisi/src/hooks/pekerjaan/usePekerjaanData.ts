import { getPekerjaanData } from "@/service/pekerjaan.service";
import { useQuery } from "@tanstack/react-query";

export const usePekerjaanData = (token: string, status: string) =>
  useQuery({
    queryKey: ["pekerjaanData"],
    queryFn: () => getPekerjaanData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
