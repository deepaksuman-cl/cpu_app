import { notFound } from 'next/navigation';
import { getFlipbookBySlug } from '@/lib/actions/flipbookActions';
import FlipbookViewer from '@/components/FlipbookViewer';

// Ensure dynamic fetching for public brochures
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: flipbook } = await getFlipbookBySlug(slug);

  if (!flipbook) return { title: 'Flipbook Not Found' };

  return {
    title: flipbook.meta_title || `${flipbook.title} | Premium Flipbook Manager`,
    description: flipbook.meta_description || `View the interactive brochure: ${flipbook.title}`,
    openGraph: {
      title: flipbook.title,
      description: flipbook.meta_description,
      type: 'website',
    }
  };
}

export default async function FlipbookPage({ params }) {
  const { slug } = await params;
  const { data: flipbook, success } = await getFlipbookBySlug(slug);

  if (!success || !flipbook || !flipbook.isActive) {
    notFound();
  }

  return (
    <div className="fixed inset-0 w-full h-screen bg-slate-900 overflow-hidden flex flex-col items-center justify-center">
      {/* Immersive Viewport */}
      <div className="w-full h-full flex flex-col relative">
        <FlipbookViewer 
          pdf_url={flipbook.pdf_url} 
          title={flipbook.title} 
          cover_image={flipbook.cover_image}
          backdrop_image={flipbook.backdrop_image}
        />
      </div>
    </div>
  );
}
