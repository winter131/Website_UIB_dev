import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getAktivasiAkunData = async (
  token: string,
  filter: { freeSearch: string; statusAkun: string },
) => {
  try {
    const res = await axiosClient.get("/api/member-daftar/get-member-daftar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search: filter.freeSearch,
        statusAkun:
          filter.statusAkun === "sudah"
            ? "y"
            : filter.statusAkun === "belum"
              ? "n"
              : "",
      },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data akun yang terdaftar",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data akun yang terdaftar",
    });
    return [];
  }
};

export const editAktivasiAkun = async (token: string, aktivasiAkun: any) => {
  const res = await axiosClient.post(
    "/api/member-daftar/edit-aktivasi-akun",
    aktivasiAkun,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("edit aktivasi akun response:", res);

  return res.data;
};

export const resetPassword = async (token: string, aktivasiAkun: any) => {
  const res = await axiosClient.post(
    "/api/member-daftar/reset-password",
    aktivasiAkun,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("reset password akun response:", res);

  return res.data;
};
