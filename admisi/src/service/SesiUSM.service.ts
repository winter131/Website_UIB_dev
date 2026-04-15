import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getSesiUSMData = async (
  token: string,
  filter?: { tanggalAwal: string; tanggalAkhir: string },
) => {
  try {
    const res = await axiosClient.get("/api/sesi-usm/get-sesi-usm", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        tanggalAwal: filter?.tanggalAwal || "",
        tanggalAkhir: filter?.tanggalAkhir || "",
      },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data sesi USM",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data sesi USM",
    });
    return [];
  }
};

export const createSesiUSM = async (token: string, sesiUSM: any) => {
  const res = await axiosClient.put("/api/sesi-usm/create-sesi-usm", sesiUSM, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create sesi USM response:", res);

  return res.data;
};

export const editSesilUSM = async (token: string, sesiUSM: any) => {
  const res = await axiosClient.patch("/api/sesi-usm/edit-sesi-usm", sesiUSM, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit sesi USM response:", res);

  return res.data;
};

export const statusSesiUSM = async (token: string, sesiUsm: any) => {
  const res = await axiosClient.post(`/api/sesi-usm/status-sesi-usm`, sesiUsm, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("status sesi USM response:", res);

  return res.data;
};

export const resetTokenSesiUSM = async (token: string, sesiUSM: any) => {
  const res = await axiosClient.post(
    "/api/sesi-usm/reset-token-sesi-usm",
    sesiUSM,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("reset token sesi USM response:", res);

  return res.data;
};
