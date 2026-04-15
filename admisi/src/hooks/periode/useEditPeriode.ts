import { createPeriode, editPeriode } from "@/service/periode.service";
import { useMutation } from "@tanstack/react-query";

export function useEditPeriode(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, periode }: any) => editPeriode(token, periode),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit periode"),
  });
}
