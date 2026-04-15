'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import AboutHeader from '@/components/landing/tentang/about-header'
import { FileDown, Award, Search, BookOpen, X, Eye } from 'lucide-react'
import { Poppins } from 'next/font/google'
import KuliahdiUibView from './view/KuliahdiUibView'




export default function KuliahdiUIB() {
        
  return <KuliahdiUibView />
   
}