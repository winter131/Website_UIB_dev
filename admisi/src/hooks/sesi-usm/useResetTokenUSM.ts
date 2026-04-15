import { resetTokenSesiUSM } from "@/service/SesiUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useResetTokenUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, sesiUSM }: any) => resetTokenSesiUSM(token, sesiUSM),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mereset token sesi USM"),
  });
}
