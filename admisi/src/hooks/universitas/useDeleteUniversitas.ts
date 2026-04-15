import { deleteUniversitas } from "@/service/universitas.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteUniversitas(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, universitasId }: any) =>
      deleteUniversitas(token, universitasId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus universitas"),
  });
}
