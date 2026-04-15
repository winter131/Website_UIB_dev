import { getSesiUSMData } from "@/service/SesiUSM.service";
import { useQuery } from "@tanstack/react-query";

export const useSesiUSMData = (
  token: string,
  status: string,
  filter?: { tanggalAwal: string; tanggalAkhir: string },
) =>
  useQuery({
    queryKey: ["sesiUSMData", filter?.tanggalAwal, filter?.tanggalAkhir],
    queryFn: () => getSesiUSMData(token, filter),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
