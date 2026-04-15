import { saveValidasiDokumen } from "@/service/calonMahasiswa.service";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { useMutation } from "@tanstack/react-query";

export function useSaveValidasiDokumen(
  onSuccess?: (data: CalonMahasiswaType) => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, validasi }: any) =>
      saveValidasiDokumen(token, validasi),

    onSuccess: (data, variables) => {
      onSuccess?.(variables);
    },

    onError: (error: any) =>
      onError?.(
        error.response?.data?.message ?? "Gagal melakukan validasi dokumen"
      ),
  });
}
