import { importTagihanLOAS2 } from "@/service/tagihanCalonMahasiswa.service";
import { useMutation } from "@tanstack/react-query";

export function useImportTagihanLOAS2(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, tagihanLOA }: any) =>
      importTagihanLOAS2(token, tagihanLOA),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengimpor tagihan LOA S2"),
  });
}
