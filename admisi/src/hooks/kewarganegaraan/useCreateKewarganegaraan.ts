import { createJurusan } from "@/service/jurusan.service";
import { createKewarganegaraan } from "@/service/kewarganegaraan.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateKewarganegaraan(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, kewarganegaraan }: any) =>
      createKewarganegaraan(token, kewarganegaraan),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan kewarganegaraan"),
  });
}
