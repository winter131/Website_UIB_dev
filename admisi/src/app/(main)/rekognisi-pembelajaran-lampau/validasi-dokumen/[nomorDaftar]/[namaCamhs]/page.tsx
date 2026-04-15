import DetailValidasiDokumenView from "./view/DetailValidasiDokumenView";

export default async function SetModul({
  params,
}: {
  params: Promise<{ nomorDaftar: string; namaCamhs: string }>;
}) {
  const { nomorDaftar, namaCamhs } = await params;

  return (
    <DetailValidasiDokumenView
      nomorDaftar={nomorDaftar}
      namaCamhs={decodeURIComponent(namaCamhs)}
    />
  );
}
