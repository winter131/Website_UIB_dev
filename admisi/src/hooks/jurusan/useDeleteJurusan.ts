import { deleteJurusan } from "@/service/jurusan.service";
import { deleteLokasiUjian } from "@/service/lokasiUjian.service";
import { deleteProvinsi } from "@/service/provinsi.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteJurusan(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, jurusanId }: any) => deleteJurusan(token, jurusanId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus jurusan"),
  });
}
