'use server';

import Footer from '@/models/Footer';
import defaultFooterData from '@/data/footer.json';

/**
 * Fetches the global footer configuration.
 * Always returns a valid structure, falling back to JSON if DB is empty.
 */
export async function getFooter() {
  try {
    const footer = await Footer.findOne();
    
    if (!footer) {
      // Fallback to static JSON but transform it to match the structured schema
      const mappedData = {
        ...defaultFooterData,
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
      delete mappedData.quickLinks;
      delete mappedData.programs;

      return { 
        success: true, 
        data: mappedData,
        isDefault: true 
      };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(footer)), error: null };
  } catch (error) {
    console.error('getFooter Error:', error);
    return { success: false, data: null, error: error.message };
  }
}

/**
 * Updates or creates the global footer configuration.
 */
export async function updateFooter(data) {
  try {
    const existing = await Footer.findOne();
    
    let updatedFooter;
    if (existing) {
      await Footer.update(data, {
        where: { id: existing.id }
      });
      updatedFooter = await Footer.findByPk(existing.id);
    } else {
      updatedFooter = await Footer.create(data);
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedFooter)), error: null };
  } catch (error) {
    console.error('updateFooter Error:', error);
    return { success: false, data: null, error: error.message };
  }
}


