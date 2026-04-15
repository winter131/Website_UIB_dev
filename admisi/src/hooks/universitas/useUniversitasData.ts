import { getUniversitasData } from "@/service/universitas.service";
import { useQuery } from "@tanstack/react-query";

export const useUniversitasData = (
  token: string,
  status: string,
  query: string
) =>
  useQuery({
    queryKey: ["universitasData"],
    queryFn: () => getUniversitasData(token, query),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
