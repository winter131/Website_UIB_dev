import { editTagihanLOAS1 } from "@/service/tagihanCalonMahasiswa.service";
import { useMutation } from "@tanstack/react-query";

export function useEditTagihanLOAS1(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, tagihanLOAS1 }: any) =>
      editTagihanLOAS1(token, tagihanLOAS1),
    onSuccess,
    onError: (error: any) =>
      onError?.(
        error.response?.data?.message ?? "Gagal mengedit tagihan LOA S1",
      ),
  });
}
