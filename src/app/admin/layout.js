// File: src/app/admin/layout.js
'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import '@/app/globals.css';

export default function AdminLayout({ children }) {
  // Atlas States
  const [isPinned, setIsPinned] = useState(true); // Sidebar locked/expanded hai ya nahi
  const [isHovered, setIsHovered] = useState(false); // Collapsed me hover kiya hai ya nahi
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Screen size detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsPinned(false);
      } else {
        setIsMobile(false);
        setIsPinned(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // MAGIC: Calculate margins based on state
  // Agar pinned hai toh 260px jagah lega, warna sirf 72px. Hover hone pe content shift nahi hoga (overlay banega).
  const contentMargin = isMobile ? '0px' : (isPinned ? '260px' : '72px');

  return (
    <html lang="en">
      <body className="bg-[#f4f4f5] antialiased text-gray-900 overflow-x-hidden">
        <div className="flex min-h-screen">
          
          <AdminSidebar 
            isPinned={isPinned} 
            setIsPinned={setIsPinned}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            isMobile={isMobile}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          {/* MAIN CONTENT AREA - Smooth transform */}
          <div 
            className="flex-1 flex flex-col transition-all duration-300 ease-in-out min-h-screen relative"
            style={{ marginLeft: contentMargin }}
          >
            <AdminTopbar toggleMobileSidebar={() => setMobileMenuOpen(!mobileMenuOpen)} />
            
            <main className="flex-1 p-6 lg:p-8 overflow-auto bg-white">
              {children}
            </main>
          </div>

          {/* Mobile Backdrop */}
          {isMobile && mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </div>
      </body>
    </html>
  );
}