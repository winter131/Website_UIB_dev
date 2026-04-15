import { deleteGelombangPendaftaran } from "@/service/gelombanPendaftaran.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteGelombangPendaftaran(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, detailGelombangId }: any) =>
      deleteGelombangPendaftaran(token, detailGelombangId),
    onSuccess,
    onError: (error: any) =>
      onError?.(
        error.response?.message ?? "Gagal menghapus gelombang pendaftaran"
      ),
  });
}
