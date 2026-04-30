import React from 'react'

export default function PartnersSection() {
  const partners = [
    '/logo/partner-1.png',
    '/logo/partner-2.png',
    '/logo/partner-3.png',
    '/logo/partner-4.png',
    '/logo/partner-5.png',
  ]

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-24">
        <div className="bg-[#1A365D] text-white py-3 px-8 rounded-t-xl inline-block font-bold">
           International Partners
        </div>
        <div className="border-t-4 border-[#1A365D] pt-12">
          <div className="flex flex-wrap items-center justify-center gap-12 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            {partners.map((logo, i) => (
              <img key={i} src={logo} alt="Partner" className="h-16 w-auto object-contain" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
