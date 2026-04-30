import React from 'react'

export default function ScholarshipSection() {
  const scholarships = [
    { label: '3 + 2', sub: 'Programs', img: '/img/sch-1.jpg' },
    { label: '2 + 2', sub: 'Programs', img: '/img/sch-2.jpg' },
    { label: '1 + 1', sub: 'Programs', img: '/img/sch-3.jpg' },
  ]

  const additional = [
    { label: 'Global Youth', sub: 'Scholarship', img: '/img/sch-4.jpg' },
    { label: 'BIPA', sub: 'Programs', img: '/img/sch-5.jpg' },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-24 text-center">
        <span className="text-blue-900 font-bold uppercase tracking-widest text-sm border-b-2 border-orange-500 pb-1">Scholarship</span>
        <h2 className="text-3xl font-bold text-blue-900 mt-6 mb-12 max-w-2xl mx-auto">
          Universitas Internasional Batam Have Many Scholarship for Foreign Student
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {scholarships.map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg h-[250px]">
              <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-lg shadow-md text-center">
                <p className="text-xl font-bold text-blue-900">{item.label}</p>
                <p className="text-[10px] uppercase font-bold text-orange-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {additional.map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg h-[250px]">
              <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-lg shadow-md text-center">
                <p className="text-xl font-bold text-blue-900">{item.label}</p>
                <p className="text-[10px] uppercase font-bold text-orange-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
