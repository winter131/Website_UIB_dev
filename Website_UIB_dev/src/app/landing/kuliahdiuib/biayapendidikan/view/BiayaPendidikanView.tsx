'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { Landmark, GraduationCap, ArrowRight, ChevronRight, Globe, ArrowUpRight } from 'lucide-react'
import { relative } from 'path'



export default function KuliahdiUibView() {
  return (
    <main className="min-h-screen" style={{ background: '#f4f5f7' }}>
      

      <NavbarLanding />

    

      <Footer />
    </main>
  )
}