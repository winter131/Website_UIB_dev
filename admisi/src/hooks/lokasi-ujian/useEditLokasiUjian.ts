import { editLokasiUjian } from "@/service/lokasiUjian.service";
import { editModul } from "@/service/modul.service";
import { useMutation } from "@tanstack/react-query";

export function useEditLokasiUjian(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, lokasiUjian }: any) =>
      editLokasiUjian(token, lokasiUjian),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit lokasi ujian"),
  });
}
