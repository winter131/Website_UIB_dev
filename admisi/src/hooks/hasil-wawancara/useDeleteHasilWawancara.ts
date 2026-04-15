import { deleteHasilWawancara } from "@/service/hasilWawancara.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteHasilWawancara(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, hasilWawancaraId }: any) =>
      deleteHasilWawancara(token, hasilWawancaraId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus hasil wawancara"),
  });
}
