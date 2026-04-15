import { deleteSoalUSM } from "@/service/SoalUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteSoalUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, soalUSMId }: any) => deleteSoalUSM(token, soalUSMId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus soal USM"),
  });
}
