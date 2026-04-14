'use client';

import { useEffect, useRef } from 'react';

// Custom Particles Component with Mouse Hover (Grab) Effect
const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    
    let animationFrameId;
    let particles = [];
    
    // Mouse tracking object
    let mouse = {
      x: null,
      y: null,
      radius: 140 // Grab distance as per your HTML config
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5; // Speed
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = 2; // Size
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce back from edges
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // #3bc3e2 color with 0.5 opacity (59, 195, 226)
        ctx.fillStyle = 'rgba(59, 195, 226, 0.5)'; 
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Fixed number of particles (80) as per your HTML config, scalable by width
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const setCanvasSize = () => {
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        initParticles(); // Resize hone par particles refresh karein
      }
    };

    // Initialize Canvas Size
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mouse Events for Grab Effect
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // 1. Connect Particle to Particle
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) { // Distance from config
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 195, 226, ${0.4 - distance / 375})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // 2. Connect Particle to Mouse (Grab Mode)
        if (mouse.x != null && mouse.y != null) {
          const dxMouse = particles[i].x - mouse.x;
          const dyMouse = particles[i].y - mouse.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceMouse < mouse.radius) {
            ctx.beginPath();
            // Solid grab line matching the #3bc3e2 color
            ctx.strokeStyle = `rgba(59, 195, 226, ${1 - distanceMouse / mouse.radius})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
};

export default function App() {
  return (
    // Main Container
    <div className="relative w-full bg-[#0c4088] font-sans h-[calc(100vh-120px)] min-h-[600px] flex items-center overflow-hidden">
      
      {/* Background Particles Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ParticlesBackground />
      </div>

      {/* Hero Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, #00000052 37%, rgba(18, 74, 151, 0.7) 50%, rgba(18, 74, 151, 0.2) 100%)'
        }}
      ></div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-[96%] max-w-[1400px] mx-auto px-[5%] py-10 pointer-events-none flex items-center justify-between gap-10">
        
        {/* Left Side Content */}
        <div className="max-w-3xl pointer-events-auto">
          
          {/* Headings - Bold */}
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[68px] font-bold leading-[1.1] text-white mb-4 tracking-tight">
            <span className="block" style={{fontWeight: 600}}>AI-First</span>
            <span className="text-[#f1bd0e] block mt-1" style={{fontWeight: 600}} >B.Tech in CS</span>
          </h1>
          
          <p className="text-[1.25rem] md:text-[1.5rem] font-medium text-white mb-8">
            Learn AI. Build AI. Become AI-Ready.
          </p>

          {/* Info Details Grid */}
          <div className="flex flex-wrap items-center mb-8 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-300 uppercase tracking-[0.15em] mb-1">Duration</span>
              {/* font-normal jaisa screenshot me hai */}
              <span className="text-[15px] font-normal text-white">4 Years</span>
            </div>
            
            {/* Thin Divider */}
            <div className="w-[1px] h-8 bg-white/20 hidden sm:block"></div>

            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-300 uppercase tracking-[0.15em] mb-1">Degree</span>
              <span className="text-[15px] font-normal text-white">B.Tech • UGC Recognised</span>
            </div>

            {/* Thin Divider */}
            <div className="w-[1px] h-8 bg-white/20 hidden sm:block"></div>

            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-300 uppercase tracking-[0.15em] mb-1">Campus</span>
              <span className="text-[15px] font-normal text-white">Kota, Rajasthan</span>
            </div>
          </div>

          {/* Specialization Section */}
          <div className="mb-10">
            {/* Specialization text font-normal */}
            <p className="text-white text-[15px] font-normal mb-3">Specialization:</p>
            <div className="flex flex-wrap gap-3">
              
              {/* Tag 1 - Thin border, font-normal, text-[13px] */}
              <span className="bg-[#ffffff08] border border-[#f1bd0e] text-[#f1bd0e] text-[13px] font-normal px-4 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-[#f1bd0e]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 013 3v2h2a1 1 0 011 1v4a1 1 0 01-1 1h-2v1a3 3 0 01-3 3H7a3 3 0 01-3-3v-1H2a1 1 0 01-1-1v-4a1 1 0 011-1h2V10a3 3 0 013-3h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zm-3 9a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z" />
                </svg>
                AI & ML
              </span>
              
              {/* Tag 2 */}
              <span className="bg-[#ffffff08] border border-[#f1bd0e] text-[#f1bd0e] text-[13px] font-normal px-4 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-[#f1bd0e]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Full Stack Dev. & Cloud Computing 
              </span>

              {/* Tag 3 */}
              <span className="bg-[#ffffff08] border border-[#f1bd0e] text-[#f1bd0e] text-[13px] font-normal px-4 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#f1bd0e]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                Cyber Security & Cloud Computing
              </span>

            </div>
          </div>

          {/* Action Buttons - Slightly refined boldness and padding */}
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="bg-[#f1bd0e] text-[#0c4088] border-2 border-[#f1bd0e] rounded-md px-8 py-2.5 font-semibold hover:bg-[#dca60b] hover:border-[#dca60b] transition-colors inline-block text-[15px]">
              Apply Now
            </a>
<a
  href="#"
  className="inline-block w-fit bg-transparent border-2 border-white text-white rounded-md px-8 py-2.5 font-semibold hover:bg-white hover:!text-[#0c4088] transition-all duration-300 ease-in-out text-[15px]"
>
  Download Brochure
</a>
          </div>

        </div>
      </div>
    </div>
  );
}