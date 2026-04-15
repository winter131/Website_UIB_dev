import { deleteKewarganegaraan } from "@/service/kewarganegaraan.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteKewarganegaraan(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, kewarganegaraanId }: any) =>
      deleteKewarganegaraan(token, kewarganegaraanId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus kewarganegaraan"),
  });
}
