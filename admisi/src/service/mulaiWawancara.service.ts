import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getMulaiWawancaraData = async (token: string) => {
  try {
    const res = await axiosClient.get(
      "/api/mulai-wawancara/get-mulai-wawancara",
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
        message: "Gagal mengambil data calon mahasiswa wawancara",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data calon mahasiswa wawancara",
    });
    return [];
  }
};

export const getMulaiWawancaraDataDetail = async (
  token: string,
  nomorDaftar: string,
) => {
  try {
    const res = await axiosClient.get(
      `/api/mulai-wawancara/get-mulai-wawancara-detail`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          nomor_daftar: nomorDaftar,
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
        message: "Gagal mengambil data detail calon mahasiswa wawancara",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data detail calon mahasiswa wawancara",
    });
    return [];
  }
};

export const simpanWawancara = async (token: string, wawancara: any) => {
  const res = await axiosClient.put(
    "/api/mulai-wawancara/simpan-wawancara",
    wawancara,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("simpan wawancara response:", res);

  return res.data;
};

export const getHasilWawancaraDetail = async (
  token: string,
  nomorDaftar: string,
) => {
  try {
    const res = await axiosClient.get(`/api/hasil-wawancara/get-detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        nomor_daftar: nomorDaftar,
      },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data detail hasil wawancara",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data detail hasil wawancara",
    });
    return [];
  }
};
