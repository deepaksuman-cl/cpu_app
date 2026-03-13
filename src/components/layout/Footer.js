"use client";
import { ArrowRight, MapPin, Phone, Mail, ExternalLink, GraduationCap, ChevronRight, Facebook, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import FOOTER_DATA from "../../data/footer.json";

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

export default function Footer() {
  const G = "#ffb900"; // Gold
  const DK = "#001428"; // Dark

  return (
    <>
      <footer className="pt-20 border-t-4 relative overflow-hidden" style={{ borderColor: G, background: DK }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none opacity-20" style={{ background: G }} />
        <div className="max-w-7xl mx-auto px-4 pb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <img src={FOOTER_DATA.logo} alt="CPU Logo" className="w-[80%]" />
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                {FOOTER_DATA.aboutText}
              </p>
              <div className="flex gap-4">
                {FOOTER_DATA.socialLinks.map((link, i) => {
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

            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-4 h-1 rounded flex-shrink-0" style={{ background: G }}></span> Quick Links
              </h3>
              <ul className="space-y-4 text-sm" style={{ color: "#94a3b8" }}>
                {FOOTER_DATA.quickLinks.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="flex items-center gap-2 hover:text-white transition-colors group">
                      <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" style={{ color: G }} />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-4 h-1 rounded flex-shrink-0" style={{ background: G }}></span> Programs
              </h3>
              <ul className="space-y-4 text-sm" style={{ color: "#94a3b8" }}>
                {FOOTER_DATA.programs.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="flex items-center gap-2 hover:text-white transition-colors group">
                      <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" style={{ color: G }} />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-4 h-1 rounded flex-shrink-0" style={{ background: G }}></span> Contact
              </h3>
              <ul className="space-y-5 text-sm" style={{ color: "#94a3b8" }}>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,185,0,0.1)", color: G }}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="mt-1">{FOOTER_DATA.contact.address}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,185,0,0.1)", color: G }}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{FOOTER_DATA.contact.phone}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,185,0,0.1)", color: G }}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{FOOTER_DATA.contact.email}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            style={{ borderColor: "rgba(255,255,255,0.05)", color: "#64748b" }}>
            <p>{FOOTER_DATA.copyright.text}</p>
            <div className="flex gap-6">
              {FOOTER_DATA.copyright.links.map((link, i) => (
                <a key={i} href={link.url} className="hover:text-white transition-colors">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[9999]">
        {FOOTER_DATA.floatingButtons.map((btn, i) => {
          const Icon = IconMap[btn.icon];
          return (
            <a key={i} href={btn.url} className="w-14 h-14 rounded-full flex justify-center items-center shadow-2xl transition hover:scale-110" style={{ backgroundColor: btn.color }}>
              {Icon && <Icon size={24} className="text-white"/>}
            </a>
          );
        })}
      </div>
    </>
  );
}
