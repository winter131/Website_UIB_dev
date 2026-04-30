'use client'
import React from 'react'
import { motion } from 'framer-motion'
import HeroInternational from '@/components/programinternasional/HeroInternational'
import ActionButtons from '@/components/programinternasional/ActionButtons'
import AboutSection from '@/components/programinternasional/AboutSection'
import ScholarshipSection from '@/components/programinternasional/ScholarshipSection'
import VideoSection from '@/components/programinternasional/VideoSection'
import NewsSection from '@/components/programinternasional/NewsSection'
import TestimonialSection from '@/components/programinternasional/TestimonialSection'
import PartnersSection from '@/components/programinternasional/PartnersSection'

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function InternationalPage() {
  const sections = [
    <HeroInternational key="hero" />,
    <ActionButtons key="actions" />,
    <AboutSection key="about" />,
    <ScholarshipSection key="scholarship" />,
    <VideoSection key="video" />,
    <NewsSection key="news" />,
    <TestimonialSection key="testi" />,
    <PartnersSection key="partners" />,
  ]

  return (
    <main className="bg-white overflow-x-hidden">
      {sections.map((Component, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          {Component}
        </motion.div>
      ))}
    </main>
  )
}
