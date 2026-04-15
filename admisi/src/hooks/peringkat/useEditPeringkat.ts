import { editAgama } from "@/service/agama.service";
import { editPeringkat } from "@/service/peringkat.service";
import { useMutation } from "@tanstack/react-query";

export function useEditPeringkat(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, peringkat }: any) => editPeringkat(token, peringkat),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit peringkat"),
  });
}
