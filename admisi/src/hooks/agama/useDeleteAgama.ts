import { deleteAgama } from "@/service/agama.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteAgama(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, agamaId }: any) => deleteAgama(token, agamaId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus agama"),
  });
}
