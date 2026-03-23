import mongoose from 'mongoose';

const ProgrammeCategorySchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true }, // e.g., "Under Graduate"
  order: { type: Number, default: 0 } // Taaki tum decide kar sako pehle kaunsa type dikhega
}, { timestamps: true });

export default mongoose.models.ProgrammeCategory || mongoose.model('ProgrammeCategory', ProgrammeCategorySchema);