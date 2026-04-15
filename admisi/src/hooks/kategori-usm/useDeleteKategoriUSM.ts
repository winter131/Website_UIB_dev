import { deleteKategoriUSM } from "@/service/kategoriUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteKategoriUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, kategoriUSMId }: any) =>
      deleteKategoriUSM(token, kategoriUSMId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus kategori Soal USM"),
  });
}
