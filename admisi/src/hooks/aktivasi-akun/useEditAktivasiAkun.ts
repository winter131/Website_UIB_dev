import { editAktivasiAkun } from "@/service/aktivasiAkun.service";
import { useMutation } from "@tanstack/react-query";

export function useEditAktivasiAkun(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, aktivasiAkun }: any) =>
      editAktivasiAkun(token, aktivasiAkun),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit aktivasi akun"),
  });
}
