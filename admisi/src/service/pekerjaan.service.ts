import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getPekerjaanData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/pekerjaan/get-pekerjaan", {
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
        message: "Gagal mengambil data pekerjaan",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data pekerjaan",
    });
    return [];
  }
};

export const createPekerjaan = async (token: string, pekerjaan: any) => {
  const res = await axiosClient.put(
    "/api/pekerjaan/create-pekerjaan",
    pekerjaan,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("create pekerjaan response:", res);

  return res.data;
};

export const editPekerjaan = async (token: string, pekerjaan: any) => {
  const res = await axiosClient.patch(
    "/api/pekerjaan/edit-pekerjaan",
    pekerjaan,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("edit pekerjaan response:", res);

  return res.data;
};

export const deletePekerjaan = async (token: string, pekerjaanId: string) => {
  const res = await axiosClient.delete(
    `/api/pekerjaan/delete-pekerjaan/${pekerjaanId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete pekerjaan response:", res);

  return res.data;
};
