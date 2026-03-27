import { ChevronRight, Facebook, GraduationCap, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { getFooter } from "@/lib/actions/footerActions";
import Link from 'next/link';

const IconMap = {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  GraduationCap
};

export default async function Footer() {
  const result = await getFooter();
  const FOOTER_DATA = result.data;

  // Colors
  const G = FOOTER_DATA.colors?.primary || "#ffb900"; // Gold
  const DK = FOOTER_DATA.colors?.background || "#001428"; // Dark

  return (
    <>
      <footer className="pt-20 border-t-4 relative overflow-hidden" style={{ borderColor: G, background: DK }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none opacity-20" style={{ background: G }} />
        <div className="max-w-7xl mx-auto px-4 pb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Branding Column */}
            <div className="space-y-6 lg:col-span-1">
              <img src={FOOTER_DATA?.logo} alt="CPU Logo" className="w-[80%]" />
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                {FOOTER_DATA?.aboutText}
              </p>
              <div className="flex gap-4">
                {FOOTER_DATA?.socialLinks?.map((link, i) => {
                  const Icon = IconMap[link.icon];
                  return (
                    <a key={i} href={link.url} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                      style={{ background: "rgba(255,255,255,0.05)", color: "white" }}>
                      {Icon && <Icon className="w-4 h-4" />}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Columns */}
            {FOOTER_DATA?.columns?.sort((a,b)=> a.order - b.order).map((col, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-4 h-1 rounded flex-shrink-0" style={{ background: G }}></span> {col.title}
                </h3>
                
                {col.columnType === 'links' && (
                  <ul className="space-y-4 text-sm" style={{ color: "#94a3b8" }}>
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link href={link.url} className="flex items-center gap-2 hover:text-white transition-colors group">
                          <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" style={{ color: G }} />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {col.columnType === 'contact' && (
                  <ul className="space-y-5 text-sm" style={{ color: "#94a3b8" }}>
                    {FOOTER_DATA.contact?.map((item, cIdx) => {
                      const CIcon = IconMap[item.icon] || MapPin;
                      return (
                        <li key={cIdx} className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,185,0,0.1)", color: G }}>
                            <CIcon className="w-4 h-4" />
                          </div>
                          <div className="mt-1 flex flex-col">
                            {item.label && <span className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">{item.label}</span>}
                            <span>{item.text}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {col.columnType === 'text' && (
                  <div className="text-sm prose prose-invert max-w-none" style={{ color: "#94a3b8" }} dangerouslySetInnerHTML={{ __html: col.content }} />
                )}
              </div>
            ))}

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ borderColor: "rgba(255,255,255,0.05)", color: "#64748b" }}>
            <p>{FOOTER_DATA?.copyright?.text}</p>
            <div className="flex gap-6">
              {FOOTER_DATA?.copyright?.links?.map((link, i) => (
                <Link key={i} href={link.url} className="hover:text-white transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
