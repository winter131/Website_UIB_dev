import { getPeriodeData } from "@/service/periode.service";
import { useQuery } from "@tanstack/react-query";

export const usePeriodeData = (token: string, status: string) =>
  useQuery({
    queryKey: ["periodeData"],
    queryFn: () => getPeriodeData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
