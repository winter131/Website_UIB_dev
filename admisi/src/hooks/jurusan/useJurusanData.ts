import { getJurusanData } from "@/service/jurusan.service";
import { useQuery } from "@tanstack/react-query";

export const useJurusanData = (token: string, status: string) =>
  useQuery({
    queryKey: ["jurusanData"],
    queryFn: () => getJurusanData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
