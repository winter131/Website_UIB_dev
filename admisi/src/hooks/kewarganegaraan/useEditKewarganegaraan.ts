import { editKewarganegaraan } from "@/service/kewarganegaraan.service";
import { useMutation } from "@tanstack/react-query";

export function useEditKewarganegaraan(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, kewarganegaraan }: any) =>
      editKewarganegaraan(token, kewarganegaraan),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit kewarganegaraan"),
  });
}
