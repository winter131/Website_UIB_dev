import { createEditTagihanLOAS2 } from "@/service/tagihanCalonMahasiswa.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateTagihanLOAS2(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, tagihanLOAS2 }: any) =>
      createEditTagihanLOAS2(token, tagihanLOAS2),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan tagihan LOA S2"),
  });
}
