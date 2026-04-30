import { Poppins } from 'next/font/google'
import NavbarInternational from '@/components/programinternasional/NavbarInternational'
import FooterInternational from '@/components/programinternasional/FooterInternational'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-poppins', 
})

export default function InternationalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.className} font-normal antialiased text-[#333] min-h-screen flex flex-col`}>
      <NavbarInternational />
      <div className="flex-grow pt-[110px]">
        {children}
      </div>
      <FooterInternational />
    </div>
  )
}
