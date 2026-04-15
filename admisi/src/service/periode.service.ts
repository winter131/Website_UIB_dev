import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getPeriodeData = async (token: string) => {
  try {
    const res = await axiosClient.get("/api/periode/get-periode", {
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
        message: "Gagal mengambil data periode",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data periode",
    });
    return [];
  }
};

export const createPeriode = async (token: string, periode: any) => {
  const res = await axiosClient.put("/api/periode/create-periode", periode, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create periode response:", res);

  return res.data;
};

export const editPeriode = async (token: string, periode: any) => {
  const res = await axiosClient.patch("/api/periode/edit-periode", periode, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit periode response:", res);

  return res.data;
};

export const deletePeriode = async (
  token: string,
  periodeId: string,
  status: string,
) => {
  const res = await axiosClient.delete(
    `/api/periode/delete-periode/${periodeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("delete periode response:", res);

  return res.data;
};
