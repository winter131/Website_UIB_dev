import {
  saveValidasiKeuangan,
  saveValidasiKeuanganRPL,
} from "@/service/calonMahasiswa.service";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { useMutation } from "@tanstack/react-query";

export function useSaveValidasiKeuanganRPL(
  onSuccess?: (data: CalonMahasiswaType) => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, validasi }: any) =>
      saveValidasiKeuanganRPL(token, validasi),

    onSuccess: (data, variables) => {
      // if (variables?.dataCamhs) {
      //   onSuccess?.(variables.dataCamhs);
      // } else {
      onSuccess?.(variables); // fallback ke data dari API
      // }
    },

    onError: (error: any) =>
      onError?.(
        error.response?.data?.message ?? "Gagal melakukan validasi keuangan",
      ),
  });
}
