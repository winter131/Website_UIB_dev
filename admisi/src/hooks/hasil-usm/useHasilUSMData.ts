import { getHasilUSMData } from "@/service/hasilUSM.service";
import { useQuery } from "@tanstack/react-query";

export const useHasilUSMData = (
  token: string,
  status: string,
  filter?: {
    gelombangId: string;
    periodeId: string;
    lokasiUjian: string;
    jenjang: string;
  },
) =>
  useQuery({
    queryKey: ["hasilUSMData", filter],
    queryFn: () => getHasilUSMData(token, filter),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
