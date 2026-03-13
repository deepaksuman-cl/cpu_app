// File: src/components/layout/HeaderServer.js
// 🔴 Yahan koi 'use client' nahi hai. Ye 100% Server Side Rendered (SSR) hai.

import HeaderClient from './HeaderClient'; // Waiter ko bulaya
import navigationData from '@/data/navigation.json'; // Database/JSON se data fetch kiya

export default async function HeaderServer() {
  
  // Abhi hum data JSON se le rahe hain. 
  // Baad me jab admin panel banega, toh hum yahan MongoDB ka API call laga denge.
  // Example: const navigationData = await fetch('api/get-nav-data');
  const data = navigationData;

  // Data nikalne ke baad, usko Client component ko as a prop de diya
  return (
    <HeaderClient navData={data} />
  );
}