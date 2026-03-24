import Footer from '../src/models/Footer.js';
import fs from 'fs';
import path from 'path';

const runFix = async () => {
  try {
    const footerPath = path.join(process.cwd(), 'src', 'data', 'footer.json');
    const defaultFooterData = JSON.parse(fs.readFileSync(footerPath, 'utf8'));

    // Clear corrupted/wrongly seeded data
    await Footer.destroy({ where: {}, truncate: false });

    const mappedData = {
      logo: defaultFooterData.logo,
      aboutText: defaultFooterData.aboutText,
      colors: defaultFooterData.colors,
      socialLinks: defaultFooterData.socialLinks,
      copyright: defaultFooterData.copyright,
      floatingButtons: defaultFooterData.floatingButtons,
      seo: defaultFooterData.seo,
      columns: [
        {
          title: 'Quick Links',
          columnType: 'links',
          links: defaultFooterData.quickLinks?.map(label => ({ label, url: '#' })) || [],
          order: 1
        },
        {
          title: 'Programs',
          columnType: 'links',
          links: defaultFooterData.programs?.map(label => ({ label, url: '#' })) || [],
          order: 2
        },
        {
          title: 'Contact',
          columnType: 'contact',
          links: [],
          order: 3
        }
      ],
      contact: [
        { label: 'Address', text: defaultFooterData.contact?.address, icon: 'MapPin' },
        { label: 'Phone', text: defaultFooterData.contact?.phone, icon: 'Phone' },
        { label: 'Email', text: defaultFooterData.contact?.email, icon: 'Mail' }
      ]
    };

    const seeded = await Footer.create(mappedData);
    console.log('✅ Footer seeded correctly with ID:', seeded.id);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing footer seed:', error);
    process.exit(1);
  }
};

runFix();
