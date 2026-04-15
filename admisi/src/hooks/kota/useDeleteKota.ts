import { deleteKota } from "@/service/kota.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteKota(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, kotaId }: any) => deleteKota(token, kotaId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus kota"),
  });
}
