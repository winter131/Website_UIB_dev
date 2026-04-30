'use client'
import React, { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import { Trophy, ArrowRight, Award, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { getAllNews } from '@/actions/newsActions'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

const getImageUrl = (image: string | null | undefined) => {
  if (!image) return '/img/story1.jpg'
  if (image.startsWith('http') || image.startsWith('/')) return image
  return '/' + image
}

export default function FeaturedAchievement() {
  const [slides, setSlides] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllNews('Prestasi')
        setSlides(data || [])
      } catch (err) {
        console.error('Failed to fetch prestasi:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // const lastachievement = async () => {
  //   const lastAchievement = useActionState()
  //   if (lastAchievement) = async () => {
  //     try {
  //       const data = await getAllNews('Prestasi')
  //       setSlides(data || [])
  //     } catch (err) {
  //       console.error('Failed to fetch prestasi:', err)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  // }

  if (isLoading) {
    return (
      <section className="relative py-20 font-poppins overflow-hidden">
        <div className="container mx-auto px-4 md:px-20">
          <div className="rounded-[2rem] bg-[#2A3955] h-[500px] animate-pulse flex items-center justify-center text-white/30">
            Memuat prestasi...
          </div>
        </div>
      </section>
    )
  }

  if (slides.length === 0) return null

  return (
    <section className="relative py-20 font-poppins overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/img/batik_new.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'fit',
          opacity: 0.1
        }}
      />

      <div className="container mx-auto px-4 md:px-20 relative z-10 group">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          loop={slides.length > 1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          className="rounded-[2rem] shadow-2xl overflow-hidden border border-white/5"
        >
          {slides.map((item, index) => (
            <SwiperSlide key={item.id || index} className="h-full">
              <div className="flex flex-col lg:flex-row items-stretch bg-[#2A3955] relative min-h-[500px] lg:h-full">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/img/batik-new.jpg')] bg-repeat bg-[length:300px_300px]"></div>

                <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                      <Trophy className="text-white" size={24} />
                    </div>
                    {item.category && (
                      <span className="text-[10px] font-black uppercase tracking-widest bg-[#e67e22]/20 text-[#f0a050] px-3 py-1 rounded-full border border-[#e67e22]/30">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 uppercase">
                    {item.title}
                  </h2>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-10 max-w-xl text-justify line-clamp-4">
                    {item.summary || item.description?.replace(/<[^>]*>/g, '').slice(0, 200)}
                  </p>
                  <div className="flex flex-wrap items-center gap-6">
                    <Link href={`/mahasiswa/prestasi/${item.slug}`} className="group flex items-center gap-3 bg-[#e67e22] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#2A3955] transition-all duration-300 shadow-xl">
                      Selengkapnya <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="text-[11px] text-white/40 font-medium italic">Oleh: {item.author}</div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden self-stretch">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#2A3955] hidden lg:block"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#2A3955] via-transparent to-transparent lg:hidden"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {slides.length > 1 && (
            <>
              <button className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#e67e22] hover:border-[#e67e22] transition-all duration-500 opacity-0 group-hover:opacity-100 hidden md:flex">
                <ChevronLeft size={30} />
              </button>
              <button className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#e67e22] hover:border-[#e67e22] transition-all duration-500 opacity-0 group-hover:opacity-100 hidden md:flex">
                <ChevronRight size={30} />
              </button>
            </>
          )}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper { height: auto !important; }
        .swiper-wrapper { display: flex !important; }
        .swiper-slide { height: auto !important; }
        .swiper-pagination { display: none !important; }
        .swiper-button-next::after, .swiper-button-prev::after { content: "" !important; }
      `}</style>
    </section>
  )
}
