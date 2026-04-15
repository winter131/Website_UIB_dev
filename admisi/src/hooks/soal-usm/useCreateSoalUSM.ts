import { createEditSoalUSM } from "@/service/SoalUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateSoalUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, soalUSM }: any) => createEditSoalUSM(token, soalUSM),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan soal USM"),
  });
}
