import { deletePeriode } from "@/service/periode.service";
import { useMutation } from "@tanstack/react-query";

export function useDeletePeriode(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, periodeId, status }: any) =>
      deletePeriode(token, periodeId, status),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus periode"),
  });
}
