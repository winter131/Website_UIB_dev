import { getPeringkatData } from "@/service/peringkat.service";
import { useQuery } from "@tanstack/react-query";

export const usePeringkatData = (token: string, status: string) =>
  useQuery({
    queryKey: ["peringkatData"],
    queryFn: () => getPeringkatData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
