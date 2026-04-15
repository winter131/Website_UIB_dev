import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getSekolahData = async (token: string, query: string) => {
  try {
    const res = await axiosClient.get("/api/sekolah/get-sekolah", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { search: query },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data sekolah",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data sekolah",
    });
    return [];
  }
};

export const createSekolah = async (token: string, sekolah: any) => {
  const res = await axiosClient.put("/api/sekolah/create-sekolah", sekolah, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create sekolah response:", res);

  return res.data;
};

export const editSekolah = async (token: string, sekolah: any) => {
  const res = await axiosClient.patch("/api/sekolah/edit-sekolah", sekolah, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit sekolah response:", res);

  return res.data;
};

export const deleteSekolah = async (token: string, sekolahId: string) => {
  const res = await axiosClient.delete(
    `/api/sekolah/delete-sekolah/${sekolahId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete sekolah response:", res);

  return res.data;
};
