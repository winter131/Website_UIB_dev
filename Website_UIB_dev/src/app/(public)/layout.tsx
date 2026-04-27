import { Poppins } from 'next/font/google'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-poppins', 
})

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.className} font-normal antialiased text-[#333] min-h-screen flex flex-col`}>
      <NavbarLanding />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  )
}