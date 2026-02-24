/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // WAJIB: Agar Tailwind bisa membaca class di dalam paket flowbite
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Navy & Oranye sesuai permintaan Anda
        'uib-navy': '#1a365d',
        'uib-orange': '#e67e22',
      },
      borderRadius: {
        'base': '2rem', // Menyesuaikan class 'rounded-base' di kode Anda
      }
    },
  },
  plugins: [
    // WAJIB: Menambahkan fungsi interaktif flowbite
    require("flowbite/plugin"),
  ],
};
export default config;