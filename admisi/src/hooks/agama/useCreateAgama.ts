import { createAgama } from "@/service/agama.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateAgama(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, agama }: any) => createAgama(token, agama),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan agama"),
  });
}
