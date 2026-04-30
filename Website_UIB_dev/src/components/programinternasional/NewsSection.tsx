import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export default function NewsSection() {
  const news = [
    { 
      title: 'UIB Explores International Collaboration in Mental Health with Asian Pastoral Institute Singapore', 
      img: '/img/intl-news-1.jpg' 
    },
    { 
      title: 'Urban Insight Architecture Field Study and Academic Exchange UIB x UTHM 2019 Strengthens Global Academic', 
      img: '/img/intl-news-2.jpg' 
    },
    { 
      title: 'Monitoring and Evaluation Gathering and Tour with International Students Strengthens Community Bond at UIB', 
      img: '/img/intl-news-3.jpg' 
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-24 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-12">Latest News</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {news.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl h-56 mb-6">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h4 className="text-[15px] font-bold text-blue-900 leading-snug line-clamp-3 hover:text-orange-500 transition-colors">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

        <button className="mt-12 bg-[#FFCC00] text-blue-900 font-bold px-8 py-3 rounded-md hover:bg-orange-500 hover:text-white transition-all shadow-md">
          Read More
        </button>
      </div>
    </section>
  )
}
