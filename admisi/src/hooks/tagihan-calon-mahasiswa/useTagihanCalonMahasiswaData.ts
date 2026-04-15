import { getTagihanCalonMahasiswaData } from "@/service/tagihanCalonMahasiswa.service";
import { useQuery } from "@tanstack/react-query";

export const useTagihanCalonMahasiswaData = (
  token: string,
  status: string,
  filter?: { selJenjang?: string; selPeriode?: string },
) =>
  useQuery({
    queryKey: [
      "tagihanCalonMahasiswaData",
      filter?.selJenjang,
      filter?.selPeriode,
    ],
    queryFn: () => getTagihanCalonMahasiswaData(token, filter),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
