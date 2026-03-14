import React from 'react';

// Notice karo: Hum yahan 'data' as a prop receive kar rahe hain
export default function SchoolHero({ data }) {
  
  // Agar kisi wajah se data nahi aaya, toh component crash na ho isliye ye check lagate hain
  if (!data) return null;

  return (
    <section className="relative bg-[#003a5c] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* JSON ka data yahan print ho raha hai */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {data.title}
        </h1>
        
        <h2 className="text-xl md:text-2xl text-amber-400 mb-6">
          {data.subtitle}
        </h2>
        
        <p className="text-gray-200 max-w-3xl leading-relaxed">
          {data.description}
        </p>

        {/* Agar JSON me points/features hain, toh unko map karke dikhayenge */}
        {data.points && data.points.length > 0 && (
          <ul className="mt-8 space-y-2">
            {data.points.map((point, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-amber-400">✔</span>
                {point}
              </li>
            ))}
          </ul>
        )}

      </div>
    </section>
  );
}