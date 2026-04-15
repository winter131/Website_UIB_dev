import { createEditTagihanLOAS1 } from "@/service/tagihanCalonMahasiswa.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateTagihanLOAS1(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, tagihanLOAS1 }: any) =>
      createEditTagihanLOAS1(token, tagihanLOAS1),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan tagihan LOA S1"),
  });
}
