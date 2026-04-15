import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getGelombangPendaftaranData = async (token: string) => {
  try {
    const res = await axiosClient.get(
      "/api/gelombang-pendaftaran/get-gelombang-pendaftaran",
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
        message: "Gagal mengambil data gelombang pendaftaran",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data gelombang pendaftaran",
    });
    return [];
  }
};

export const createGelombangPendaftaran = async (
  token: string,
  gelombangPendaftaran: any
) => {
  const res = await axiosClient.put(
    "/api/gelombang-pendaftaran/create-gelombang-pendaftaran",
    gelombangPendaftaran,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("create gelombang pendaftaran response:", res);

  return res.data;
};

export const editGelombangPendaftaran = async (
  token: string,
  gelombangPendaftaran: any
) => {
  const res = await axiosClient.patch(
    "/api/gelombang-pendaftaran/edit-gelombang-pendaftaran",
    gelombangPendaftaran,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("edit gelombang pendaftaran response:", res);

  return res.data;
};

export const deleteGelombangPendaftaran = async (
  token: string,
  detailGelombangId: string
) => {
  const res = await axiosClient.delete(
    `/api/gelombang-pendaftaran/delete-gelombang-pendaftaran/${detailGelombangId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete gelombang pendaftaran response:", res);

  return res.data;
};
