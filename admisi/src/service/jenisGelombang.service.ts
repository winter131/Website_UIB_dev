import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getJenisGelombangData = async (token: string) => {
  try {
    const res = await axiosClient.get(
      "/api/jenis-gelombang/get-jenis-gelombang",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data jenis gelombang",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data jenis gelombang",
    });
    return [];
  }
};

export const createJenisGelombang = async (
  token: string,
  jenisGelombang: any
) => {
  const res = await axiosClient.put(
    "/api/jenis-gelombang/create-jenis-gelombang",
    jenisGelombang,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("create jenis gelombang response:", res);

  return res.data;
};

export const editJenisGelombang = async (
  token: string,
  jenisGelombang: any
) => {
  const res = await axiosClient.patch(
    "/api/jenis-gelombang/edit-jenis-gelombang",
    jenisGelombang,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("edit jenis gelombang response:", res);

  return res.data;
};

export const deleteJenisGelombang = async (
  token: string,
  jenisGelombangId: string
) => {
  const res = await axiosClient.delete(
    `/api/jenis-gelombang/delete-jenis-gelombang/${jenisGelombangId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete lokasi ujian response:", res);

  return res.data;
};
