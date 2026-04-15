import { deleteInformasiUmum } from "@/service/informasiUmum.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteInformasiUmum(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, informasiId }: any) =>
      deleteInformasiUmum(token, informasiId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus informasi umum"),
  });
}
