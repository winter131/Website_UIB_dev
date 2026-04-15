import { deleteLokasiUjian } from "@/service/lokasiUjian.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteLokasiUjian(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, lokasiUjianId }: any) =>
      deleteLokasiUjian(token, lokasiUjianId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus lokasi ujian"),
  });
}
