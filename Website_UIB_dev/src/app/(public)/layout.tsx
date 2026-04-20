import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-poppins', 
})

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    // font-normal memastikan teks tidak otomatis bold saat menggunakan Poppins
    <div className={`${poppins.className} font-normal antialiased text-[#333]`}>
      {children}
    </div>
  )
  
}
