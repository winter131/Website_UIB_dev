import { editPerubahanGelombang } from "@/service/perubahanGelombang.service";
import { useMutation } from "@tanstack/react-query";

export function useEditPerubahanGelombang(
  onSuccess?: () => void,
  onError?: (msg: string) => void,
) {
  return useMutation({
    mutationFn: ({ token, perubahanGelombang }: any) =>
      editPerubahanGelombang(token, perubahanGelombang),
    onSuccess,
    onError: (error: any) =>
      onError?.(
        error.response?.message ?? "Gagal mengedit perubahan gelombang",
      ),
  });
}
