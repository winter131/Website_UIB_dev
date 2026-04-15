import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getHasilWawancaraData = async (
  token: string,
  filter?: {
    gelombangId: string;
    periodeId: string;
    lokasiUjian: string;
    jenjang: string;
  },
) => {
  try {
    const res = await axiosClient.get(
      "/api/hasil-wawancara/get-hasil-wawancara",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filter,
      },
    );

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data hasil wawancara",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data hasil wawancara",
    });
    return [];
  }
};

// export const editKategoriUSM = async (token: string, kategoriUSM: any) => {
//   const res = await axiosClient.patch(
//     "/api/kategori-usm/edit-kategori-usm",
//     kategoriUSM,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   console.log("edit kategori USM response:", res);

//   return res.data;
// };

export const ubahWawancara = async (token: string, wawancara: any) => {
  const res = await axiosClient.patch(
    "/api/hasil-wawancara/ubah-wawancara",
    wawancara,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const deleteHasilWawancara = async (
  token: string,
  hasilWawancaraId: string,
) => {
  const res = await axiosClient.delete(
    `/api/hasil-wawancara/delete-hasil-wawancara/${hasilWawancaraId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("delete hasil wawancara response:", res);

  return res.data;
};
