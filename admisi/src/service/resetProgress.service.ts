import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getPesertaData = async (token: string, selectedSesi: string) => {
  try {
    const res = await axiosClient.get("/api/reset-progress/get-list-peserta", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { selectedSesi },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data peserta",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data peserta",
    });
    return [];
  }
};

export const resetUSM = async (token: string, sesi: any) => {
  const res = await axiosClient.post("/api/reset-progress/reset", sesi, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("reset USM response:", res);

  return res.data;
};
