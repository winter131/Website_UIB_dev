import ValidasiTagihanCamabaDetailView from "./view/ValidasiTagihanCamabaDetailView";

export default async function ValidasiTagihanCamaba({
  params,
}: {
  params: Promise<{ nomorDaftar: string; nama: string }>;
}) {
  const { nomorDaftar, nama } = await params;

  return (
    <ValidasiTagihanCamabaDetailView
      nomorDaftar={nomorDaftar}
      namaCamhs={decodeURIComponent(nama)}
    />
  );
}
