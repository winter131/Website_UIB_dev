import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const editVirtualAccount = async (
  token: string,
  virtualAccountData: any
) => {
  const res = await axiosClient.post(
    "/api/virtual-account/edit-virtual-account",
    virtualAccountData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("update virtual account response:", res);

  return res.data;
};

export const importVirtualAccount = async (token: string, soal: any) => {
  const res = await axiosClient.post(
    "/api/virtual-account/import-virtual-account",
    soal,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("import virtual account response:", res);

  return res.data;
};

export const generateExcelVirtualAccount = async (
  token: string,
  filter: {
    gelombangId: string;
    periodeId: string;
    jenjang: string;
    tujuanFile: string;
  }
) => {
  try {
    const res = await axiosClient.get(
      "/api/virtual-account/generate-excel-virtual-account",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          selGelombang: filter.gelombangId,
          selPeriode: filter.periodeId,
          selJenjang: filter.jenjang,
          tujuanFile: filter.tujuanFile,
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
        message: "Gagal generate format excel virtual account",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal generate format excel virtual account",
    });
    return [];
  }
};
