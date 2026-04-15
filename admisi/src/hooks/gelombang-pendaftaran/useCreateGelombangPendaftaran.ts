import { createGelombangPendaftaran } from "@/service/gelombanPendaftaran.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateGelombangPendaftaran(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, gelombangPendaftaran }: any) =>
      createGelombangPendaftaran(token, gelombangPendaftaran),
    onSuccess,
    onError: (error: any) =>
      onError?.(
        error.response?.message ?? "Gagal menambahkan gelombang pendaftaran"
      ),
  });
}
