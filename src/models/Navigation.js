// File: src/models/Navigation.js
import mongoose from 'mongoose';

const NavigationSchema = new mongoose.Schema(
  {
    documentName: { 
      type: String, 
      required: true, 
      unique: true,
      default: 'main_header' 
    },
    data: { 
      type: mongoose.Schema.Types.Mixed, 
      required: true 
    }
  },
  { timestamps: true }
);

// Next.js me dev mode me model overwrite na ho isliye ye check lagate hain
const Navigation = mongoose.models.Navigation || mongoose.model('Navigation', NavigationSchema);

export default Navigation;