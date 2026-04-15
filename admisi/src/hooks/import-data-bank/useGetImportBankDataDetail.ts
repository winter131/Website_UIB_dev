import { getImportBankDataDetail } from "@/service/importBankData.service";
import { useQuery } from "@tanstack/react-query";

export const useGetImportBankDataDetail = (token: string, id: string) =>
  useQuery({
    queryKey: ["importBankDataDetail", token, id],
    queryFn: () => getImportBankDataDetail(token, id),
    enabled: !!token && !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
