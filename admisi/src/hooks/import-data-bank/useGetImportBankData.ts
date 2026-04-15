import { getImportBankData } from "@/service/importBankData.service";
import { useQuery } from "@tanstack/react-query";

export const useGetImportBankData = (
  token: string,
  status: string,
  filter?: { selBulan: string; selTahun: string },
) =>
  useQuery({
    queryKey: ["importBankData", filter?.selBulan, filter?.selTahun],
    queryFn: () => getImportBankData(token, filter),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
