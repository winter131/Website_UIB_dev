'use client'
import React from 'react'
import { Trophy } from 'lucide-react'

export default function Rankings() {
  return (
    <section className="relative py-10 font-poppins overflow-hidden border-b border-gray-100 bg-[#FCFCFC]">



      <div className="container relative z-10 mx-auto py-5 px-4 md:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12 justify-center">

          <div className="flex items-center gap-5 min-w-fit">
            <div className="flex flex-col justify-center">
              <h3>
                <span className="text-[#18191A] font-medium text-lg">Pemeringkatan</span>
              </h3>
              <h3 className="text-[22px] font-black text-[#e67e22] leading-[1] tracking-tighter uppercase">
                Universitas
              </h3>
              <h3 className="text-[22px] font-black leading-[1] tracking-tighter uppercase">
                <span className="text-[#0055aa]">Internasional Batam</span>
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end items-start gap-10 lg:gap-16">

            <div className="flex items-start gap-3 h-full self-center">
              <Trophy className="text-[#18191A] w-10 h-10 stroke-[1.5px] mt-1 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#0055aa] leading-none">3</span>
                <span className="text-[10px] font-bold text-[#18191A] uppercase tracking-tight mt-1.5 leading-tight">
                  Webometrics Kepulauan Riau <br /> Ranking
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-l border-gray-300 pl-8 h-full justify-start">
              <div className="flex flex-col">
                <span className="text-[18px] font-black text-[#0055aa] leading-none">1491</span>
                <span className="text-[9px] font-bold text-[#18191A] uppercase tracking-tighter mt-1">UI Green Metrics Indonesia Ranking</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-black text-[#0055aa] leading-none">965</span>
                <span className="text-[9px] font-bold text-[#18191A] uppercase tracking-tighter mt-1">UI Green Metrics World University Ranking</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-l border-gray-300 pl-8 h-full justify-start">
              <div className="flex flex-col">
                <span className="text-[18px] font-black text-[#0055aa] leading-none">601-800</span>
                <span className="text-[9px] font-bold text-[#18191A] uppercase tracking-tighter mt-1">THE World Impactful Ranking</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-black text-[#0055aa] leading-none">268</span>
                <span className="text-[9px] font-bold text-[#18191A] uppercase tracking-tighter mt-1">QS Asia University Ranking</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}