'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Image as ImageIcon, Send } from 'lucide-react'
import Link from 'next/link'
import { createNews, updateNews } from '@/actions/newsActions'

interface PrestasiFormProps {
  initialData?: any
  isEdit?: boolean
}

export default function PrestasiForm({ initialData, isEdit }: PrestasiFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Prestasi',
    tag: initialData?.tag || 'Prestasi',
    summary: initialData?.summary || '',
    description: initialData?.description || '',
    author: initialData?.author || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    image: initialData?.image || '',
    source: initialData?.source || 'Internal UIB',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !isEdit ? { slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') } : {})
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit && initialData?.id) {
        await updateNews(initialData.id, formData)
      } else {
        await createNews(formData)
      }
      router.push('/managemen-prestasi')
      router.refresh()
    } catch (error) {
      console.error("Error saving prestasi:", error)
      alert("Terjadi kesalahan saat menyimpan data.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/managemen-prestasi" 
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#e67e22] hover:border-[#e67e22] transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-[#2A3955]">
            {isEdit ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
          </h1>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-[#e67e22] text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#d35400] transition-all shadow-lg shadow-orange-900/10 disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : (
            <>
              <Save size={18} />
              Simpan Postingan
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Judul Prestasi</label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukkan judul prestasi..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#e67e22] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Slug (URL)</label>
              <input 
                type="text" 
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm text-gray-400 focus:ring-2 focus:ring-[#e67e22] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Ringkasan Singkat</label>
              <textarea 
                name="summary"
                required
                rows={3}
                value={formData.summary}
                onChange={handleChange}
                placeholder="Masukkan ringkasan singkat untuk kartu tampilan..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#e67e22] outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Konten Lengkap</label>
              <textarea 
                name="description"
                required
                rows={12}
                value={formData.description}
                onChange={handleChange}
                placeholder="Tuliskan detail prestasi di sini (mendukung format HTML dasar)..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#e67e22] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Fields */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Gambar Utama (URL)</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/img/prestasi-1.jpg"
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#e67e22] outline-none transition-all"
                />
                <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Kategori</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#e67e22] outline-none transition-all"
                >
                  <option value="Prestasi">Prestasi</option>
                  <option value="Internasional">Internasional</option>
                  <option value="Nasional">Nasional</option>
                  <option value="Regional">Regional</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tanggal</label>
                <input 
                  type="date" 
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#e67e22] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Penulis / Unit</label>
              <input 
                type="text" 
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                placeholder="Contoh: Humas UIB"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#e67e22] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tag (Pisahkan koma)</label>
              <input 
                type="text" 
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="Robotik, AI, Lomba"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#e67e22] outline-none transition-all"
              />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-[#2A3955] p-8 rounded-[2rem] text-white space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Send size={16} className="text-[#e67e22]" />
              SEO Meta Data
            </h3>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Meta Title</label>
              <input 
                type="text" 
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs focus:ring-2 focus:ring-[#e67e22] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Meta Description</label>
              <textarea 
                name="metaDescription"
                rows={3}
                value={formData.metaDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs focus:ring-2 focus:ring-[#e67e22] outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
