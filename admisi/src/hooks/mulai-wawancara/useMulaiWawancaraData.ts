import { getMulaiWawancaraData } from "@/service/mulaiWawancara.service";
import { useQuery } from "@tanstack/react-query";

export const useMulaiWawancaraData = (token: string, status: string) =>
  useQuery({
    queryKey: ["mulaiWawancaraData"],
    queryFn: () => getMulaiWawancaraData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
