'use client'
import React, { useRef } from 'react'

const slides = [
  {
    id: 0,
    image: "/img/Webslider Student Colloquium.webp",
    title: "Student Colloquium 2026",
    desc: "Membangun inovasi global melalui kolaborasi riset mahasiswa internasional di Universitas Internasional Batam."
  },
  {
    id: 1,
    image: "/img/RPL EN.webp",
    title: "Rekognisi Pembelajaran Lampau",
    desc: "Ubah pengalaman kerja profesional Anda menjadi SKS Akademik yang sah."
  }
]

export default function Hero() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  }

  return (
    <section className="relative w-full z-10 overflow-hidden bg-white">

      <div ref={carouselRef} className="carousel w-full h-auto min-h-[400px] scroll-smooth" style={{ scrollbarWidth: 'none' }}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            id={`slide${index}`}
            className="carousel-item relative w-full h-full"
          >
            <img
              src={slide.image}
              className="w-full h-full object-cover object-center"
              alt={slide.title}
            />

            {/* Overlay Gradient: Dibuat lebih halus agar detail gambar di kanan tetap terlihat */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>


            {/* Navigasi Panah: Diposisikan lebih ke pinggir dan dikecilkan agar tidak menutupi konten */}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2 z-20">
              <button
                onClick={(e) => { e.preventDefault(); scrollToSlide(index === 0 ? slides.length - 1 : index - 1); }}
                className="btn btn-sm md:btn-md btn-circle btn-ghost text-white opacity-30 hover:opacity-100 transition-opacity"
              >❮</button>
              <button
                onClick={(e) => { e.preventDefault(); scrollToSlide(index === slides.length - 1 ? 0 : index + 1); }}
                className="btn btn-sm md:btn-md btn-circle btn-ghost text-white opacity-30 hover:opacity-100 transition-opacity"
              >❯</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
