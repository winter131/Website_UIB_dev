import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { ucFirst } from "@/utils/UcFirst";
import Image from "next/image";
import Link from "next/link";

export default function DetailCalonMahasiswaHeader({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: CalonMahasiswaType | null;
}) {
  const isPhotoPdf = data?.PasPhotoLink?.toLowerCase()
    .split("?")[0]
    .endsWith(".pdf");
  return (
    <div className="flex flex-row gap-6 items-center">
      {/* Avatar */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="avatar">
          <div className="ring-[#F8B600] ring-offset-base-100 w-20 rounded-full ring ring-offset-2 overflow-hidden">
            <Image
              src={
                isPhotoPdf
                  ? "/img/user-default.png"
                  : data?.PasPhotoLink || "/img/user-default.png"
              }
              alt="Pas Photo"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      {/* Detail Kiri */}
      {isLoading ? (
        <div className="flex flex-col">
          {/* Skeleton Nama */}
          <div className="h-5 skeleton w-32 md:w-56 dark:bg-[#212121]" />

          {/* Skeleton Sub-info */}
          <div className="flex flex-col md:flex-row flex-wrap gap-0 md:gap-3 justify-center md:items-center mt-3 text-sm">
            <div className="h-2 skeleton w-16 md:w-24 dark:bg-[#212121]" />
            <span className="opacity-50">&#9679;</span>
            <div className="h-2 skeleton w-16 md:w-24 dark:bg-[#212121]" />
            <span className="opacity-50">&#9679;</span>
            <div className="h-2 skeleton w-16 md:w-24 dark:bg-[#212121]" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="text-black dark:text-white font-bold text-2xl">
            {data?.NamaCamhs || "-"}
          </span>

          <div className="text-dark dark:text-white font-light text-sm flex flex-row gap-3 md:flex-row flex-wrap md:gap-3">
            <span>{data?.NamaProdi || "-"}</span>

            <span className="opacity-60">&#9679;</span>

            <span>{ucFirst(data?.WaktuKuliah || "-")}</span>

            <span className="opacity-60">&#9679;</span>

            <span>{ucFirst(data?.JenisDaftar || "-")}</span>
          </div>
          {isPhotoPdf && (
            <div className="mt-2 text-center flex flex-row items-center gap-2">
              <span className="text-xs italic text-center text-red-500">
                (Pas Photo berupa file PDF)
              </span>
              <Link
                href={data?.PasPhotoLink || "#"}
                className="btn btn-xs btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat Pas Photo
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
