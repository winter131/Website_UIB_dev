import {
  editAktivasiAkun,
  resetPassword,
} from "@/service/aktivasiAkun.service";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword(
  onSuccess?: (data: any) => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, aktivasiAkun }: any) =>
      resetPassword(token, aktivasiAkun),
    onSuccess: (data, variables) => {
      // if (variables?.dataCamhs) {
      //   onSuccess?.(variables.dataCamhs);
      // } else {
      onSuccess?.(data); // fallback ke data dari API
      // }
    },
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mereset password akun"),
  });
}
