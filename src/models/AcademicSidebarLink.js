import mongoose from 'mongoose';

const AcademicSidebarLinkSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., "Testimonials"
  icon: { type: String, required: true }, // e.g., "MessageSquareQuote"
  slug: { type: String, required: true }, // e.g., "/testimonials"
  colorClass: { type: String, required: true }, // e.g., "text-[#00588b] bg-[#00588b]/10"
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.AcademicSidebarLink || mongoose.model('AcademicSidebarLink', AcademicSidebarLinkSchema);