'use client'
import React from 'react'
import Link from 'next/link'
import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-[#0055aa] text-white font-poppins">


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

            <div className="flex flex-wrap items-center gap-8 grayscale brightness-200">
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]"><a href="https://greenmetrics.ui.ac.id/" target="_blank" rel="noopener noreferrer">UI Green Metrics</a></div>
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]"><a href="https://sdgs.un.org/" target="_blank" rel="noopener noreferrer">SDG'S</a></div>
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]"><a href="https://www.webometrics.org/?query=universitas+internasional+batam" target="_blank" rel="noopener noreferrer">Webometrics</a></div>
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]"><a href="https://unirank.org/" target="_blank" rel="noopener noreferrer">Unirank</a></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[13px]">

          <div className="space-y-4">
            <p className="leading-relaxed font-medium">
              Jl. Gajah Mada, Baloi Permai, Batam, <br />
              Kepulauan Riau 29442, Indonesia
            </p>
            <div className="pt-2 space-y-2">
              <p className="flex items-center gap-2">
                <span className="font-bold">📞 (0778) 7437111</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold"></span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/footer/kemitraan" className="hover:text-[#e67e22] transition-colors">Kemitraan</Link>
            <Link href="/footer/unduhdokumen" className="hover:text-[#e67e22] transition-colors">Unduh Dokumen</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Perpustakaan</Link>
            <Link href="/conference/" className="hover:text-[#e67e22] transition-colors">UIB Conference</Link>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Pusat Pengemgbangan Akademik</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Kalender Akademik</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">My Portal</Link>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-[#e67e22] transition-colors">Darmasiswa RI</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">IISMA</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">LPDP</Link>
            <Link href="#" className="hover:text-[#e67e22] transition-colors">PMM</Link>
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-8">

          <div className="flex items-center gap-3">
            <SocialIcon
              href="https://wa.me/6281222263818"
              icon={<FaWhatsapp size={18} />}
            />

            <SocialIcon
              href="https://www.youtube.com/@uib_batam"
              icon={<FaYoutube size={18} />}
            />

            <SocialIcon
              href="https://x.com/uib_batam"
              icon={<FaXTwitter size={16} />}
            />

            <SocialIcon
              href="https://www.facebook.com/uib.batam"
              icon={<FaFacebookF size={18} />}
            />

            <SocialIcon
              href="https://www.instagram.com/uib_batam"
              icon={<FaInstagram size={18} />}
            />

            <SocialIcon
              href="https://www.linkedin.com/school/universitas-internasional-batam/"
              icon={<FaLinkedinIn size={18} />}
            />

            <SocialIcon
              href="https://www.tiktok.com/@uib_batam"
              icon={<FaTiktok size={18} />}
            />
          </div>

          <div className="text-[11px] opacity-70 text-center md:text-right">
            Copyright 2026 - Universitas Internasional Batam
          </div>
        </div>
      </div>
    </footer>
  )
}


function SocialIcon({ icon, href = '#' }: { icon: React.ReactNode, href?: string }) {
  return (
    <a href={href} target={href !== '#' ? "_blank" : "_self"} rel={href !== '#' ? "noopener noreferrer" : ""} className="w-9 h-9 flex items-center justify-center bg-white text-[#0055aa] rounded-md hover:bg-[#e67e22] hover:text-white transition-all">
      {icon}
    </a>
  )
}