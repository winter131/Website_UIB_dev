import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
})

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return (
        // Memastikan font Poppins diterapkan secara konsisten seperti di Landing
        <div className={`${poppins.className} font-normal antialiased text-[#333]`}>
            {children}
        </div>
    )
}
