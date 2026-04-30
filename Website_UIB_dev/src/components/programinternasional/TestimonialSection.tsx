import React from 'react'

export default function TestimonialSection() {
  const testimonials = [
    {
      name: 'Nantakarn Thailand',
      role: 'Student from Thailand',
      img: '/img/testi-1.jpg',
      text: 'I enjoyed learning at UIB because they provided me with skills in using English and Bahasa Indonesia. Also, it gave me opportunities to learn a wide range of knowledge fields through many activities.'
    },
    {
      name: 'Lovina Aguinal',
      role: 'Student Internship and Language Program 2022',
      img: '/img/testi-2.jpg',
      text: 'I had the opportunity to do an internship at the UIB in 2022 as part of my engineering studies. I was lucky enough to have been wonderfully welcomed by a caring and attentive coaching team.'
    },
    {
      name: 'Worapot Noyorn',
      role: 'Student from Thailand',
      img: '/img/testi-3.jpg',
      text: 'Being an international student at Universitas Internasional Batam (UIB) has been an amazing experience for me. From day one, I was welcomed into an inclusive and vibrant environment. The campus provides very supportive facilities.'
    }
  ]

  return (
    <section className="py-24 bg-[#1A365D] text-white">
      <div className="container mx-auto px-4 md:px-24">
        <div className="mb-12">
          <span className="text-orange-400 font-bold uppercase tracking-widest text-sm border-b-2 border-white pb-1">For your information</span>
          <h2 className="text-3xl font-bold mt-6">What Student Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="border border-white/20 p-8 rounded-2xl bg-white/5 backdrop-blur-sm relative group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-orange-400">{item.name}</h4>
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-tight">{item.role}</p>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-gray-200">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
