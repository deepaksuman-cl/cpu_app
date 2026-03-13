export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout min-h-screen bg-gray-50 flex flex-col">
      {/* Placeholder for future admin navigation/sidebar */}
      <header className="bg-white shadow p-4">
        <h2 className="text-xl font-semibold">Admin Portal</h2>
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
