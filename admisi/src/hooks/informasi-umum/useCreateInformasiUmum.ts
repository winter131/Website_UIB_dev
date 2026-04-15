import { createInformasiUmum } from "@/service/informasiUmum.service";
import { createProvinsi } from "@/service/provinsi.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateInformasiUmum(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, informasiUmum }: any) =>
      createInformasiUmum(token, informasiUmum),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan informasi umum"),
  });
}
