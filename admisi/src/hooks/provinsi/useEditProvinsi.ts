import { editProvinsi } from "@/service/provinsi.service";
import { useMutation } from "@tanstack/react-query";

export function useEditProvinsi(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, provinsi }: any) => editProvinsi(token, provinsi),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit provinsi"),
  });
}
