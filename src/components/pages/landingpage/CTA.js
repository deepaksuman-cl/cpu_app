"use client";

export default function CTA() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">

        {/* MAIN CARD */}
        <div className="relative overflow-hidden rounded-2xl flex flex-col lg:flex-row shadow-lg">

          {/* 🔵 LEFT SIDE */}
          <div className="bg-[#1e4b8f] text-white p-8 lg:p-12 w-full lg:w-1/2 z-10">

            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Plan your next step with confidence
            </h2>

            <p className="text-blue-100 mb-6">
              Connect with our Admission Counsellor to:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <span>⭐</span>
                <span>
                  Understand the <strong className="text-white">admission process</strong> step by step
                </span>
              </li>

              <li className="flex gap-3">
                <span>⭐</span>
                <span>
                  Explore <strong className="text-white">scholarships — up to 100% tuition waiver</strong>
                </span>
              </li>

              <li className="flex gap-3">
                <span>⭐</span>
                <span>
                  Discover if CPU is the <strong className="text-white">right fit for your goals</strong>
                </span>
              </li>

              <li className="flex gap-3">
                <span>⭐</span>
                <span>
                  Learn about <strong className="text-white">AI-First B.Tech</strong> curriculum & career outcomes
                </span>
              </li>
            </ul>

            <button className="flex items-center gap-3 bg-white text-[#1e4b8f] px-6 py-3 rounded-lg font-bold shadow hover:scale-105 transition">
              📞 REQUEST CALLBACK
            </button>
          </div>

          {/* 🟡 RIGHT SIDE */}
          <div className="relative bg-[#f4b400] w-full lg:w-1/2 flex items-end justify-center overflow-hidden">

            {/* CURVE SHAPE */}
            <div className="absolute left-[-30%] top-0 w-[140%] h-full bg-[#1e4b8f] rounded-r-[200px]"></div>

            {/* GRID PATTERN */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* IMAGE */}
            <img
              src="https://cpur.in/lp/b-tech/assets/img/cta.avif"
              alt="Admission Counsellor"
              className="relative z-10 h-[260px] md:h-[320px] lg:h-[360px] object-contain"
            />
          </div>

        </div>

      </div>
    </section>
  );
}