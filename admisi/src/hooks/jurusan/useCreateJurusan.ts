import { createJurusan } from "@/service/jurusan.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateJurusan(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, jurusan }: any) => createJurusan(token, jurusan),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan jurusan"),
  });
}
