'use client'
import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const storiesData = [
  {
    tag: 'Risprostory',
    date: '18-09-2025',
    title: 'Tumbuh Tanpa Rasa Takut, Ketika Anak Menyuarakan Lara Hati di Kids Biennale Indonesia 2025',
    image: '/img/story1.jpg',
  },
  {
    tag: 'Success Story',
    date: '12-01-2026',
    title: 'Dari Batam Menuju Global: Kisah Alumni UIB Menembus Startup Unicorn di Singapura',
    image: '/img/story2.jpg',
  },
  {
    tag: 'Scholarship Story',
    date: '05-01-2026',
    title: 'Mewujudkan Mimpi Melalui Beasiswa Unggulan UIB: Perjalanan Riset di Bidang AI',
    image: '/img/story3.jpg',
  }
]

export default function SuccessStories() {
  const [current, setCurrent] = useState(0)
  const length = storiesData.length

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1)
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1)

  return (

    <section className="relative py-24 bg-white overflow-hidden font-poppins">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#efefef] z-0"></div>

      <div className="container mx-auto px-4 md:px-20 relative z-10">
        <div className="relative overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-white">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {storiesData.map((story, index) => (
              <div key={index} className="w-full flex-none flex flex-col md:flex-row min-h-[500px]">
                <div className="w-full md:w-1/2 relative h-80 md:h-auto overflow-hidden">
                  <img 
                    src={story.image} 
                    className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105" 
                    alt="Success Story" 
                  />
                </div>

                <div className="w-full md:w-1/2 bg-[#e67e22] p-10 md:p-20 flex flex-col justify-center text-white relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="border border-white/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                      {story.tag}
                    </span>
                    <span className="text-[11px] opacity-60 tracking-wider">{story.date}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold leading-tight mb-12  font-poppins">
                    {story.title}
                  </h3>

                  <button className="w-fit border-2 border-white px-10 py-3 text-[11px] font-poppins  tracking-[0.2em] hover:bg-white hover:text-[#e67e22] transition-all duration-300 ">
                    <a href='#blank'>Selengkapnya</a>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 text-white backdrop-blur-sm transition-all z-20"
          >
            <FaChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 text-white backdrop-blur-sm transition-all z-20"
          >
            <FaChevronRight size={20} />
          </button>

          <div className="absolute bottom-6 right-10 flex gap-2">
            {storiesData.map((_, i) => (
              <div 
                key={i}
                className={`h-1 transition-all duration-300 ${current === i ? 'w-8 bg-white' : 'w-4 bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}