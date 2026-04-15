import { getInformasiUmumData } from "@/service/informasiUmum.service";
import { useQuery } from "@tanstack/react-query";

export const useInformasiUmumData = (token: string, status: string) =>
  useQuery({
    queryKey: ["informasi-umum-data"],
    queryFn: () => getInformasiUmumData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
