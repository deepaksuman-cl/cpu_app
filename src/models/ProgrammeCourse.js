import mongoose from 'mongoose';

const ProgrammeCourseSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Engineering"
  school: { type: String, required: true }, // e.g., "School of Engineering & Technology"
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProgrammeCategory', required: true }, // Type se connection
  icon: { type: String, required: true }, // e.g., "Monitor"
  colorHex: { type: String, required: true }, // e.g., "#e53e3e"
  iconBg: { type: String }, // e.g., "bg-red-50"
  textColor: { type: String }, // e.g., "text-red-600"
  borderHover: { type: String }, // e.g., "hover:border-red-300"
  programs: { type: String }, // Now stores Rich Text HTML
  detailsSlug: { type: String, default: '#' }, // Slug for 'View Details'
  badge: {
    label: { type: String }, 
    bgHex: { type: String, default: '#fee2e2' }, // e.g., "#fee2e2" (red-50)
    textHex: { type: String, default: '#dc2626' } // e.g., "#dc2626" (red-600)
  }
}, { timestamps: true });

export default mongoose.models.ProgrammeCourse || mongoose.model('ProgrammeCourse', ProgrammeCourseSchema);