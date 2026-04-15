import HasilWawancaraDetailView from "./view/HasilWawancaraDetailView";

export default async function HasilWawancaraDetail({
  params,
}: {
  params: Promise<{ nomorDaftar: string; nama: string }>;
}) {
  const { nomorDaftar, nama } = await params;

  return (
    <HasilWawancaraDetailView
      nomorDaftar={nomorDaftar}
      namaCamhs={decodeURIComponent(nama)}
    />
  );
}
