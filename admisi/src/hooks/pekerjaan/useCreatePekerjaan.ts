import { createPekerjaan } from "@/service/pekerjaan.service";
import { useMutation } from "@tanstack/react-query";

export function useCreatePekerjaan(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, pekerjaan }: any) =>
      createPekerjaan(token, pekerjaan),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan pekerjaan"),
  });
}
