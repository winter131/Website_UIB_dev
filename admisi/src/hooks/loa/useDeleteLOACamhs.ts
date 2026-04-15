import { deleteLOACamhs } from "@/service/loa.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteLOACamhs(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, nomorDaftar }: any) =>
      deleteLOACamhs(token, nomorDaftar),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus LOA"),
  });
}
