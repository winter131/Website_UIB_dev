import React from 'react'
import { FaPlay } from 'react-icons/fa'

export default function VideoSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-24">
        <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
           <img 
            src="/img/video-thumb.jpg" 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
           />
           <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <FaPlay size={30} className="ml-1" />
              </div>
           </div>
           <div className="absolute top-8 left-8 text-white">
              <div className="flex items-center gap-3">
                <img src="/logo/uib.png" alt="UIB" className="w-10 h-10 object-contain" />
                <h3 className="text-xl font-bold">Global Youth Scholarship</h3>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}
