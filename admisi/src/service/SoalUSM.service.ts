import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getSoalUSMData = async (
  token: string,
  filter?: { kategori: string },
) => {
  try {
    const res = await axiosClient.get("/api/soal-usm/get-soal-usm", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        kategori: filter?.kategori || "9999999",
      },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengambil data soal USM",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data soal USM",
    });
    return [];
  }
};

export const createEditSoalUSM = async (token: string, soalUSM: any) => {
  const res = await axiosClient.post("/api/soal-usm/create-soal-usm", soalUSM, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("create kategori USM response:", res);

  return res.data;
};

export const editSoalUSM = async (token: string, soalUSM: any) => {
  const res = await axiosClient.post("/api/soal-usm/edit-soal-usm", soalUSM, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("edit soal USM response:", res);

  return res.data;
};

export const deleteSoalUSM = async (token: string, soalUSMId: string) => {
  const res = await axiosClient.delete(
    `/api/soal-usm/delete-soal-usm/${soalUSMId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("delete soal USM response:", res);

  return res.data;
};

export const importSoalUSM = async (token: string, soalUSM: any) => {
  const res = await axiosClient.post("/api/soal-usm/import-soal-usm", soalUSM, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("import soal USM response:", res);

  return res.data;
};
