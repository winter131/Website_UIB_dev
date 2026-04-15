import { editInformasiUmum } from "@/service/informasiUmum.service";
import { useMutation } from "@tanstack/react-query";

export function useEditInformasiUmum(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, informasiUmum }: any) =>
      editInformasiUmum(token, informasiUmum),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengubah informasi umum"),
  });
}
