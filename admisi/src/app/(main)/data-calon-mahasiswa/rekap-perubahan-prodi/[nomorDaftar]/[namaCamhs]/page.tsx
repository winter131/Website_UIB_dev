import RekapPerubahanProdiView from "./view/DetailRekapPerubahanProdiView";

export default async function SetModul({
  params,
}: {
  params: Promise<{ nomorDaftar: string; namaCamhs: string }>;
}) {
  const { nomorDaftar, namaCamhs } = await params;

  return (
    <RekapPerubahanProdiView
      nomorDaftar={nomorDaftar}
      namaCamhs={decodeURIComponent(namaCamhs)}
    />
  );
}
