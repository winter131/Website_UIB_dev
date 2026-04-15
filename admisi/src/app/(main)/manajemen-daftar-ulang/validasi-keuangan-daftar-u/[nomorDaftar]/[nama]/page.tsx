import ValidasiKeuanganDaftarUlangDetailView from "./view/ValidasiKeuanganDaftarUlangDetailView";

export default async function ValidasiKeuanganDaftarUlangDetail({
  params,
}: {
  params: Promise<{ nomorDaftar: string; nama: string }>;
}) {
  const { nomorDaftar, nama } = await params;

  return (
    <ValidasiKeuanganDaftarUlangDetailView
      nomorDaftar={nomorDaftar}
      namaCamhs={decodeURIComponent(nama)}
    />
  );
}
