import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getKotaData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/kota/get-kota", {
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
        message: "Gagal mengambil data kota",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data kota",
    });
    return [];
  }
};

export const createKota = async (token: string, kota: any) => {
  const res = await axiosClient.put("/api/kota/create-kota", kota, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create kota response:", res);

  return res.data;
};

export const editKota = async (token: string, kota: any) => {
  const res = await axiosClient.patch("/api/kota/edit-kota", kota, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit kota response:", res);

  return res.data;
};

export const deleteKota = async (token: string, kotaId: string) => {
  const res = await axiosClient.delete(`/api/kota/delete-kota/${kotaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("delete kota response:", res);

  return res.data;
};
