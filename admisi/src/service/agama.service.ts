import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getAgamaData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/agama/get-agama", {
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
        message: "Gagal mengambil data agama",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data agama",
    });
    return [];
  }
};

export const createAgama = async (token: string, agama: any) => {
  const res = await axiosClient.put("/api/agama/create-agama", agama, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create agama response:", res);

  return res.data;
};

export const editAgama = async (token: string, agama: any) => {
  const res = await axiosClient.patch("/api/agama/edit-agama", agama, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit agama response:", res);

  return res.data;
};

export const deleteAgama = async (token: string, agamaId: string) => {
  const res = await axiosClient.delete(`/api/agama/delete-agama/${agamaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("delete agama response:", res);

  return res.data;
};
