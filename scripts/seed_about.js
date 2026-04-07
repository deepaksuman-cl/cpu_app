require('dotenv').config();
const { AboutPageContent } = require('../src/models');

const mainAboutData = {
  group: {
    tagline: "Three Decades of Excellence",
    heading: "Shaping Futures,\nBuilding Excellence",
    description: "Career Point Group has been developing great minds for more than three decades. Continuing the tradition of excellence in delivering quality education and to push forward the boundaries of knowledge to positively impact people's lives, we started universities at Kota and Hamirpur.",
    highlight: "Our Universities are having state-of-the-art infrastructure, best academic facilities and experienced faculty to help you to realise your full potential. We follow time-tested internationally acclaimed credit based system. All our courses are designed to provide you excellent learning, requisite expertise, rewarding qualification, practical exposure, hands-on learning and desired skills for a successful career."
  },
  stats: [
    { icon: "GraduationCap", label: "Years of Excellence", value: "30+" },
    { icon: "Users", label: "Students Enrolled", value: "50K+" },
    { icon: "BookOpen", label: "Programmes Offered", value: "200+" },
    { icon: "Award", label: "Industry Partners", value: "500+" }
  ],
  universities: [
    {
      id: "kota",
      name: "Career Point University",
      location: "Kota (Rajasthan)",
      established: "2012",
      campus: "50 Acres",
      image: "https://cpur.in/api/media/media/1775474758951-4mnj2-cpu-kota.png",
      website: "www.cpur.in",
      websiteUrl: "https://www.cpur.in",
      description: "Campus is spread over 50 acres and situated in the education city of Kota in the state of Rajasthan. It was established in 2012 by the Rajasthan State Legislature Council 'Career Point University Act'. It is the government-recognized university with the right to confer degrees as per sec 2 (f) and 22(f) of the UGC Act, 1956.",
      highlights: [
        "Government Recognized University",
        "UGC Act Sec 2(f) & 22(f) Approved",
        "State-of-the-art Infrastructure",
        "Situated in Education Hub of India"
      ],
      color: "kota"
    },
    {
      id: "hamirpur",
      name: "Career Point University",
      location: "Hamirpur (Himachal Pradesh)",
      established: "2012",
      campus: "30 Acres",
      image: "https://cpur.in/api/media/media/1775474758954-77mfp-cpur-hamirpur.png",
      website: "www.cpuh.in",
      websiteUrl: "https://www.cpuh.in",
      description: "Campus is spread over 30 acres, surrounded by the lower Himalayas at Hamirpur district in the state of Himachal Pradesh, India. It was established in 2012 by the Himachal Pradesh State Legislature under 'Career Point University Act'. It is the government-recognized university with the right to confer a degree as per sections 2(f) and 22(f) of the UGC Act, 1956.",
      highlights: [
        "Government Recognized University",
        "UGC Act Sec 2(f) & 22(f) Approved",
        "Surrounded by Lower Himalayas",
        "Scenic & Peaceful Learning Environment"
      ],
      color: "hamirpur"
    }
  ],
  accreditation: "Both universities are included in the list of Indian Universities maintained by the University Grant Commission (UGC) and the Association of Indian Universities (AIU)"
};

const ourRootsData = {
  hero: {
    badge: "Providing Quality Education Since 1993",
    title: "Our Roots",
    subtitle: "Career Point Ltd",
    description: "Founded in May 1993 by Mr. Pramod Maheshwari, an IIT-Delhi alumnus, Career Point embarked on its mission in Kota to provide quality education to students preparing for competitive examinations. Starting with just 50 students focused on IIT-JEE preparation, Career Point has grown into a leading educational organization in India.",
    description2: "Today, Career Point offers a comprehensive educational experience, helping thousands of students from various backgrounds achieve their academic goals. Our programs cater to students pursuing formal education as well as those preparing for various entrance exams, ensuring a holistic approach to learning. With over 30 years of dedication, our management and faculty have continuously addressed the evolving challenges in education.",
    description3: "Career Point takes pride in the trust and respect earned from countless students since its inception. As a publicly listed company on the NSE and BSE in India, Career Point Limited remains committed to transparency, excellence, and educational innovation."
  },
  bannerText: "The University is sponsored by the Gopi Bai Foundation and supported by Career Point Ltd, an educational group known for its strong commitment to providing quality education. Career Point has a legacy of over 30 years. Its journey began in May 1993 in Kota with a mission to provide \"Excellent Education and Training to Students from KG to PhD.\" The group supports two universities, five schools (KG to 12th), three residential school campuses, and numerous skill development and coaching institutions across India.",
  stats: [
    { icon: "Calendar", value: "30+", label: "Years of Excellence", desc: "Since 1993", gradient: "from-[#ffb900]/30 to-[#ff8c00]/10" },
    { icon: "Users", value: "50K+", label: "Students Enrolled", desc: "Across India", gradient: "from-cyan-400/30 to-sky-400/10" },
    { icon: "Building2", value: "2", label: "Universities", desc: "Kota & Hamirpur", gradient: "from-emerald-400/30 to-teal-400/10" },
    { icon: "Star", value: "5", label: "Schools KG-12th", desc: "Pan India", gradient: "from-purple-400/30 to-pink-400/10" }
  ],
  institutions_html: "",
  useProse: true
};

const visionMissionData = {
  quote: {
    text: "We have embarked upon a mission that envisions a new dimension in learning."
  },
  vision: {
    tag: "Vision",
    heading: "Where We Are Going",
    icon: "Compass",
    description: "To be a premier educational institution for graduate, and post-graduate studies and research activities by educating leaders of the future."
  },
  mission: {
    tag: "Mission",
    heading: "Why We Are Here",
    icon: "Target",
    items: [
      { id: 1, icon: "Globe", text: "To promote global competitiveness by providing multiple opportunities for excellent education, applied research, academic innovation, and service to humanity." },
      { id: 2, icon: "Link2", text: "To establish value-creating networks and linkages with corporations, industries, educational institutes, and universities of National and international importance." },
      { id: 3, icon: "Brain", text: "To leverage the intellectual capital through research activities and creating knowledge integration platforms in India and abroad." },
      { id: 4, icon: "Shuffle", text: "To synergize activities and institutes through infrastructure sharing, industry interface, faculty, and student exchange programs." }
    ]
  },
  approach: {
    tag: "Approach",
    heading: "How We Achieve It",
    icon: "Lightbulb",
    description: "Pursue excellence and all else shall follow. We aspire to instill the right attitude, values, and vision that will prepare the students for a lifetime of continued learning and leadership in their chosen careers."
  },
  values: {
    tag: "Values",
    heading: "We Believe In",
    icon: "Heart",
    items: [
      { id: 1, icon: "Star", label: "Student Success" },
      { id: 2, icon: "BookOpen", label: "Lifelong Learning" },
      { id: 3, icon: "Shield", label: "Respect, Integrity, Trust, Honesty and Ethical Behaviour" },
      { id: 4, icon: "TrendingUp", label: "Continuous Quality Improvement" },
      { id: 5, icon: "Award", label: "Excellence" }
    ]
  },
  heroChips: [
    { icon: "Globe", label: "Global Reach" },
    { icon: "Award", label: "Excellence Driven" },
    { icon: "Brain", label: "Research Focused" }
  ]
};

async function seed() {
  try {
    await AboutPageContent.upsert({ section_key: 'main_about', content: mainAboutData });
    await AboutPageContent.upsert({ section_key: 'our_roots', content: ourRootsData });
    await AboutPageContent.upsert({ section_key: 'vision_mission', content: visionMissionData });
    console.log('About Page Content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
