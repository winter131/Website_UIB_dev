import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const editJalurPendaftaranS2 = async (
  token: string,
  jalurPendaftaranS2: any,
) => {
  const res = await axiosClient.post(
    "/api/jalur-pendaftaran/edit-jalur-pendaftaran-s2",
    jalurPendaftaranS2,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("edit jalur pendaftaran s2 response:", res);

  return res.data;
};
