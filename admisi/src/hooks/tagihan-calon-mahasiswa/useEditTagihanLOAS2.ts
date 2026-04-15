import { editTagihanLOAS2 } from "@/service/tagihanCalonMahasiswa.service";
import { useMutation } from "@tanstack/react-query";

export function useEditTagihanLOAS2(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({
      token,
      tagihanLOAS2,
    }: {
      token: string;
      tagihanLOAS2: any;
    }) => editTagihanLOAS2(token, tagihanLOAS2),
    onSuccess,
    onError: (error: any) =>
      onError?.(
        error.response?.message ?? "Gagal mengedit tagihan LOA Magister",
      ),
  });
}
