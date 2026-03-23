import { getPageBySlug } from '@/lib/actions/pageActions';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/portal/pages/BlockRenderer';
import '@/app/university-prose.css'; // Load global university CMS prose styles

export async function generateMetadata(props) {
  const params = await props.params;
  const { data: page } = await getPageBySlug(params.slug);
  if (!page) return {};
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description || '',
  };
}

export default async function DynamicCMSPage(props) {
  const params = await props.params;
  const { data: page } = await getPageBySlug(params.slug);

  if (!page) {
    // Graceful trigger of the Next.js 404 boundary if the slug is not found in MongoDB Collection Page
    notFound(); 
  }

  return (
    <main className="min-h-screen bg-white font-[Poppins,sans-serif]">
      {/* Dynamic Hero Section */}
      {!page.hero?.hideHero && (
        <>
          {page.hero && (page.hero.title || page.hero.bgImage) ? (
            <section 
              className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] flex items-center justify-center bg-slate-900 border-b-[5px] border-[#ffb900] overflow-hidden"
              style={page.hero.bgImage ? { backgroundImage: `url(${page.hero.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : {}}
            >
              {/* Subtle gradient dark overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-0" />
              
              <div className="relative z-10 max-w-[56rem] mx-auto px-6 text-center space-y-4">
                {page.hero.badge && (
                  <span className="inline-block px-5 py-2 bg-[#ffb900] text-[#5c4200] font-black text-xs tracking-widest uppercase shadow-xl ring-2 ring-white/20">
                    {page.hero.badge}
                  </span>
                )}
                {page.hero.title && (
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] drop-shadow-2xl">
                    {page.hero.title}
                  </h1>
                )}
              </div>
            </section>
          ) : (
            /* Fallback Title Header if no hero image configured */
            <section className="bg-gray-50 border-b border-gray-200 py-16 px-6">
              <div className="max-w-[56rem] mx-auto">
                 <h1 className="text-4xl font-black text-[#00588b] leading-tight">{page.title}</h1>
              </div>
            </section>
          )}
        </>
      )}

      {/* Dynamic Blocks Assembly Loop */}
      <div className="w-full">
        {page.blocks?.map((block, idx) => (
          <BlockRenderer key={idx} block={block} />
        ))}
        {(!page.blocks || page.blocks.length === 0) && (
          <div className="py-24 text-center text-gray-400 font-semibold text-sm">
            This page has been published with no content blocks.
          </div>
        )}
      </div>

    </main>
  );
}
