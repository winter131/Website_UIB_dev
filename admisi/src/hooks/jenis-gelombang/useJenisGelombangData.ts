import { getJenisGelombangData } from "@/service/jenisGelombang.service";
import { useQuery } from "@tanstack/react-query";

export const useJenisGelombangData = (token: string, status: string) =>
  useQuery({
    queryKey: ["jenisGelombangData"],
    queryFn: () => getJenisGelombangData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
