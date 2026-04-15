import { importVirtualAccount } from "@/service/virtualAccount.service";
import { useMutation } from "@tanstack/react-query";

export function useImportVirtualAccount(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, virtualAccount }: any) =>
      importVirtualAccount(token, virtualAccount),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengimpor virtual account"),
  });
}
