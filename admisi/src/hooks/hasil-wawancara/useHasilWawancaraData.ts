import { getHasilWawancaraData } from "@/service/hasilWawancara.service";
import { useQuery } from "@tanstack/react-query";

export const useHasilWawancaraData = (
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
    queryKey: ["hasilWawancaraData", filter],
    queryFn: () => getHasilWawancaraData(token, filter),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
