import { getProvinsiData } from "@/service/provinsi.service";
import { useQuery } from "@tanstack/react-query";

export const useProvinsiData = (token: string, status: string) =>
  useQuery({
    queryKey: ["provinsiData"],
    queryFn: () => getProvinsiData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
