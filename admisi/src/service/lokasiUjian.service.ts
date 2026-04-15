import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getLokasiUjianData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/lokasi-ujian/get-lokasi-ujian", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data lokasi ujian",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data lokasi ujian",
    });
    return [];
  }
};

export const createLokasiUjian = async (token: string, lokasiUjian: any) => {
  const res = await axiosClient.put(
    "/api/lokasi-ujian/create-lokasi-ujian",
    lokasiUjian,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("create lokasi ujian response:", res);

  return res.data;
};

export const editLokasiUjian = async (token: string, lokasiUjian: any) => {
  const res = await axiosClient.patch(
    "/api/lokasi-ujian/edit-lokasi-ujian",
    lokasiUjian,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("edit lokasi ujian response:", res);

  return res.data;
};

export const deleteLokasiUjian = async (
  token: string,
  lokasiUjianId: string
) => {
  const res = await axiosClient.delete(
    `/api/lokasi-ujian/delete-lokasi-ujian/${lokasiUjianId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete lokasi ujian response:", res);

  return res.data;
};
