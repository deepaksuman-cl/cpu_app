// File: src/components/layout/HeaderServer.js
// 🔴 Yahan koi 'use client' nahi hai. Ye 100% Server Side Rendered (SSR) hai.

import HeaderClient from './HeaderClient'; // Waiter ko bulaya
import { getNavigationData } from '@/lib/actions/navigation';

export default async function HeaderServer() {
  
  // Fetch real-time data from MongoDB via Server Action
  try {
    const data = await getNavigationData();
    return <HeaderClient navData={data} />;
  } catch (error) {
    console.error("Header Data Fetch Error:", error);
    // Fallback to empty structure or handle error gracefully
    return null; 
  }
}