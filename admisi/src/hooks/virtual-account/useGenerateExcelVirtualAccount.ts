import { generateExcelVirtualAccount } from "@/service/virtualAccount.service";
import { useQuery } from "@tanstack/react-query";

export const useGenerateExcelVirtualAccount = (
  token: string,
  filter: {
    gelombangId: string;
    periodeId: string;
    jenjang: string;
    tujuanFile: string;
  }
) =>
  useQuery({
    queryKey: ["generate-excel-virtual-account", filter],
    queryFn: () => generateExcelVirtualAccount(token, filter),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
