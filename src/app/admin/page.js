import MediaUploader from '@/components/admin/MediaUploader';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test Image Upload</h1>
      
      {/* Test karne ke liye component call kiya */}
      <MediaUploader category="Program" />
      
    </div>
  );
}