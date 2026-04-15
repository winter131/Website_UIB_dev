import { saveValidasiDokumenRPL } from "@/service/calonMahasiswa.service";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { useMutation } from "@tanstack/react-query";

export function useSaveValidasiDokumenRPL(
  onSuccess?: (data: CalonMahasiswaType) => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, validasi }: any) =>
      saveValidasiDokumenRPL(token, validasi),

    onSuccess: (data, variables) => {
      onSuccess?.(variables);
    },

    onError: (error: any) =>
      onError?.(
        error.response?.data?.message ?? "Gagal melakukan validasi dokumen",
      ),
  });
}
