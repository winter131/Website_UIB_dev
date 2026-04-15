import { createLokasiUjian } from "@/service/lokasiUjian.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateLokasiUjian(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, lokasiUjian }: any) =>
      createLokasiUjian(token, lokasiUjian),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan lokasi ujian"),
  });
}
