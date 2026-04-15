import { createSesiUSM } from "@/service/SesiUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateSesiUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, sesiUSM }: any) => createSesiUSM(token, sesiUSM),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan sesi USM"),
  });
}
