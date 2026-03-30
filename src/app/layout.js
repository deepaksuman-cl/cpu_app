import NextAuthProvider from '@/components/Providers';
import NextTopLoader from 'nextjs-toploader';
import './globals.css'; // 🔥 Ye line tumhari website mein Tailwind CSS layegi

export const metadata = {
  title: 'Career Point University Admin',
  description: 'Admin dashboard for CPU',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body> tag hona zaroori hai error hatane ke liye */}
      <body className="min-h-screen bg-gray-100 antialiased">
 <NextTopLoader
  color="linear-gradient(90deg, #00c6ff, #0072ff, #00c6ff)" // Blue gradient shine
  initialPosition={0.04}
  crawlSpeed={160}
  height={4}
  crawl={true}
  showSpinner={false}
  easing="cubic-bezier(0.4, 0, 0.2, 1)" // super smooth
  speed={280}
  shadow="0 0 10px rgba(0,198,255,0.8), 0 0 25px rgba(0,114,255,0.6)"
  zIndex={9999}
/>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}