'use client'
import React from 'react'
import Link from 'next/link'
import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-[#0055aa] text-white font-poppins">
      
      {/* 1. BAGIAN ATAS: LOGO & PARTNER (Background Gelap Transparan) */}
      
      <div className="flex flex-2 flex-col bg-black/10 py-8 border-b border-white/10 ">
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-90">
           
            <div className="flex items-center gap-4">
              <div className="leading-tight ">
               <img 
                src="/img/LogoUIBPutih.png" 
                alt="Rektor UIB"
                className="w-30 h-auto object-cover transition-transform duration-700 "
              />
              
              </div>
              <img 
                src="/img/unggul.png" 
                alt="Rektor UIB"
                className="w-30 h-auto object-cover transition-transform duration-700 "
              /></div>

            {/* Placeholder Logo Partner (Sesuai image_8ef8b8.png) */}
            <div className="flex flex-wrap items-center gap-8 grayscale brightness-200">
               <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]">DIKTISAINTEK</div>
               <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]">TRANSFORMATION</div>
               <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]">SDGs</div>
               <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]">GREEN CAMPUS</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BAGIAN TENGAH: LINK NAVIGASI (4 KOLOM) */}
      <div className="container mx-auto px-4 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[13px]">
          
          {/* KOLOM 1: ALAMAT & KONTAK */}
          <div className="space-y-4">
            <p className="leading-relaxed font-medium">
              Jl. Gajah Mada, Baloi Permai, Batam, <br />
              Kepulauan Riau 29442, Indonesia
            </p>
            <div className="pt-2 space-y-2">
              <p className="flex items-center gap-2">
                <span className="font-bold">📞 0778 462577</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold">✉️ info@uib.ac.id</span>
              </p>
            </div>
          </div>

          {/* KOLOM 2: LAYANAN */}
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Sistem Informasi</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Unit Layanan Terpadu</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Pertanyaan yang Sering Diajukan</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Aturan Penggunaan</Link>
          </div>

          {/* KOLOM 3: INFORMASI PUBLIK */}
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Hak Cipta Website</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Peta Situs</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">PPID</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Lapor</Link>
          </div>

          {/* KOLOM 4: KARIR & SURVEY */}
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Pengadaan Elektronik</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Survei</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Arsip</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Berkarir di UIB</Link>
          </div>

        </div>
      </div>

      {/* 3. BAGIAN BAWAH: SOSIAL MEDIA & COPYRIGHT */}
      <div className="container mx-auto px-4 md:px-20 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-8">
          
          {/* Ikon Sosial Media (Sesuai image_8ef8b8.png) */}
          <div className="flex items-center gap-3">
            <SocialIcon icon={<FaWhatsapp size={18} />} />
            <SocialIcon icon={<FaYoutube size={18} />} />
            <SocialIcon icon={<FaXTwitter size={16} />} />
            <SocialIcon icon={<FaFacebookF size={18} />} />
            <SocialIcon icon={<FaInstagram size={18} />} />
            <SocialIcon icon={<FaLinkedinIn size={18} />} />
            <SocialIcon icon={<FaTiktok size={18} />} />
          </div>
          
          {/* Copyright */}
          <div className="text-[11px] opacity-70 text-center md:text-right">
            Copyright 2026 - Universitas Internasional Batam
          </div>
        </div>
      </div>
    </footer>
  )
}

// Sub-komponen untuk Ikon Sosial Media
function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-[#0055aa] rounded-md hover:bg-[#e67e22] hover:text-white transition-all">
      {icon}
    </a>
  )
}