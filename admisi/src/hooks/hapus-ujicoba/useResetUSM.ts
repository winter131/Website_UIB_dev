import { resetUSM } from "@/service/hapusUjicoba.service";
import { useMutation } from "@tanstack/react-query";

export function useResetUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, sesi }: any) => resetUSM(token, sesi),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mereset peserta ujicoba USM"),
  });
}
