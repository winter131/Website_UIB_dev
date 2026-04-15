import { createUniversitas } from "@/service/universitas.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateUniversitas(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, universitas }: any) =>
      createUniversitas(token, universitas),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan universitas"),
  });
}
