import { editJalurPendaftaranS2 } from "@/service/jalurPendaftaran.service";
import { useMutation } from "@tanstack/react-query";

export function useEditJalurPendaftaranS2(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, jalurPendaftaranS2 }: any) =>
      editJalurPendaftaranS2(token, jalurPendaftaranS2),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit jalur pendaftaran"),
  });
}
