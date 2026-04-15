import { deleteLokasiUjian } from "@/service/lokasiUjian.service";
import { deleteProvinsi } from "@/service/provinsi.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteProvinsi(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, provinsiId }: any) =>
      deleteProvinsi(token, provinsiId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus provinsi"),
  });
}
