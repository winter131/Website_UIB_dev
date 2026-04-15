import { simpanWawancara } from "@/service/mulaiWawancara.service";
import { useMutation } from "@tanstack/react-query";

export function useSimpanWawancara(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, wawancara }: any) =>
      simpanWawancara(token, wawancara),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menyimpan hasil wawancara"),
  });
}
