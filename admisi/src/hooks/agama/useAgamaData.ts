import { getAgamaData } from "@/service/agama.service";
import { useQuery } from "@tanstack/react-query";

export const useAgamaData = (token: string, status: string) =>
  useQuery({
    queryKey: ["agamaData"],
    queryFn: () => getAgamaData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
