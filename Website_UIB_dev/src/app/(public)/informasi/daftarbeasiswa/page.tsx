'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'


import AboutHeader from '@/components/landing/tentang/about-header'
import { FileDown, Award, Search, BookOpen, X, Eye } from 'lucide-react'
import { Poppins } from 'next/font/google'
import DaftarBeasiswaView from './view/DaftarBeasiswaView'
import { Metadata } from 'next'


export default function DaftarBeasiswaPage() {
    return <DaftarBeasiswaView />
}