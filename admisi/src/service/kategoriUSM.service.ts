import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getKategoriUSMData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/kategori-usm/get-kategori-usm", {
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
        message: "Gagal mengambil data kategori USM",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data kategori USM",
    });
    return [];
  }
};

export const createKategoriUSM = async (token: string, kategoriUSM: any) => {
  const res = await axiosClient.put(
    "/api/kategori-usm/create-kategori-usm",
    kategoriUSM,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("create kategori USM response:", res);

  return res.data;
};

export const editKategoriUSM = async (token: string, kategoriUSM: any) => {
  const res = await axiosClient.patch(
    "/api/kategori-usm/edit-kategori-usm",
    kategoriUSM,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("edit kategori USM response:", res);

  return res.data;
};

export const deleteKategoriUSM = async (
  token: string,
  kategoriUSMId: string,
) => {
  const res = await axiosClient.delete(
    `/api/kategori-usm/delete-kategori-usm/${kategoriUSMId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("delete kategori USM response:", res);

  return res.data;
};
