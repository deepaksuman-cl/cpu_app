import React from 'react'

const SchoolHero = () => {
  return (
   <>
     <section ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden">
           <div className="absolute inset-0">
             <img src="https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg" alt="Campus"
               className="w-full h-full object-cover" onError={e => { e.target.style.display = "none"; }} />
             <div className="absolute inset-0 bg-gradient-to-br from-[#001f33]/94 via-[#00588b]/88 to-[#007abf]/84" />
             <div className="dot-bg absolute inset-0 opacity-20" />
           </div>
           <div className="ring-cw  absolute right-0 top-1/2 -translate-y-1/2 translate-x-[35%] w-[600px] h-[600px] rounded-full pointer-events-none border-2 border-[#ffb900]/18" />
           <div className="ring-ccw absolute right-0 top-1/2 -translate-y-1/2 translate-x-[25%] w-[430px] h-[430px] rounded-full pointer-events-none border-2 border-dashed border-white/10" />
           <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-16 py-20 w-full">
             <div className="max-w-[80%]">
               <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold bg-[#ffb900]/15 text-[#ffb900] border border-[#ffb900]/35">
                 <Star className="w-4 h-4 fill-current" /> Best Computer Application College in Kota
               </div>
               <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.4rem,4.5vw,3.8rem)" }}>
                 School of <span className="text-[#ffb900]">Computer</span> Applications &{" "}
                 <span className="text-sky-300">Technology</span>
               </h1>
               <p className="text-blue-100/90 text-lg leading-relaxed mb-10 max-w-xl">
                 Career Point University offers cutting-edge programs shaping future technologists, researchers, and industry-ready professionals in Kota.
               </p>
               <div className="flex flex-wrap gap-4">
                 <button className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-transform hover:scale-105 border-none cursor-pointer bg-[#ffb900] text-[#0a1628] shadow-[0_8px_32px_rgba(255,185,0,0.4)]">
                   Apply Now <ArrowRight className="w-5 h-5" />
                 </button>
                 <button onClick={() => scrollTo("programs")} className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-2 border-white/30">
                   Explore Programs
                 </button>
               </div>
             </div>
           </div>
           <div className="absolute bottom-0 left-0 right-0">
             <svg viewBox="0 0 1440 55" fill="white" xmlns="http://www.w3.org/2000/svg">
               <path d="M0,35 C360,70 1080,0 1440,35 L1440,55 L0,55 Z" />
             </svg>
           </div>
         </section>
   </>
  )
}

export default SchoolHero