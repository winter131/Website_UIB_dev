import { editJurusan } from "@/service/jurusan.service";
import { useMutation } from "@tanstack/react-query";

export function useEditJurusan(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, jurusan }: any) => editJurusan(token, jurusan),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit jurusan"),
  });
}
