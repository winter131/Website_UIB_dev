import { deleteTagihanLOAS2 } from "@/service/tagihanCalonMahasiswa.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteTagihanLOAS2(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({
      token,
      tagihanLOAId,
    }: {
      token: string;
      tagihanLOAId: string;
    }) => deleteTagihanLOAS2(token, tagihanLOAId),
    onSuccess,
    onError: (error: any) =>
      onError?.(
        error.response?.message ?? "Gagal menghapus tagihan LOA Magister",
      ),
  });
}
