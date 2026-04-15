import { getPesertaData } from "@/service/hapusUjicoba.service";
import { useQuery } from "@tanstack/react-query";

export const usePesertaData = (
  token: string,
  status: string,
  selectedSesi: string
) =>
  useQuery({
    queryKey: ["pesertaData", selectedSesi],
    queryFn: () => getPesertaData(token, selectedSesi),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
