import { importTagihanLOAS1 } from "@/service/tagihanCalonMahasiswa.service";
import { useMutation } from "@tanstack/react-query";

export function useImportTagihanLOAS1(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, tagihanLOA }: any) =>
      importTagihanLOAS1(token, tagihanLOA),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengimpor tagihan LOA S1"),
  });
}
