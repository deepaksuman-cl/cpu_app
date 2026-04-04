import { redirect } from 'next/navigation';

export default function SettingsRedirect() {
  // Since Global Settings is just a placeholder, we can redirect to custom-css for now
  redirect('/admin/settings/custom-css');
}
