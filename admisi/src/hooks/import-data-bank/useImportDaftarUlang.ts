import { importDaftarUlang } from "@/service/importBankData.service";
import { useMutation } from "@tanstack/react-query";

export function useImportDaftarUlang(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, daftarUlang }: any) =>
      importDaftarUlang(token, daftarUlang),
    onSuccess,
    onError: (error: any) =>
      onError?.(
        error.response?.message ??
          "Gagal mengimpor data daftar ulang. Mohon cek kembali file yang diunggah",
      ),
  });
}
