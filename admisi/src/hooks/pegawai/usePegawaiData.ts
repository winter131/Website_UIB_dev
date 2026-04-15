import { getPegawai } from "@/service/pegawai.service";
import { useQuery } from "@tanstack/react-query";

export const usePegawaiData = (token: string, status: string) =>
  useQuery({
    queryKey: ["pegawaiData"],
    queryFn: () => getPegawai(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
