import { createKategoriUSM } from "@/service/kategoriUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateKategoriUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, kategoriUSM }: any) =>
      createKategoriUSM(token, kategoriUSM),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan kategori USM"),
  });
}
