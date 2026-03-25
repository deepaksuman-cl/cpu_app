'use client';

import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

export default function Icon({ name, size = 18, className = "" }) {
  const LucideIcon = LucideIcons[name];
  
  if (!LucideIcon) {
    return <HelpCircle size={size} className={className} />;
  }

  return <LucideIcon size={size} className={className} />;
}
