import { editGelombangPendaftaran } from "@/service/gelombanPendaftaran.service";
import { useMutation } from "@tanstack/react-query";

export function useEditGelombangPendaftaran(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, gelombangPendaftaran }: any) =>
      editGelombangPendaftaran(token, gelombangPendaftaran),
    onSuccess,
    onError: (error: any) =>
      onError?.(
        error.response?.message ?? "Gagal mengedit gelombang pendaftaran"
      ),
  });
}
