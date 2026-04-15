import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getKewarganegaraanData = async (token: string) => {
  try {
    const res = await axiosClient.get(
      "/api/kewarganegaraan/get-kewarganegaraan",
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
        message: "Gagal mengambil data kewarganegaraan",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data kewarganegaraan",
    });
    return [];
  }
};

export const createKewarganegaraan = async (
  token: string,
  kewarganegaraan: any
) => {
  const res = await axiosClient.put(
    "/api/kewarganegaraan/create-kewarganegaraan",
    kewarganegaraan,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("create kewarganegaraan response:", res);

  return res.data;
};

export const editKewarganegaraan = async (
  token: string,
  kewarganegaraan: any
) => {
  const res = await axiosClient.patch(
    "/api/kewarganegaraan/edit-kewarganegaraan",
    kewarganegaraan,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("edit kewarganegaraan response:", res);

  return res.data;
};

export const deleteKewarganegaraan = async (
  token: string,
  kewarganegaraanId: string
) => {
  const res = await axiosClient.delete(
    `/api/kewarganegaraan/delete-kewarganegaraan/${kewarganegaraanId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete kewarganegaraan response:", res);

  return res.data;
};
