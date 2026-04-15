import { editAgama } from "@/service/agama.service";
import { editProvinsi } from "@/service/provinsi.service";
import { useMutation } from "@tanstack/react-query";

export function useEditAgama(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, agama }: any) => editAgama(token, agama),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit agama"),
  });
}
