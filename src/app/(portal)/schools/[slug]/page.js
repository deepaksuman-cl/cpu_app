

import SchoolHero from "../../../../components/pages/schools/SchoolHero";
import schoolsData from "../../../../data/schoolsData.json";

export default async function SchoolPage({ params }) {
  

  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;
  
  const data = schoolsData[currentSlug];

  // Agar URL galat hai toh 404 (Ab ye sahi kaam karega)
  if (!data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-50 p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">🚨 Error: Data Match Nahi Hua!</h1>
        <p className="text-lg">Aapne URL me ye Slug dala hai: <strong className="bg-yellow-200 px-2">{currentSlug}</strong></p>
        <div className="mt-6 p-4 bg-white border rounded shadow max-w-lg text-left">
           <p className="font-semibold text-gray-700">Hamare JSON me sirf ye Slugs available hain:</p>
           <ul className="list-disc pl-5 mt-2 text-blue-600 font-mono">
              {schoolsData ? Object.keys(schoolsData).map(key => <li key={key}>{key}</li>) : <li>JSON file hi load nahi hui!</li>}
           </ul>
        </div>
      </div>
    );
  }

  // MAIN PAGE RENDER
  return (
    <main>
    
      <SchoolHero  />
      {currentSlug === "computer-applications-technology" && (
        <section className="bg-gray-900 text-white p-10 my-5">
           <h2 className="text-3xl font-bold">Advance Coding Labs</h2>
           <p>Ye section law wale page par kabhi nahi dikhega. Sirf CS walo ke liye hai!</p>
        </section>
      )}

      {currentSlug === "legal-studies-governance" && (
        <section className="bg-amber-100 p-10 my-5 border-l-4 border-amber-800">
           <h2 className="text-3xl font-bold">Moot Court Practice Area</h2>
           <p>Ye section sirf Law ke students ke practice ke liye hai.</p>
        </section>
      )}
    </main>
  );
}