import { getKotaData } from "@/service/kota.service";
import { useQuery } from "@tanstack/react-query";

export const useKotaData = (token: string, status: string) =>
  useQuery({
    queryKey: ["kotaData"],
    queryFn: () => getKotaData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
