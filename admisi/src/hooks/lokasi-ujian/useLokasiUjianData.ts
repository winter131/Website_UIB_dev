import { getLokasiUjianData } from "@/service/lokasiUjian.service";
import { useQuery } from "@tanstack/react-query";

export const useLokasiUjianData = (token: string, status: string) =>
  useQuery({
    queryKey: ["lokasiUjianData"],
    queryFn: () => getLokasiUjianData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
