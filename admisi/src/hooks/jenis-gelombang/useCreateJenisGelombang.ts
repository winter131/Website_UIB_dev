import { createJenisGelombang } from "@/service/jenisGelombang.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateJenisGelombang(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, jenisGelombang }: any) =>
      createJenisGelombang(token, jenisGelombang),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan jenis gelombang"),
  });
}
