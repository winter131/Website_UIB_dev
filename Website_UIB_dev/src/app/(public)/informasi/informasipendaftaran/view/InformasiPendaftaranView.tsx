'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import SarjanaPascasarjana from '@/components/landing/informasi/sarjanapascasarjana'
import {
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Monitor,
  Clock,
  Info,
  Globe,
  Mail,
  Phone
} from 'lucide-react'

export default function PendaftaranView() {


  return (
    <main className="min-h-screen bg-white font-poppins text-[#2A3955]">
      <NavbarLanding />
      <SarjanaPascasarjana />
      <Footer />


    </main>
  )
}