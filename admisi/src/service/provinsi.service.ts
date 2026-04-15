import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getProvinsiData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/provinsi/get-provinsi", {
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
        message: "Gagal mengambil data provinsi",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data provinsi",
    });
    return [];
  }
};

export const createProvinsi = async (token: string, provinsi: any) => {
  const res = await axiosClient.put("/api/provinsi/create-provinsi", provinsi, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create provinsi response:", res);

  return res.data;
};

export const editProvinsi = async (token: string, provinsi: any) => {
  const res = await axiosClient.patch("/api/provinsi/edit-provinsi", provinsi, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit provinsi response:", res);

  return res.data;
};

export const deleteProvinsi = async (token: string, provinsiId: string) => {
  const res = await axiosClient.delete(
    `/api/provinsi/delete-provinsi/${provinsiId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete provinsi response:", res);

  return res.data;
};
