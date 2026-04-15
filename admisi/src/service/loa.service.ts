import axiosClient from "@/lib/axiosCLient";

export const downloadLOA = async (token: string, data: any) => {
  const res = await axiosClient.post("/api/loa/download-loa", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });

  return res.data;
};

export const deleteLOACamhs = async (token: string, nomorDaftar: string) => {
  const res = await axiosClient.delete(
    `/api/loa/delete-loa-camhs/${nomorDaftar}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
