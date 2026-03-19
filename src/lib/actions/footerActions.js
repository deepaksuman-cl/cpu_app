'use server';

import { connectToDatabase } from '@/lib/db';
import Footer from '@/models/Footer';
import defaultFooterData from '@/data/footer.json';

// Helper to serialize Mongoose documents for Server Components
function serializeFooter(doc) {
  if (!doc) return null;
  const serialized = JSON.parse(JSON.stringify(doc));
  if (serialized._id) serialized._id = serialized._id.toString();
  return serialized;
}

/**
 * Fetches the global footer configuration.
 * Always returns a valid structure, falling back to JSON if DB is empty.
 */
export async function getFooter() {
  try {
    await connectToDatabase();
    
    const footer = await Footer.findOne({}).lean();
    
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
    
    return { success: true, data: serializeFooter(footer) };
  } catch (error) {
    console.error('getFooter Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Updates or creates the global footer configuration.
 * Since there is only one footer, we always update the same record.
 */
export async function updateFooter(data) {
  try {
    await connectToDatabase();
    
    // We use findOneAndUpdate with {} so it finds any existing footer (or creates one)
    const updatedFooter = await Footer.findOneAndUpdate(
      {}, 
      data, 
      { upsert: true, new: true, runValidators: true }
    ).lean();
    
    return { success: true, data: serializeFooter(updatedFooter) };
  } catch (error) {
    console.error('updateFooter Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Syncs the footer in the DB from the local footer.json file.
 */
export async function seedFooterFromJson() {
  try {
    await connectToDatabase();
    
    // Transform flat JSON structure to the new Mongoose schema with columns
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
        // We can add more defaults if needed, but these are the main ones from footer.json
      ],
      contact: [
        { label: 'Address', text: defaultFooterData.contact?.address, icon: 'MapPin' },
        { label: 'Phone', text: defaultFooterData.contact?.phone, icon: 'Phone' },
        { label: 'Email', text: defaultFooterData.contact?.email, icon: 'Mail' }
      ]
    };

    // Remove legacy keys if they exist in the payload (Mongoose will ignore them anyway but cleaner)
    delete mappedData.quickLinks;
    delete mappedData.programs;

    const seeded = await Footer.findOneAndUpdate(
      {}, 
      mappedData, 
      { upsert: true, new: true }
    ).lean();
    
    return { success: true, data: serializeFooter(seeded) };
  } catch (error) {
    console.error('seedFooterFromJson Error:', error);
    return { success: false, error: error.message };
  }
}
