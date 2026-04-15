import { getKategoriUSMData } from "@/service/kategoriUSM.service";
import { useQuery } from "@tanstack/react-query";

export const useKategoriUSMData = (token: string, status: string) =>
  useQuery({
    queryKey: ["kategoriUSMData"],
    queryFn: () => getKategoriUSMData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
