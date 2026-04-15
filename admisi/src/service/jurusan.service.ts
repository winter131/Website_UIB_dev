import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getJurusanData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/jurusan/get-jurusan", {
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
        message: "Gagal mengambil data jurusan",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data jurusan",
    });
    return [];
  }
};

export const createJurusan = async (token: string, jurusan: any) => {
  const res = await axiosClient.put("/api/jurusan/create-jurusan", jurusan, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create jurusan response:", res);

  return res.data;
};

export const editJurusan = async (token: string, jurusan: any) => {
  const res = await axiosClient.patch("/api/jurusan/edit-jurusan", jurusan, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit jurusan response:", res);

  return res.data;
};

export const deleteJurusan = async (token: string, jurusanId: string) => {
  const res = await axiosClient.delete(
    `/api/jurusan/delete-jurusan/${jurusanId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete jurusan response:", res);

  return res.data;
};
