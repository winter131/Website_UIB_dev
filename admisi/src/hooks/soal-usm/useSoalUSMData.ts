import { getSoalUSMData } from "@/service/SoalUSM.service";
import { useQuery } from "@tanstack/react-query";

export const useSoalUSMData = (
  token: string,
  status: string,
  filter?: { kategori: string },
) =>
  useQuery({
    queryKey: ["soalUSMData", filter?.kategori],
    queryFn: () => getSoalUSMData(token, filter),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
