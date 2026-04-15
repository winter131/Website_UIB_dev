import { createProvinsi } from "@/service/provinsi.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateProvinsi(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, provinsi }: any) => createProvinsi(token, provinsi),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan provinsi"),
  });
}
