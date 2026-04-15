'use client'
import React from 'react'

export default function SambutanRektor() {
  return (
    <section className="py-20 bg-white overflow-hidden font-poppins">
      <div className="container mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* SISI KIRI: FOTO REKTOR */}
          <div className="w-full md:w-2/5 relative">
            {/* Dekorasi Bingkai Tipis */}
            <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-[#e67e22] z-0 hidden md:block"></div>
            
            {/* Container Foto: Shadow dihapus, ditambahkan gradasi menyatu */}
            <div className="relative z-10 overflow-hidden">
              <img 
                src="/img/pakrektor.jpg" 
                alt="Rektor UIB"
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Overlay gradasi untuk menyatukan foto dengan bg putih di bagian bawah */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60"></div>
            </div>
            
            {/* Nama & Jabatan Mobile */}
            <div className="mt-6 md:hidden text-center">
              <h4 className="text-xl font-bold text-[#333]">Dr. Iskandar Itan</h4>
              <p className="text-sm text-gray-500 italic">Rektor Universitas Internasional Batam</p>
            </div>
          </div>

          {/* SISI KANAN: KUTIPAN & TEKS SAMBUTAN */}
          <div className="w-full md:w-3/5 relative">
            {/* Ikon Quote Watermark */}
            <span className="absolute -top-10 -left-6 text-[120px] text-[#b4b8c3] font-serif leading-none select-none z-0">
              “
            </span>

            <div className="relative z-10">
              <div className="inline-block bg-[#e67e22] text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">
                Pendidikan
              </div>

              <h2 className="text-2xl md:text-4xl font-bold text-[#002f5e] leading-tight mb-8">
                Pendidikan adalah kunci utama bagi bangsa untuk bertahan dalam persaingan global dan mewujudkan kesejahteraan nasional.
              </h2>

              <div className="space-y-6 text-[#002f5e] text-[15px] leading-relaxed">
                <p>
                  Sumber daya manusia (SDM) yang cerdas dan berkarakter merupakan prasyarat bagi pembangunan peradaban yang tinggi. Universitas Internasional Batam (UIB) berusaha memajukan SDM di Indonesia melalui pendidikan berkualitas guna menyejahterakan bangsa dan negara.
                </p>
                <p>
                  Tersedia berbagai program pendidikan vokasi, sarjana, dan magister yang dapat Anda pilih sesuai minat dan bakat untuk mendukung karier dan keahlian profesional Anda di masa depan.
                </p>
              </div>

              {/* Tanda Tangan & Nama Desktop */}
              <div className="mt-12 hidden md:block border-l-4 border-[#e67e22] pl-6">
                <h4 className="text-xl font-bold text-[#333]">Dr. Iskandar Itan</h4>
                <p className="text-sm text-[#002f5e] italic">Rektor Universitas Internasional Batam</p>
              </div>
            </div>

            {/* Ikon Quote Penutup */}
            <span className="absolute -bottom-10 right-0 text-[120px] text-gray-50 font-serif leading-none select-none z-0 rotate-180">
              “
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}
