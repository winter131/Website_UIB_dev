'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function HeroInternational() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-blue-900">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: 'url("/img/international-hero.jpg")' }}
      >
         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-24 h-full relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 italic">
              Bridging <br /> Knowledge
            </h1>
            <div className="mt-8">
               <p className="text-orange-400 font-bold uppercase tracking-widest text-sm mb-2">Navigate</p>
               <h2 className="text-2xl md:text-3xl font-bold">Your Educational <br /> Adventure</h2>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white md:text-right"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 italic">
              Embracing <br /> The World
            </h1>
            <div className="mt-8">
               <p className="text-orange-400 font-bold uppercase tracking-widest text-sm mb-2">Explore now</p>
               <h2 className="text-2xl md:text-3xl font-bold">Student Exchange <br /> Program</h2>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,-1.1,1200,16.29V0Z" fill="#FFCC00" opacity=".2"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#FFCC00" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFCC00"></path>
        </svg>
      </div>
    </section>
  )
}
