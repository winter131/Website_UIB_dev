import { createPeriode } from "@/service/periode.service";
import { useMutation } from "@tanstack/react-query";

export function useCreatePeriode(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, periode }: any) => createPeriode(token, periode),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan periode"),
  });
}
