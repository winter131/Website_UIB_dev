import { getGelombangPendaftaranData } from "@/service/gelombanPendaftaran.service";
import { useQuery } from "@tanstack/react-query";

export const useGelombangPendaftaranData = (token: string, status: string) =>
  useQuery({
    queryKey: ["gelombangPendaftaranData"],
    queryFn: () => getGelombangPendaftaranData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
