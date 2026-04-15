import { validateLoaCamhs } from "@/service/calonMahasiswa.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ValidateLoaMutationParam {
  token: string;
  data: { sel_camhs: string };
}

export const useValidateLoaCamhs = (
  onSuccess?: (data: any) => void,
  onError?: (msg: string) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, data }: ValidateLoaMutationParam) =>
      validateLoaCamhs(token, data),
    onSuccess: (data: any) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: ["detail-tagihan-camaba"],
      });
    },
    onError: (error: any) => {
      onError?.(
        error.response?.data?.message ?? "Gagal melakukan validasi LOA",
      );
    },
  });
};
