'use client'
import React, { useEffect, useState } from 'react'
import PrestasiForm from '../../view/PrestasiForm'
import { useParams } from 'next/navigation'
import { getNewsById } from '@/actions/newsActions'

export default function EditPrestasi() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  const fetchData = async () => {
    const item = await getNewsById(id as string)
    setData(item)
    setLoading(false)
  }

  if (loading) return <div className="p-10 text-center text-gray-400">Loading data...</div>
  if (!data) return <div className="p-10 text-center text-red-400">Data tidak ditemukan.</div>

  return <PrestasiForm initialData={data} isEdit={true} />
}
