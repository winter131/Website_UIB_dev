'use client'
import React from 'react'
import Link from 'next/link'
import { Trophy, ArrowRight, Award, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'

// Import CSS Swiper Dasar
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

export default function FeaturedAchievement() {
  const slides = [
    {
      title: "Gold Medal di World Young Inventor Exhibition 2025",
      desc: "Tim Robotik Universitas Internasional Batam berhasil mengharumkan nama Indonesia dengan meraih medali emas melalui inovasi sistem navigasi cerdas untuk eksplorasi maritim.",
      image: "/img/story1.jpg",
      by: "Prodi Sistem Informasi",
      icon: <Trophy className="text-white" size={24} />
    },
    {
      title: "Juara 1 National Cyber Security Competition 2025",
      desc: "Mahasiswa Teknik Informatika UIB membuktikan keunggulan dalam pertahanan siber tingkat nasional, mengamankan infrastruktur kritis dari simulasi serangan kompleks.",
      image: "/img/story2.jpg",
      by: "Prodi Teknik Informatika",
      icon: <Award className="text-white" size={24} />
    },
    {
      title: "Hibah Riset Internasional: Smart City Batam",
      desc: "Kolaborasi strategis antara UIB dan National University of Singapore dalam mengembangkan teknologi AI untuk monitoring kualitas lingkungan di kawasan Kepulauan Riau.",
      image: "/img/story3.jpg",
      by: "Lembaga Penelitian & Pengabdian",
      icon: <Globe className="text-white" size={24} />
    }
  ];

  return (
    <section className="relative py-20 font-poppins overflow-hidden">
      {/* Background Motif Batik Global */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/img/batik_new.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'fit',
          opacity: 0.1 // Opacity rendah agar tidak mengganggu keterbacaan
        }}
      />

      <div className="container mx-auto px-4 md:px-20 relative z-10 group">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          className="rounded-[2rem] shadow-2xl overflow-hidden border border-white/5"
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index} className="h-full">
              {/* FIXED: Menggunakan h-full agar konten slide mengisi seluruh tinggi Swiper */}
              <div className="flex flex-col lg:flex-row items-stretch bg-[#2A3955] relative min-h-[500px] lg:h-full">
                
                {/* Aksen Batik dalam kartu */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/img/batik-new.jpg')] bg-repeat bg-[length:300px_300px]"></div>

                {/* SISI KIRI: KONTEN TEKS */}
                <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                      {item.icon}
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 uppercase">
                    {item.title}
                  </h2>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-10 max-w-xl text-justify">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-6">
                    <Link href="/landing" className="group flex items-center gap-3 bg-[#e67e22] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#2A3955] transition-all duration-300 shadow-xl">
                      Selengkapnya <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="text-[11px] text-white/40 font-medium italic">Oleh: {item.by}</div>
                  </div>
                </div>

                {/* SISI KANAN: GAMBAR (FIXED: Menghilangkan celah bawah) */}
                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden self-stretch">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    /* h-full w-full + absolute inset-0 memaksa gambar memenuhi container pembungkusnya */
                    className="absolute inset-0 w-full h-full object-cover object-center grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                  />
                  {/* Overlay Gradasi menyatu dengan sisi kiri */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#2A3955] hidden lg:block"></div>
                  {/* Overlay Mobile */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#2A3955] via-transparent to-transparent lg:hidden"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* NAVIGASI PANAH */}
          <button className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#e67e22] hover:border-[#e67e22] transition-all duration-500 opacity-0 group-hover:opacity-100 hidden md:flex">
            <ChevronLeft size={30} />
          </button>
          <button className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#e67e22] hover:border-[#e67e22] transition-all duration-500 opacity-0 group-hover:opacity-100 hidden md:flex">
            <ChevronRight size={30} />
          </button>
        </Swiper>
      </div>

      <style jsx global>{`
        /* Menghapus celah putih/hitam di bawah swiper-wrapper */
        .swiper { height: auto !important; }
        .swiper-wrapper { display: flex !important; }
        .swiper-slide { height: auto !important; }
        
        .swiper-pagination { display: none !important; }
        .swiper-button-next::after, .swiper-button-prev::after { content: "" !important; }
      `}</style>
    </section>
  )
}