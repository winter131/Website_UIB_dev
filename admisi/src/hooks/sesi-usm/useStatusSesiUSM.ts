import { statusSesiUSM } from "@/service/SesiUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useStatusSesiUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, sesiUSMId }: any) => statusSesiUSM(token, sesiUSMId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengubah status sesi USM"),
  });
}
