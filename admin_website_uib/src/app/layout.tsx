import './globals.css';
import './editor-theme.css';
import Link from 'next/link';
import Header from '@/components/Header';
import Notifikasi from '@/components/Notifikasi';
import ConfirmationBox from '@/components/ConfirmationBox';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex h-screen bg-gray-50">
        <Notifikasi />
        <ConfirmationBox />
        
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="p-6 text-2xl font-bold tracking-wider border-b border-slate-800">
            UIB Admin
          </div>
          <nav className="flex-1 p-4 flex flex-col gap-2">
            <Link href="/" className="px-4 py-2 hover:bg-slate-800 rounded-md transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/berita" className="px-4 py-2 hover:bg-slate-800 rounded-md transition-colors font-medium">
              News Management
            </Link>
            <Link href="/artikel" className="px-4 py-2 hover:bg-slate-800 rounded-md transition-colors font-medium">
              Article Management
            </Link>
            <Link href="/prestasi" className="px-4 py-2 hover:bg-slate-800 rounded-md transition-colors font-medium">
              Prestasi Management
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white shadow-sm flex items-center px-8 shrink-0">
            <h2 className="text-xl font-semibold text-gray-800">Control Panel</h2>
          </header>
          <div className="flex-1 overflow-auto p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
