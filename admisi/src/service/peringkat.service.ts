import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getPeringkatData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/peringkat/get-peringkat", {
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
        message: "Gagal mengambil data peringkat",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data peringkat",
    });
    return [];
  }
};

export const createPeringkat = async (token: string, peringkat: any) => {
  const res = await axiosClient.put(
    "/api/peringkat/create-peringkat",
    peringkat,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("create peringkat response:", res);

  return res.data;
};

export const editPeringkat = async (token: string, peringkat: any) => {
  const res = await axiosClient.patch(
    "/api/peringkat/edit-peringkat",
    peringkat,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("edit peringkat response:", res);

  return res.data;
};

export const deletePeringkat = async (token: string, peringkatId: string) => {
  const res = await axiosClient.delete(
    `/api/peringkat/delete-peringkat/${peringkatId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("delete peringkat response:", res);

  return res.data;
};
