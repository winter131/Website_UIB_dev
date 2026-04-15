import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const editPerubahanGelombang = async (
  token: string,
  perubahanGelombang: any,
) => {
  console.log("edit perubahan gelombang called with:", {
    token,
    perubahanGelombang,
  });
  const res = await axiosClient.post(
    "/api/calon-mahasiswa/edit-perubahan-gelombang",
    perubahanGelombang,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("edit perubahan gelombang response:", res);

  return res.data;
};
