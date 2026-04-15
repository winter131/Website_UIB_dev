import { editSekolah } from "@/service/sekolah.service";
import { editUniversitas } from "@/service/universitas.service";
import { useMutation } from "@tanstack/react-query";

export function useEditSekolah(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, sekolah }: any) => editSekolah(token, sekolah),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit sekolah"),
  });
}
