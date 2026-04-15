import {
  createJenisGelombang,
  editJenisGelombang,
} from "@/service/jenisGelombang.service";
import { useMutation } from "@tanstack/react-query";

export function useEditJenisGelombang(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, jenisGelombang }: any) =>
      editJenisGelombang(token, jenisGelombang),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit jenis gelombang"),
  });
}
