import { editPekerjaan } from "@/service/pekerjaan.service";
import { useMutation } from "@tanstack/react-query";

export function useEditPekerjaan(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, pekerjaan }: any) => editPekerjaan(token, pekerjaan),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit pekerjaan"),
  });
}
