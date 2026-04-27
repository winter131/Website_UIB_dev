import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-row flex-wrap items-start min-h-screen bg-[#F9F9F9] dark:bg-[#212121] pb-1 px-10 pt-10 sm:pt-16">
        <div className="navbar bg-transparent">
          <div className="flex-1 dark:hidden">
            <Image
              src="/logo/logo-uib.png"
              alt="Logo"
              width={200}
              height={200}
              priority
            />
          </div>
          <div className="hidden dark:flex dark:flex-1">
            <Image
              src="/logo/logo-uib-putih.png"
              alt="Logo"
              width={200}
              height={200}
              priority
            />
          </div>
          <div className="flex-none">
            <Image
              src="/logo/go-international.png"
              alt="Logo"
              width={200}
              height={200}
              priority
            />
          </div>
        </div>

        <div className="-mt-24 flex flex-1 h-96 w-screen flex-col lg:p-10 justify-center items-center">
          <Image
            src={"/img/404.svg"}
            alt="404 Not Found"
            width={300}
            height={300}
            className="mb-3"
          />
          <h1 className="text-2xl font-light text-[#1A365D]">Halaman Tidak Ditemukan</h1>
          <p className="text-lg font-light text-slate-500">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
          <Link 
            href="/" 
            className="mt-8 px-8 py-3 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-full font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
}