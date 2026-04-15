import UbahWawancaraView from "./view/UbahWawancaraView";

export default async function HasilWawancaraDetail({
  params,
}: {
  params: Promise<{ nomorDaftar: string; nama: string }>;
}) {
  const { nomorDaftar, nama } = await params;

  return (
    <UbahWawancaraView
      nomorDaftar={nomorDaftar}
      namaCamhs={decodeURIComponent(nama)}
    />
  );
}
