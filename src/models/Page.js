import mongoose from 'mongoose';

const AccordionItemSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String }
});

const ProfileItemSchema = new mongoose.Schema({
  name: { type: String },
  designation: { type: String },
  company: { type: String },
  image: { type: String }
});

const StatsItemSchema = new mongoose.Schema({
  label: { type: String },
  value: { type: String },
  icon: { type: String }
});
const GalleryItemSchema=new mongoose.Schema({
  image: { type: String },
  title: { type: String },
  category: { type: String },
  
});

const BlockSchema = new mongoose.Schema({
  blockType: { 
    type: String, 
    enum: ['RichTextFull', 'SplitLayout', 'Accordion', 'ProfileGrid', 'StatsGrid', 'SingleImage','GalleryBlock'],
    required: true 
  },
  content: { type: String },
  image: { type: String },
  imageHeight: { type: String },
  imageWidth: { type: String },
  isReversed: { type: Boolean, default: false },
  splitConfig: { type: String, default: '50-50' },
  singleImage: { 
    path: String, 
    height: String, 
    width: String, 
    align: { type: String, enum: ['left', 'center', 'right'], default: 'center' } 
  },
  galleryHeading: {
    badge: String,
    title: String,
    highlight: String,
    description: String
  },
  accordionItems: [AccordionItemSchema],
  profileItems: [ProfileItemSchema],
  statsItems: [StatsItemSchema],
  galleryItems: [GalleryItemSchema]
});

const PageSchema = new mongoose.Schema({
  title: { type: String },
  slug: { type: String, unique: true, required: true },
  meta: { 
    title: { type: String }, 
    description: { type: String } 
  },
  hero: { 
    title: { type: String }, 
    bgImage: { type: String }, 
    badge: { type: String } 
  },
  blocks: [BlockSchema]
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
export default Page;
