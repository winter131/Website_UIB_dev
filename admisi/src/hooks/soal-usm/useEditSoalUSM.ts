import { editSoalUSM } from "@/service/SoalUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useEditSoalUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, soalUSM }: any) => editSoalUSM(token, soalUSM),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit soal USM"),
  });
}
