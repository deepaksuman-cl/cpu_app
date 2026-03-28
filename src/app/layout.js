import NextAuthProvider from '@/components/Providers';
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
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}