'use client'
import React from 'react'
import Link from 'next/link'
import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function FooterInternational() {
  return (
    <footer className="bg-[#0055aa] text-white font-poppins">
      <div className="flex flex-2 flex-col bg-black/10 py-8 border-b border-white/10 ">
        <div className="container mx-auto px-4 md:px-24">
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-90">
            <div className="flex items-center gap-4">
              <div className="leading-tight ">
                <img src="/img/LogoUIBPutih.png" alt="Logo UIB" className="w-30 h-auto object-cover" />
              </div>
              <img src="/img/unggul.png" alt="Unggul" className="w-30 h-auto object-cover" />
            </div>
            <div className="flex flex-wrap items-center gap-8 grayscale brightness-200">
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]">UI Green Metrics</div>
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]">SDG'S</div>
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]">Webometrics</div>
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-[8px]">Unirank</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[13px]">
          <div className="space-y-4">
            <h4 className="font-bold text-[16px] mb-4">International Office</h4>
            <p className="leading-relaxed font-medium">
              Jl. Gajah Mada, Baloi Permai, Batam, <br />
              Kepulauan Riau 29442, Indonesia
            </p>
            <div className="pt-2 space-y-2">
              <p className="flex items-center gap-2">
                <span className="font-bold">📞 (0778) 7437111</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold">📧 international.office@uib.ac.id</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[16px] mb-2 uppercase tracking-wider text-orange-400">Programs</h4>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">3+2 Programs</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">2+2 Programs</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">1+1 Programs</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">Student Exchange</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[16px] mb-2 uppercase tracking-wider text-orange-400">Information</h4>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">Admission for Foreigner</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">Living in Batam</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">Visa & Stay Permit</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">Contact Us</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[16px] mb-2 uppercase tracking-wider text-orange-400">Scholarship</h4>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">Global Youth Scholarship</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">BIPA Program</Link>
            <Link href="#" className="hover:text-orange-400 transition-colors no-underline">Download Documents</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-24 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-8">
          <div className="flex items-center gap-3">
            <SocialIcon href="#" icon={<FaWhatsapp size={18} />} />
            <SocialIcon href="#" icon={<FaYoutube size={18} />} />
            <SocialIcon href="#" icon={<FaXTwitter size={16} />} />
            <SocialIcon href="#" icon={<FaFacebookF size={18} />} />
            <SocialIcon href="#" icon={<FaInstagram size={18} />} />
          </div>
          <div className="text-[11px] opacity-70 text-center md:text-right">
            Copyright 2026 - International Office UIB
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon, href = '#' }: { icon: React.ReactNode, href?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center bg-white text-[#0055aa] rounded-md hover:bg-orange-500 hover:text-white transition-all">
      {icon}
    </a>
  )
}
