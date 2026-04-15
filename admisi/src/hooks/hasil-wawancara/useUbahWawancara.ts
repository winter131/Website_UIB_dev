import { ubahWawancara } from "@/service/hasilWawancara.service";
import { useMutation } from "@tanstack/react-query";

export function useUbahWawancara(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, wawancara }: any) => ubahWawancara(token, wawancara),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengubah hasil wawancara"),
  });
}
