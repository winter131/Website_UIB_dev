import { editSesilUSM } from "@/service/SesiUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useEditSesiUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, sesiUSM }: any) => editSesilUSM(token, sesiUSM),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit sesi USM"),
  });
}
