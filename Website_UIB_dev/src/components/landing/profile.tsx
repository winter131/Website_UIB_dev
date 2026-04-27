'use client'
import React, { useState } from 'react'
import { FaPlayCircle, FaTimes } from 'react-icons/fa'

export default function CompanyProfile() {
  const [isOpen, setIsOpen] = useState(false) 

  const data = [
    {
      title: "Tentang UIB",
      description: "Universitas Internasional Batam (UIB) berkomitmen untuk menyiapkan pemimpin dan profesional masa depan serta mendorong inovasi demi terwujudnya masyarakat yang sejahtera, demokratis, dan berkeadilan.",
      statistics: [
        { value: "29.638", label: "Penerima Beasiswa" },
        { value: "58.444", label: "Lulusan Mahasiswa" },
        { value: "3.460", label: "Riset Terpublikasi" },
        { value: "28.218", label: "Alumni Terdaftar" }
      ]
    }
  ]

  return (
    <section className="w-full bg-white overflow-hidden font-poppins">
      <div className="flex flex-col md:flex-row min-h-[600px]">

        <div className="w-full md:w-1/2 relative group">
          <img
            src="img\gedungUIB.jpg"
            alt="UIB Team Profile"
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-3 bg-transparent border-2 border-[#e67e22] px-4 py-3 text-[#e67e22] font-bold uppercase tracking-widest hover:bg-[#e67e22] hover:text-white transition-all group/btn"
            >
              <span>Putar Video</span>
              <FaPlayCircle size={24} className="group-hover/btn:scale-125 transition-transform" />
            </button>



          </div>
        </div>

        <div className="w-full md:w-1/2 bg-[#2A3955] p-10 md:p-20 text-white flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-tight">
            Tentang UIB
          </h2>

          <div className="space-y-6 opacity-90 text-[14px] md:text-[15px] leading-relaxed mb-12">
            <p>
              {data[0].description}
            </p>
            <p>
              {data[0].description}
            </p>
          </div>

          <h3 className="text-xl font-bold mb-8 border-b border-white/20 pb-2">
            Sebaran Penerima Layanan
          </h3>

          <div className="grid grid-cols-2 gap-y-10 gap-x-6">
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-1">{data[0].statistics[0].value} <span className="text-sm font-normal">orang</span></div>
              <div className="text-[11px] uppercase tracking-wider opacity-70 font-medium">Penerima Beasiswa</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-1">{data[0].statistics[1].value} <span className="text-sm font-normal">orang</span></div>
              <div className="text-[11px] uppercase tracking-wider opacity-70 font-medium">Lulusan Mahasiswa</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-1">{data[0].statistics[2].value} <span className="text-sm font-normal">judul</span></div>
              <div className="text-[11px] uppercase tracking-wider opacity-70 font-medium">Riset Terpublikasi</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-1">{data[0].statistics[3].value} <span className="text-sm font-normal">orang</span></div>
              <div className="text-[11px] uppercase tracking-wider opacity-70 font-medium">Alumni Terdaftar</div>
            </div>
          </div>

          <div className="mt-12">
            <button className="border-2 border-white px-8 py-3 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[#e67e22] transition-all">
              <a href='/landing/tentang'>Lihat Lebih Lanjut</a>
            </button>
          </div>
        </div>

      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#e67e22] transition-colors"
          >
            <FaTimes size={30} />
          </button>

          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              className="w-full h-full rounded-xl shadow-2xl"
              src="https://www.youtube.com/embed/_DvbHPDmvMc?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  )
}