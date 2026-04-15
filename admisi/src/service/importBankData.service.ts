import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getImportBankData = async (
  token: string,
  filter?: { selBulan: string; selTahun: string },
) => {
  try {
    const res = await axiosClient.get(
      "/api/import-data-bank/get-import-data-bank",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          selBulan: filter?.selBulan || "all",
          selTahun: filter?.selTahun || "all",
        },
      },
    );

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data import bank",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data import bank",
    });
    return [];
  }
};
export const getImportBankDataDetail = async (token: string, id: string) => {
  try {
    const res = await axiosClient.get(
      "/api/import-data-bank/get-import-data-bank-detail",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      },
    );

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data import bank detail",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data import bank detail",
    });
    return [];
  }
};

export const importDaftarUlang = async (token: string, daftarUlang: any) => {
  const res = await axiosClient.post(
    "/api/import-data-bank/import-daftar-ulang",
    daftarUlang,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("import daftar ulang response:", res);

  return res.data;
};

export const deleteDaftarUlang = async (
  token: string,
  daftarUlangId: string,
) => {
  const res = await axiosClient.delete(
    `/api/import-data-bank/delete-daftar-ulang/${daftarUlangId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("delete daftar ulang response:", res);

  return res.data;
};
