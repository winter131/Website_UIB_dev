'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import AboutHeader from '@/components/landing/tentang/about-header'
import { FileDown, Award, Search, BookOpen, X, Eye } from 'lucide-react'
import { Poppins } from 'next/font/google'

const accreditationData = [
  {
    faculty: "Akreditasi Universitas",
    programs: [
      { no: 1, prodi: 'Universitas', akreditasi: 'Unggul', fileUrl: '/akreditasi/Sertifikat-Akreditasi-APT-UIB-2025.pdf', masaBerlaku: '15 Okt 2030' },
    ]
  },
  {
    faculty: "Fakultas Ilmu Hukum",
    programs: [
      { no: 1, prodi: 'Ilmu Hukum', akreditasi: 'Unggul', fileUrl: '/akreditasi/ilmu hukum akreditasi.webp', masaBerlaku: '28 Des 2027' },
      { no: 2, prodi: 'Magister Hukum', akreditasi: 'Unggul', fileUrl: '/akreditasi/magister hukum akreditasi.pdf', masaBerlaku: '01 Mei 2029' },
    ]
  },
  {
    faculty: "Fakultas Bisnis dan Manajemen",
    programs: [
      { no: 1, prodi: 'Magister Manajemen', akreditasi: 'Unggul', fileUrl: '/akreditasi/magister manajemen akreditasi.webp', masaBerlaku: '04 Jul 2030' },
      { no: 2, prodi: 'Manajemen', akreditasi: 'Unggul', fileUrl: '/akreditasi/manajemen akreditasi.pdf', masaBerlaku: '02 Agust 2028' },
      { no: 3, prodi: 'Akuntansi', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/akuntansi akreditasi.webp', masaBerlaku: '31 Agust 2028' },
      { no: 4, prodi: 'Pariwisata', akreditasi: 'B', fileUrl: '/akreditasi/pariwisata akreditasi.webp', masaBerlaku: '03 Nov 2025' }
    ]
  },
  {
    faculty: "Fakultas Ilmu Komputer",
    programs: [
      { no: 1, prodi: 'Sistem Informasi', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/sistem informasi akreditasi.webp', masaBerlaku: '14 Apr 2028' },
      { no: 2, prodi: 'Teknologi Informasi', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/teknologi informasi akreditasi.webp', masaBerlaku: '18 Agust 2030' },
    ]
  },
   {
    faculty: "Fakultas Teknik Sipil dan Perencanaan",
    programs: [
      { no: 1, prodi: 'Teknik Sipil', akreditasi: 'Unggul', fileUrl: '/akreditasi/teknik sipil akreditasi.webp', masaBerlaku: '20 Apr 2028' },
      { no: 2, prodi: 'Arsitektur', akreditasi: 'Baik', fileUrl: '/akreditasi/arsitektur akreditasi.webp', masaBerlaku: '16 Feb 2026' },
    ]
  },
  {
    faculty: "Fakultas Pendidikan",
    programs: [
      { no: 1, prodi: 'Pendidikan Bahasa Inggris', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/pbi akreditasi.pdf', masaBerlaku: '20 Apr 2028' },
    ]
  },
     {
    faculty: "Fakultas Kesehatan dan Sains",
    programs: [
      { no: 1, prodi: 'Biologi', akreditasi: 'Baik', fileUrl: '/akreditasi/biologi akreditasi.pdf', masaBerlaku: '21 Mei 2027' },
      { no: 2, prodi: 'Gizi', akreditasi: 'Baik', fileUrl: '/akreditasi/gizi akreditasi.pdf', masaBerlaku: '28 Mei 2027' },
    ]
  },
   {
    faculty: "Fakultas Kedokteran",
    programs: [
      { no: 1, prodi: 'Kedokteran Program Sarjana', akreditasi: 'Pertama', fileUrl: '/akreditasi/sarjana kedokteran akreditasi.pdf', masaBerlaku: '21 Mei 2027' },
      { no: 2, prodi: 'Pendidikan Profesi Dokter Program Profesi', akreditasi: 'Pertama', fileUrl: '/akreditasi/profesi kedokteran akreditasi.pdf', masaBerlaku: '28 Mei 2027' },
    ]
  },
]

export default function AkreditasiView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [previewFile, setPreviewFile] = useState<string | null>(null)

  // Menutup modal dengan tombol Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewFile(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const filteredData = accreditationData.map(facultyGroup => ({
    ...facultyGroup,
    programs: facultyGroup.programs.filter(program =>
      program.prodi.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(facultyGroup => facultyGroup.programs.length > 0)

  const isImage = (url: string) => /\.(webp|jpg|jpeg|png)$/i.test(url)

  return (
    <main className="min-h-screen bg-white font-poppins relative">
      <NavbarLanding />
      <AboutHeader title="Akreditasi" />
      
      <section className="py-12 bg-gradient-to-b from-transparent to-[#eceeee]">
        <div className="container mx-auto px-6 md:px-20">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#1a365d] p-2.5 rounded-lg shadow-md">
                <Award className="text-white w-6 h-6" />
              </div>
              <h2 className="text-[#1a365d] text-xl md:text-2xl font-bold tracking-tight pop">
                Peringkat Akreditasi Prodi
              </h2>
            </div>

            <div className="relative w-full md:w-80 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400 group-focus-within:text-[#1a365d] transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari program studi..."
                className="block w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1a365d]/20 outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-12 min-h-[400px]">
            {filteredData.length > 0 ? (
              filteredData.map((facultyGroup, fIdx) => (
                <div key={fIdx} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-2 mb-4 border-l-4 border-[#f6a623] pl-3">
                    <BookOpen size={18} className="text-[#1a365d]" />
                    <h3 className="text-[#1a365d] font-extrabold text-sm md:text-base uppercase tracking-wider">
                      {facultyGroup.faculty}
                    </h3>
                  </div>

                  <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-[#1a365d] text-white font-semibold text-[10px] uppercase tracking-widest">
                            <th className="py-3.5 px-4 text-center w-12">No</th>
                            <th className="py-3.5 px-4">Program Studi</th>
                            <th className="py-3.5 px-4 text-center">Akreditasi</th>
                            <th className="py-3.5 px-4 text-center">Sertifikat</th>
                            <th className="py-3.5 px-4 text-center">Masa Berlaku</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {facultyGroup.programs.map((item, pIdx) => (
                            <tr key={pIdx} className="hover:bg-blue-50/30 transition-colors group">
                              <td className="py-4 px-4 text-center text-gray-400 text-xs font-medium">{item.no}</td>
                              <td className="py-4 px-4">
                                <span className="text-[#1a365d] font-bold block group-hover:translate-x-1 transition-transform">{item.prodi}</span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <span className="inline-block px-3 py-1 bg-[#f6a623]/10 text-[#f6a623] text-[9px] font-extrabold rounded-full border border-[#f6a623]/20 uppercase">
                                  {item.akreditasi}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button 
                                  onClick={() => setPreviewFile(item.fileUrl)}
                                  className="inline-flex items-center gap-2 bg-[#1a365d] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-[#0d213d] shadow active:scale-95"
                                >
                                  <Eye size={12} /> LIHAT
                                </button>
                              </td>
                              <td className="py-4 px-4 text-center text-gray-500 text-[11px] font-semibold">{item.masaBerlaku}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Search size={40} className="mb-4 opacity-20" />
                <p className="text-lg font-bold">Program studi tidak ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- MODAL PREVIEW FIXED --- */}
      {previewFile && (
        <div 
          onClick={() => setPreviewFile(null)} // Klik di area hitam untuk tutup
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} // Klik di dalam kotak putih tidak menutup modal
            className="relative bg-white w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl cursor-default"
          >
            {/* Header Modal */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
              <h4 className="text-[#1a365d] font-bold text-sm uppercase tracking-tight">Pratinjau Sertifikat</h4>
              <div className="flex items-center gap-2">
                <a href={previewFile} download className="p-2 text-gray-500 hover:text-[#1a365d] transition-all" title="Download">
                  <FileDown size={20} />
                </a>
                <button 
                  onClick={() => setPreviewFile(null)} 
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                >
                  <X size={28} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Konten Preview */}
            <div className="flex-1 bg-gray-200 overflow-auto p-4 md:p-8 flex justify-center items-center">
              {isImage(previewFile) ? (
                <img src={previewFile} alt="Sertifikat" className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" />
              ) : (
                <iframe src={`${previewFile}#toolbar=0`} className="w-full h-full rounded-md shadow-inner bg-white border-none" title="PDF Preview" />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}