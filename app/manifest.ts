import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} – AI Engineer`,
    short_name: 'Anshu',
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#EEF0F5',
    theme_color: '#3046FF',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
