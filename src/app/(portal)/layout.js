export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "../../components/layout/Footer";
import HeaderServer from '../../components/layout/HeaderServer';
import Breadcrumb from "@/components/ui/Breadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Career Point University, Kota | Top Private University in Rajasthan",
  description:
    "Career Point University, Kota is a leading private university in Rajasthan offering world-class education in Engineering, Management, Computer Science, Pharmacy, and more. Explore innovative programs, modern infrastructure, and excellent placement opportunities.",
  keywords: [
    "Career Point University",
    "CPU Kota",
    "University in Kota",
    "Top Private University in Rajasthan",
    "Engineering College in Kota",
    "Management Courses in Kota",
    "Computer Science University Rajasthan"
  ],
  authors: [{ name: "Career Point University" }],
  creator: "Career Point University",
  openGraph: {
    title: "Career Point University, Kota",
    description:
      "Explore Career Point University, Kota — a hub of innovation, research, and academic excellence in Rajasthan.",
    url: "https://careerpointuniversity.ac.in",
    siteName: "Career Point University",
    locale: "en_IN",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  return (
  
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeaderServer /> 
        
        <main className="pt-[64px] lg:pt-[112px]">
          <Breadcrumb />
          {children}
        </main>

        <Footer />
      </div>

  );
}
