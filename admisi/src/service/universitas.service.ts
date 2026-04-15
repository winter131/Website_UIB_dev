import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getUniversitasData = async (token: string, query: string) => {
  try {
    const res = await axiosClient.get("/api/universitas/get-universitas", {
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
        message: "Gagal mengambil data universitas",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data universitas",
    });
    return [];
  }
};

export const createUniversitas = async (token: string, universitas: any) => {
  const res = await axiosClient.put(
    "/api/universitas/create-universitas",
    universitas,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("create universitas response:", res);

  return res.data;
};

export const editUniversitas = async (token: string, universitas: any) => {
  const res = await axiosClient.patch(
    "/api/universitas/edit-universitas",
    universitas,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("edit universitas response:", res);

  return res.data;
};

export const deleteUniversitas = async (
  token: string,
  universitasId: string
) => {
  const res = await axiosClient.delete(
    `/api/universitas/delete-universitas/${universitasId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete provinsi response:", res);

  return res.data;
};
