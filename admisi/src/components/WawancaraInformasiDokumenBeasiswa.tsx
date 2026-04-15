import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import BiodataView from "./BiodataView";
import { GetNamaFileDariLinkBucket } from "@/utils/GetNamaFileDariLinkBucket";

export default function WawancaraInformasiDokumenBeasiswa({
  data,
}: {
  data: any;
}) {
  return (
    <Card className="border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
            <i className="bx bx-file text-xl"></i>
          </div>
          <div>
            <CardTitle className="text-lg">
              Dokumen Pendukung Beasiswa
            </CardTitle>
            <CardDescription className="text-xs">
              Tinjau dokumen pendukung beasiswa yang telah diunggah oleh calon
              mahasiswa.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 w-full">
          <BiodataView
            title="Rapor Semester 1"
            value={data?.dokumen_beasiswa?.Raport1Link || ""}
            type="file"
            dataFile={{
              namaFile: GetNamaFileDariLinkBucket(
                data?.dokumen_beasiswa?.Raport1Link || "",
              ),
              linkFile: data?.dokumen_beasiswa?.Raport1Link || "#",
              type: "preview",
              buttonText: "Lihat",
              onClick: () => {
                window.open(
                  data?.dokumen_beasiswa?.Raport1Link || "#",
                  "_blank",
                );
              },
            }}
          />

          <BiodataView
            title="Rapor Semester 2"
            value={data?.dokumen_beasiswa?.Raport2Link || ""}
            type="file"
            dataFile={{
              namaFile: GetNamaFileDariLinkBucket(
                data?.dokumen_beasiswa?.Raport2Link || "",
              ),
              linkFile: data?.dokumen_beasiswa?.Raport2Link || "#",
              type: "preview",
              buttonText: "Lihat",
              onClick: () => {
                window.open(
                  data?.dokumen_beasiswa?.Raport2Link || "#",
                  "_blank",
                );
              },
            }}
          />

          <BiodataView
            title="Rapor Semester 3"
            value={data?.dokumen_beasiswa?.Raport3Link || ""}
            type="file"
            dataFile={{
              namaFile: GetNamaFileDariLinkBucket(
                data?.dokumen_beasiswa?.Raport3Link || "",
              ),
              linkFile: data?.dokumen_beasiswa?.Raport3Link || "#",
              type: "preview",
              buttonText: "Lihat",
              onClick: () => {
                window.open(
                  data?.dokumen_beasiswa?.Raport3Link || "#",
                  "_blank",
                );
              },
            }}
          />

          <BiodataView
            title="Rapor Semester 4"
            value={data?.dokumen_beasiswa?.Raport4Link || ""}
            type="file"
            dataFile={{
              namaFile: GetNamaFileDariLinkBucket(
                data?.dokumen_beasiswa?.Raport4Link || "",
              ),
              linkFile: data?.dokumen_beasiswa?.Raport4Link || "#",
              type: "preview",
              buttonText: "Lihat",
              onClick: () => {
                window.open(
                  data?.dokumen_beasiswa?.Raport4Link || "#",
                  "_blank",
                );
              },
            }}
          />

          <BiodataView
            title="Surat Keterangan Tidak Mampu"
            value={data?.dokumen_beasiswa?.SuratKeteranganTidakMampuLink || ""}
            type="file"
            dataFile={{
              namaFile: GetNamaFileDariLinkBucket(
                data?.dokumen_beasiswa?.SuratKeteranganTidakMampuLink || "",
              ),
              linkFile:
                data?.dokumen_beasiswa?.SuratKeteranganTidakMampuLink || "#",
              type: "preview",
              buttonText: "Lihat",
              onClick: () => {
                window.open(
                  data?.dokumen_beasiswa?.SuratKeteranganTidakMampuLink || "#",
                  "_blank",
                );
              },
            }}
          />

          <BiodataView
            title="Foto Rumah"
            value={data?.dokumen_beasiswa?.FotoRumahLink || ""}
            type="file"
            dataFile={{
              namaFile: GetNamaFileDariLinkBucket(
                data?.dokumen_beasiswa?.FotoRumahLink || "",
              ),
              linkFile: data?.dokumen_beasiswa?.FotoRumahLink || "#",
              type: "preview",
              buttonText: "Lihat",
              onClick: () => {
                window.open(
                  data?.dokumen_beasiswa?.FotoRumahLink || "#",
                  "_blank",
                );
              },
            }}
          />

          <BiodataView
            title="Tagihan Listrik"
            value={data?.dokumen_beasiswa?.TagihanListrikLink || ""}
            type="file"
            dataFile={{
              namaFile: GetNamaFileDariLinkBucket(
                data?.dokumen_beasiswa?.TagihanListrikLink || "",
              ),
              linkFile: data?.dokumen_beasiswa?.TagihanListrikLink || "#",
              type: "preview",
              buttonText: "Lihat",
              onClick: () => {
                window.open(
                  data?.dokumen_beasiswa?.TagihanListrikLink || "#",
                  "_blank",
                );
              },
            }}
          />

          <BiodataView
            title="Tagihan Air"
            value={data?.dokumen_beasiswa?.TagihanAirLink || ""}
            type="file"
            dataFile={{
              namaFile: GetNamaFileDariLinkBucket(
                data?.dokumen_beasiswa?.TagihanAirLink || "",
              ),
              linkFile: data?.dokumen_beasiswa?.TagihanAirLink || "#",
              type: "preview",
              buttonText: "Lihat",
              onClick: () => {
                window.open(
                  data?.dokumen_beasiswa?.TagihanAirLink || "#",
                  "_blank",
                );
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
