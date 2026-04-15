import { createAgama } from "@/service/agama.service";
import { createPeringkat } from "@/service/peringkat.service";
import { useMutation } from "@tanstack/react-query";

export function useCreatePeringkat(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, peringkat }: any) =>
      createPeringkat(token, peringkat),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan peringkat"),
  });
}
