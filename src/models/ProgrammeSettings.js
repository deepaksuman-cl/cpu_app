import mongoose from 'mongoose';

const ProgrammeSettingsSchema = new mongoose.Schema({
  // Global Metadata
  metaTitle: { type: String, default: "Programmes | Career Point University" },
  metaDescription: { type: String, default: "Explore our world-class Diploma, UG, PG, and Doctoral programmes." },

  // Breadcrumbs Array
  breadcrumbs: [{
    label: { type: String },
    link: { type: String }
  }],

  // Sidebar CTA Box
  sidebarCta: {
    icon: { type: String, default: "GraduationCap" },
    title: { type: String, default: "Need Guidance?" },
    description: { type: String, default: "Talk to our admissions counsellor for personalised guidance." },
    buttonText: { type: String, default: "Book Free Counselling" },
    buttonLink: { type: String, default: "/contact" }
  },

  // Main Bottom CTA Banner
  mainCta: {
    icon: { type: String, default: "TrendingUp" },
    badgeText: { type: String, default: "Admissions 2025–26 Open" },
    title: { type: String, default: "Start Your Academic Journey Today" },
    description: { type: String, default: "Limited seats available. Apply before 30th June 2025." },
    primaryBtnText: { type: String, default: "Apply Now" },
    primaryBtnLink: { type: String, default: "/apply" },
    secondaryBtnText: { type: String, default: "Download Brochure" },
    secondaryBtnLink: { type: String, default: "/brochure" }
  }
}, { timestamps: true });

export default mongoose.models.ProgrammeSettings || mongoose.model('ProgrammeSettings', ProgrammeSettingsSchema);
