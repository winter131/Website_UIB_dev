import axiosClient from "@/lib/axiosCLient";
import { useNotifikasi } from "@/store/useNotifikasi";

const showNotification = useNotifikasi.getState().show;

export const getCalonMahasiswa = async (
  token: string,
  filter: {
    gelombangId?: string;
    periodeId?: string;
    jenjang?: string;
    lokasiUjian?: string;
    jalur?: string;
    justDaftarUlang?: string;
    justDiterima?: string;
    isLoa?: string;
  },
  isKepala?: boolean,
) => {
  try {
    const res = await axiosClient.get(
      "/api/calon-mahasiswa/get-calon-mahasiswa",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          selGelombang: filter.gelombangId || "",
          selPeriode: filter.periodeId || "",
          selJenjang: filter.jenjang || "",
          lokasiUjian: filter.lokasiUjian || "",
          selJalur: filter.jalur || "",
          isKepala: isKepala ? "y" : "n",
          justDaftarUlang: filter.justDaftarUlang || "",
          justDiterima: filter.justDiterima || "",
          isLoa: filter.isLoa || "",
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
        message: "Gagal mengambil data calon mahasiswa",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data calon mahasiswa",
    });
    return [];
  }
};

export const getCalonMahasiswaRPL = async (
  token: string,
  filter: {
    gelombangId?: string;
    periodeId?: string;
    jenjang?: string;
    lokasiUjian?: string;
    jalur?: string;
    justDaftarUlang?: string;
    justDiterima?: string;
    isLoa?: string;
  },
  isKepala?: boolean,
) => {
  try {
    const res = await axiosClient.get(
      "/api/calon-mahasiswa/get-calon-mahasiswa-rpl",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          selGelombang: filter.gelombangId || "",
          selPeriode: filter.periodeId || "",
          selJenjang: filter.jenjang || "",
          lokasiUjian: filter.lokasiUjian || "",
          selJalur: filter.jalur || "",
          isKepala: isKepala ? "y" : "n",
          justDaftarUlang: filter.justDaftarUlang || "",
          justDiterima: filter.justDiterima || "",
          isLoa: filter.isLoa || "",
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
        message: "Gagal mengambil data calon mahasiswa",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data calon mahasiswa",
    });
    return [];
  }
};

export const getCalonMahasiswaBelumDaftarUlang = async (
  token: string,
  filter: {
    gelombangId?: string;
    periodeId?: string;
    jenjang?: string;
    lokasiUjian?: string;
    jalur?: string;
  },
  isKepala?: boolean,
) => {
  try {
    const res = await axiosClient.get(
      "/api/calon-mahasiswa/get-calon-mahasiswa-belum-daftar-ulang",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          selGelombang: filter.gelombangId || "",
          selPeriode: filter.periodeId || "",
          selJenjang: filter.jenjang || "",
          lokasiUjian: filter.lokasiUjian || "",
          selJalur: filter.jalur || "",
          isKepala: isKepala ? "y" : "n",
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
        message: "Gagal mengambil data calon mahasiswa belum daftar ulang",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data calon mahasiswa belum daftar ulang",
    });
    return [];
  }
};

export const getCalonMahasiswaRequestPindahProdi = async (
  token: string,
  filter: {
    gelombangId?: string;
    periodeId?: string;
    jenjang?: string;
    lokasiUjian?: string;
    jalur?: string;
  },
  isKepala?: boolean,
) => {
  try {
    const res = await axiosClient.get(
      "/api/calon-mahasiswa/get-calon-mahasiswa-request-pindah-prodi",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          selGelombang: filter.gelombangId || "",
          selPeriode: filter.periodeId || "",
          selJenjang: filter.jenjang || "",
          lokasiUjian: filter.lokasiUjian || "",
          selJalur: filter.jalur || "",
          isKepala: isKepala ? "y" : "n",
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
        message: "Gagal mengambil data calon mahasiswa request pindah prodi",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data calon mahasiswa request pindah prodi",
    });
    return [];
  }
};

