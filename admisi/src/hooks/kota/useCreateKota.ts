import { createKota } from "@/service/kota.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateKota(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, kota }: any) => createKota(token, kota),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan kota"),
  });
}
