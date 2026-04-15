import { deletePekerjaan } from "@/service/pekerjaan.service";
import { useMutation } from "@tanstack/react-query";

export function useDeletePekerjaan(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, pekerjaanId }: any) =>
      deletePekerjaan(token, pekerjaanId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus pekerjaan"),
  });
}
