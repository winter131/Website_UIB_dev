import { editKategoriUSM } from "@/service/kategoriUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useEditKategoriUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, kategoriUSM }: any) =>
      editKategoriUSM(token, kategoriUSM),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit kategori soal USM"),
  });
}
