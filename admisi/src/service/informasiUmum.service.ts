import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getInformasiUmumData = async (token: string) => {
  try {
    const res = await axiosClient.get(
      "/api/informasi-umum/get-informasi-umum",
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
        message: "Gagal mengambil data informasi umum",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data informasi umum",
    });
    return [];
  }
};

export const createInformasiUmum = async (
  token: string,
  informasiUmum: any
) => {
  const formData = new FormData();
  formData.append("judul_informasi", informasiUmum.judul_informasi);
  formData.append("keterangan_info", informasiUmum.keterangan_info);
  // formData.append("body_informasi", informasiUmum.body_informasi);
  formData.append("is_aktif", informasiUmum.is_aktif);
  formData.append(
    "body_informasi",
    JSON.stringify(informasiUmum.body_informasi)
  );
  if (informasiUmum.header_gambar) {
    formData.append("header_gambar", informasiUmum.header_gambar);
  }
  const res = await axiosClient.put(
    "/api/informasi-umum/create-informasi-umum",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("create informasi umum response:", res);

  return res.data;
};

export const editInformasiUmum = async (token: string, informasiUmum: any) => {
  const formData = new FormData();
  formData.append("id_informasi", informasiUmum.id_informasi);
  formData.append("judul_informasi", informasiUmum.judul_informasi);
  formData.append("keterangan_info", informasiUmum.keterangan_info);
  formData.append("is_aktif", informasiUmum.is_aktif);
  formData.append(
    "body_informasi",
    JSON.stringify(informasiUmum.body_informasi)
  );
  if (typeof informasiUmum.header_gambar !== "string") {
    formData.append("header_gambar", informasiUmum.header_gambar);
  } else {
    formData.append("header_file_name", informasiUmum.header_file_name);
  }
  const res = await axiosClient.patch(
    "/api/informasi-umum/edit-informasi-umum",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("edit informasi umum response:", res);

  return res.data;
};

export const deleteInformasiUmum = async (
  token: string,
  informasiUmumId: string
) => {
  const res = await axiosClient.delete(
    `/api/informasi-umum/delete-informasi-umum/${informasiUmumId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("delete informasi umum response:", res);

  return res.data;
};
