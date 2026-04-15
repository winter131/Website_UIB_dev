import { deleteSekolah } from "@/service/sekolah.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteSekolah(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, sekolahId }: any) => deleteSekolah(token, sekolahId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus sekolah"),
  });
}
