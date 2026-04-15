import { createSekolah } from "@/service/sekolah.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateSekolah(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, sekolah }: any) => createSekolah(token, sekolah),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan sekolah"),
  });
}
