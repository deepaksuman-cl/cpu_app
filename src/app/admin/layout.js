// File: src/app/admin/layout.js
import '@/app/globals.css'; // Ensure ye path tumhari global CSS se match kare
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export const metadata = {
  title: 'Admin Dashboard | CPU',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      {/* bg-gray-50 body pe lagane se pura admin panel clean dikhega */}
      <body className="bg-gray-50 antialiased text-gray-900">
        <div className="flex min-h-screen">
          {/* Left Sidebar (Fixed) */}
          <AdminSidebar />

          {/* Main Content Area (Shifted right by the width of the sidebar) */}
          <div className="flex-1 ml-64 flex flex-col">
            <AdminTopbar />
            
            {/* Dynamic Page Content */}
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}