export const getDetailCalonMahasiswa = async (
  token: string,
  nomorDaftar: string,
  isKepala?: boolean,
) => {
  try {
    const res = await axiosClient.get(
      `/api/calon-mahasiswa/get-calon-mahasiswa/${nomorDaftar}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          isKepala: isKepala ? true : false,
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
        message: "Gagal mengambil data calon mahasiswa",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data calon mahasiswa",
    });
    return [];
  }
};

export const getDetailCalonMahasiswaRPL = async (
  token: string,
  nomorDaftar: string,
  isKepala?: boolean,
) => {
  try {
    const res = await axiosClient.get(
      `/api/calon-mahasiswa/get-calon-mahasiswa-rpl/${nomorDaftar}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          isKepala: isKepala ? true : false,
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
        message: "Gagal mengambil data calon mahasiswa RPL",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data calon mahasiswa RPL",
    });
    return [];
  }
};

export const getDetailKeuanganDaftarUlang = async (
  token: string,
  nomorDaftar: string,
) => {
  try {
    const res = await axiosClient.get(
      `/api/calon-mahasiswa/get-detail-keuangan-daftar-ulang/${nomorDaftar}`,
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
        message:
          "Gagal mengambil data detail keuangan daftar ulang calon mahasiswa",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message:
        "Gagal mengambil data detail keuangan daftar ulang calon mahasiswa",
    });
    return [];
  }
};

export const getDetailTagihanCamaba = async (
  token: string,
  nomorDaftar: string,
) => {
  try {
    const res = await axiosClient.get(
      `/api/calon-mahasiswa/get-detail-tagihan-camaba/${nomorDaftar}`,
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
        message: "Gagal mengambil data detail tagihan calon mahasiswa",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data detail tagihan calon mahasiswa",
    });
    return [];
  }
};

export const getDetailCalonMahasiswaPindahProdi = async (
  token: string,
  nomorDaftar: string,
  isKepala?: boolean,
) => {
  try {
    const res = await axiosClient.get(
      `/api/calon-mahasiswa/get-detail-pindah-prodi/${nomorDaftar}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          isKepala: isKepala ? true : false,
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
        message: "Gagal mengambil data pindah prodi calon mahasiswa",
      });
      return [];
    }
  } catch (error) {
    showNotification({
      status: "text-red-500",
      icon: "bx bx-error text-2xl",
      header: "Error",
      message: "Gagal mengambil data pindah prodi calon mahasiswa",
    });
    return [];
  }
};

export const saveValidasiKeuangan = async (token: string, data: any) => {
  const res = await axiosClient.post(
    "/api/calon-mahasiswa/save-validasi-keuangan",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("save validasi keuangan response:", res);

  return res.data;
};

export const saveValidasiKeuanganRPL = async (token: string, data: any) => {
  const res = await axiosClient.post(
    "/api/calon-mahasiswa/save-validasi-keuangan-rpl",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("save validasi keuangan rpl response:", res);

  return res.data;
};

export const saveValidasiKeuanganDaftarUlang = async (
  token: string,
  data: any,
) => {
  const res = await axiosClient.post(
    "/api/calon-mahasiswa/save-validasi-keuangan-daftar-ulang",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("save validasi keuangan daftar ulang response:", res);

  return res.data;
};

export const saveValidasiDokumen = async (token: string, data: any) => {
  const res = await axiosClient.post(
    "/api/calon-mahasiswa/save-validasi-dokumen",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("save validasi dokumen response:", res);

  return res.data;
};

export const saveValidasiDokumenRPL = async (token: string, data: any) => {
  const res = await axiosClient.post(
    "/api/calon-mahasiswa/save-validasi-dokumen-rpl",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log("save validasi dokumen RPL response:", res);

  return res.data;
};

export const validateLoaCamhs = async (
  token: string,
  data: { sel_camhs: string },
) => {
  const res = await axiosClient.post(
    "/api/calon-mahasiswa/validate-loa-camhs",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
