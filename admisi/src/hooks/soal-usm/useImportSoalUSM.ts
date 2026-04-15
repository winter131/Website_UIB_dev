import { importSoalUSM } from "@/service/SoalUSM.service";
import { useMutation } from "@tanstack/react-query";

export function useImportSoalUSM(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, soalUSM }: any) => importSoalUSM(token, soalUSM),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengimpor soal USM"),
  });
}
