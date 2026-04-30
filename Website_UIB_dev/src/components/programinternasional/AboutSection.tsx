import React from 'react'

export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-900 font-bold uppercase tracking-widest text-sm border-b-2 border-orange-500 pb-1">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-6 mb-8 leading-tight">
              Welcome to the <br /> Universitas Internasional Batam
            </h2>
            <div className="text-gray-600 space-y-6 text-[15px] leading-relaxed">
              <p>
                Established in 2000, UIB is a newly private university but it has tremendous potential. Located in Batam City, by the borders of Singapore and Malaysia, UIB has its own campus with exceptionally adequate infrastructure to support excellent teaching and learning process, such as library, laboratories, sports hall, dormitory, etc. UIB maintains departments with high-quality standards research activities, community service and worthy international collaboration in accordance with the vision and mission of UIB.
              </p>
            </div>
            <button className="mt-10 bg-[#FFCC00] text-blue-900 font-bold px-8 py-3 rounded-md hover:bg-orange-500 hover:text-white transition-all shadow-md">
              Read More
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="/img/intl-about-1.jpg" alt="UIB 1" className="rounded-xl shadow-md w-full h-[200px] object-cover" />
              <img src="/img/intl-about-2.jpg" alt="UIB 2" className="rounded-xl shadow-md w-full h-[150px] object-cover" />
            </div>
            <div className="space-y-4 pt-8">
              <img src="/img/intl-about-3.jpg" alt="UIB 3" className="rounded-xl shadow-md w-full h-[150px] object-cover" />
              <img src="/img/intl-about-4.jpg" alt="UIB 4" className="rounded-xl shadow-md w-full h-[200px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
