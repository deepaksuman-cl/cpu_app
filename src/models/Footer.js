import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  label: String,
  url: String
}, { _id: false });

const SocialLinkSchema = new mongoose.Schema({
  icon: String,
  url: String
}, { _id: false });

const FooterColumnSchema = new mongoose.Schema({
  title: String,
  columnType: { 
    type: String, 
    enum: ['links', 'contact', 'text', 'custom_grid'], 
    default: 'links' 
  },
  links: [LinkSchema],
  content: String,
  order: { type: Number, default: 0 }
}, { _id: false });

const FloatingButtonSchema = new mongoose.Schema({
  btnType: String,
  icon: String,
  url: String,
  color: String,
  isActive: { type: Boolean, default: true }
}, { _id: false });

const ContactItemSchema = new mongoose.Schema({
  icon: { type: String, default: 'MapPin' },
  text: String,
  label: String // e.g. "Address", "Phone"
}, { _id: false });

const FooterSchema = new mongoose.Schema({
  logo: String,
  aboutText: String,
  colors: {
    primary: String,
    background: String
  },
  socialLinks: [SocialLinkSchema],
  columns: [FooterColumnSchema],
  contact: [ContactItemSchema],
  copyright: {
    text: String,
    links: [LinkSchema]
  },
  floatingButtons: [FloatingButtonSchema],
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String
  }
}, { timestamps: true });

// Force re-compile to pick up schema changes in development
if (mongoose.models.Footer) {
  delete mongoose.models.Footer;
}

const Footer = mongoose.model('Footer', FooterSchema);

export default Footer;
