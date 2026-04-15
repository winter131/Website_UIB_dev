import { deleteAgama } from "@/service/agama.service";
import { deletePeringkat } from "@/service/peringkat.service";
import { useMutation } from "@tanstack/react-query";

export function useDeletePeringkat(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, peringkatId }: any) =>
      deletePeringkat(token, peringkatId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus peringkat"),
  });
}
