import { editKota } from "@/service/kota.service";
import { useMutation } from "@tanstack/react-query";

export function useEditKota(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, kota }: any) => editKota(token, kota),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit kota"),
  });
}
