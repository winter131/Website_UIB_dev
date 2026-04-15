import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getTagihanCalonMahasiswaData = async (
  token: string,
  filter?: { selJenjang?: string; selPeriode?: string },
) => {
  try {
    const res = await axiosClient.get(
      "/api/tagihan-calon-mahasiswa/get-tagihan-calon-mahasiswa",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          selJenjang: filter?.selJenjang,
          selPeriode: filter?.selPeriode,
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
        message: "Gagal mengambil data tagihan calon mahasiswa",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data tagihan calon mahasiswa",
    });
    return [];
  }
};

export const createEditTagihanLOAS1 = async (
  token: string,
  tagihanLOAS1: any,
) => {
  const res = await axiosClient.put(
    "/api/tagihan-calon-mahasiswa/create-tagihan-calon-mahasiswa-s1",
    tagihanLOAS1,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("create tagihan LOA S1 response:", res);

  return res.data;
};

export const createEditTagihanLOAS2 = async (
  token: string,
  tagihanLOAS2: any,
) => {
  const res = await axiosClient.put(
    "/api/tagihan-calon-mahasiswa/create-tagihan-calon-mahasiswa-s2",
    tagihanLOAS2,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("create tagihan LOA S2 response:", res);

  return res.data;
};

export const editTagihanLOAS2 = async (token: string, tagihanLOAS2: any) => {
  const res = await axiosClient.patch(
    "/api/tagihan-calon-mahasiswa/edit-tagihan-calon-mahasiswa-s2",
    tagihanLOAS2,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const deleteTagihanLOAS1 = async (
  token: string,
  tagihanLOAId: string,
) => {
  const res = await axiosClient.delete(
    `/api/tagihan-calon-mahasiswa/delete-tagihan-calon-mahasiswa-s1/${tagihanLOAId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("delete tagihan LOA S1 response:", res);

  return res.data;
};

export const deleteTagihanLOAS2 = async (
  token: string,
  tagihanLOAId: string,
) => {
  const res = await axiosClient.delete(
    `/api/tagihan-calon-mahasiswa/delete-tagihan-calon-mahasiswa-s2/${tagihanLOAId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("delete tagihan LOA S2 response:", res);

  return res.data;
};

export const editTagihanLOAS1 = async (token: string, tagihanLOAS1: any) => {
  const res = await axiosClient.patch(
    "/api/tagihan-calon-mahasiswa/edit-tagihan-calon-mahasiswa-s1",
    tagihanLOAS1,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("edit tagihan LOA S1 response:", res);

  return res.data;
};

export const downloadExcelTagihanLOAS1 = async (
  token: string,
  sel_periode: string,
) => {
  const res = await axiosClient.get(
    "/api/tagihan-calon-mahasiswa/download-excel-tagihan-s1",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        sel_periode: sel_periode,
      },
      responseType: "blob",
    },
  );

  return res.data;
};

export const downloadExcelTagihanLOAS2 = async (
  token: string,
  sel_periode: string,
) => {
  const res = await axiosClient.get(
    "/api/tagihan-calon-mahasiswa/download-excel-tagihan-s2",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        sel_periode: sel_periode,
      },
      responseType: "blob",
    },
  );

  return res.data;
};

export const importTagihanLOAS1 = async (token: string, tagihanLOAS1: any) => {
  const res = await axiosClient.post(
    "/api/tagihan-calon-mahasiswa/import-tagihan-calon-mahasiswa-s1",
    tagihanLOAS1,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("import tagihan LOA S1 response:", res);

  return res.data;
};

export const importTagihanLOAS2 = async (token: string, tagihanLOAS2: any) => {
  const res = await axiosClient.post(
    "/api/tagihan-calon-mahasiswa/import-tagihan-calon-mahasiswa-s2",
    tagihanLOAS2,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("import tagihan LOA S2 response:", res);

  return res.data;
};
