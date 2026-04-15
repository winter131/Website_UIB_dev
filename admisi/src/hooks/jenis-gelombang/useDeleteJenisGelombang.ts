import { deleteJenisGelombang } from "@/service/jenisGelombang.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteJenisGelombang(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, jenisGelombangId }: any) =>
      deleteJenisGelombang(token, jenisGelombangId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus jenis gelombang"),
  });
}
