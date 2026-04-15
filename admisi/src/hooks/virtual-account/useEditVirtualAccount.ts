import { editVirtualAccount } from "@/service/virtualAccount.service";
import { useMutation } from "@tanstack/react-query";

export function useEditVirtualAccount(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, virtualAccount }: any) =>
      editVirtualAccount(token, virtualAccount),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit virtual account"),
  });
}
