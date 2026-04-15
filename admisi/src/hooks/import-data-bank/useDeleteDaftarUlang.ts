import { deleteDaftarUlang } from "@/service/importBankData.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteDaftarUlang(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, daftarUlangId }: any) =>
      deleteDaftarUlang(token, daftarUlangId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus daftar ulang"),
  });
}
