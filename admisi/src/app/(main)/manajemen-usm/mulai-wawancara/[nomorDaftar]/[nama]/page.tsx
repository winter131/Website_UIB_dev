import MulaiWawancaraDetailView from "./view/MulaiWawancaraDetailView";

export default async function MulaiWawancaraDetail({
  params,
}: {
  params: Promise<{ nomorDaftar: string; nama: string }>;
}) {
  const { nomorDaftar, nama } = await params;

  return (
    <MulaiWawancaraDetailView
      nomorDaftar={nomorDaftar}
      namaCamhs={decodeURIComponent(nama)}
    />
  );
}
