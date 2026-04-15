import { editUniversitas } from "@/service/universitas.service";
import { useMutation } from "@tanstack/react-query";

export function useEditUniversitas(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, universitas }: any) =>
      editUniversitas(token, universitas),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit universitas"),
  });
}
