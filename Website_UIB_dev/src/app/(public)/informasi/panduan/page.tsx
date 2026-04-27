'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'


import AboutHeader from '@/components/landing/tentang/about-header'
import { FileDown, Award, Search, BookOpen, X, Eye } from 'lucide-react'
import { Poppins } from 'next/font/google'
import PanduanView from './view/panduanview'


export default function Panduan() {

    return <PanduanView />

}