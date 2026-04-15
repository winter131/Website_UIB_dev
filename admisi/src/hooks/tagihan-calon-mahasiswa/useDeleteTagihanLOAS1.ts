import { deleteTagihanLOAS1 } from "@/service/tagihanCalonMahasiswa.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteTagihanLOAS1(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, tagihanLOAId }: any) =>
      deleteTagihanLOAS1(token, tagihanLOAId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus tagihan LOA"),
  });
}
