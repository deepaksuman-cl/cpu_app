'use client';

import React, { useState } from 'react';

// SVG Icons matching the FontAwesome ones from your HTML
const Icons = {
  BookReader: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-12 h-12 text-[#1e3a8a]">
      <path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152V512l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427.2V118.1c0-22.5 19.3-40.2 41.6-37.4l86.6 11.1c25.8 3.3 50.1 13.9 70.2 30.7L240 148.5v99.5zM272 248V148.5l41.6-26.1c20.1-16.8 44.4-27.4 70.2-30.7l86.6-11.1c22.3-2.8 41.6 14.9 41.6 37.4v309.1c0 16.3-12.5 30-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512V248z"/>
    </svg>
  ),
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-12 h-12 text-[#1e3a8a]">
      <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>
    </svg>
  ),
  UsersGear: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-12 h-12 text-[#1e3a8a]">
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4c-15 2.5-29.4 8.1-42.6 16.4l-37-14.5c-20.5-8.1-43.5 1.9-51.6 22.4l-11.4 28.7c-7 2.1-13.8 4.7-20.4 7.9L338 316.6c-21.3-5-42.8 8.1-47.8 29.4l-8.5 36.3c-4.8 2.3-9.5 5-13.9 8.1l-34.6-18.9c-20.2-11.1-45.2-3.6-56.2 16.6l-18.2 33c-11.1 20.2-3.6 45.2 16.6 56.2l34.6 18.9c-1.3 5.4-2.2 10.9-2.6 16.5l-38.6 7.7c-21.8 4.4-36.1 25.7-31.7 47.5l9 44.9c4.4 21.8 25.7 36.1 47.5 31.7l38.6-7.7c4 4.5 8.3 8.7 12.8 12.5l-12 37.9c-6.8 21.6 5.1 44.8 26.7 51.6l42.6 13.5c21.6 6.8 44.8-5.1 51.6-26.7l12-37.9c6.6 1.8 13.5 3 20.4 3.6l18.4 35c10.4 19.8 34.3 27.5 54.1 17l39.5-20.8c19.8-10.4 27.5-34.3 17-54.1l-18.4-35c4.7-5.5 8.9-11.4 12.6-17.7l38.7 9.8c21.3 5.4 42.6-7.5 48.1-28.8l10.8-41.9c5.4-21.3-7.5-42.6-28.8-48.1l-38.7-9.8c-1.1-7.2-2.9-14.2-5.4-20.9l26.2-31.3c14.2-16.9 11.9-42.2-5-56.4l-33.5-28z"/>
    </svg>
  ),
  BuildingColumns: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-12 h-12 text-[#1e3a8a]">
      <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
    </svg>
  ),
  ArrowTrendUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-12 h-12 text-[#1e3a8a]">
      <path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 146.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-80 80c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L112 157.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128zM32 384c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"/>
    </svg>
  ),
  UserGroup: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-12 h-12 text-[#1e3a8a]">
      <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/>
    </svg>
  ),
};

const featuresData = [
  {
    id: '01',
    icon: <Icons.BookReader />,
    frontTitle: 'AI First Curriculum',
    backTitle: 'AI First Curriculum',
    backDesc: 'Every course integrates AI tools and concepts from semester one. Build AI-powered projects that solve real problems.',
  },
  {
    id: '02',
    icon: <Icons.Code />,
    frontTitle: 'Coding from Day One',
    backTitle: 'Coding from Day One',
    backDesc: 'No theory overload. 70% hands-on coding with industry-standard tools and practices from the start.',
  },
  {
    id: '03',
    icon: <Icons.UsersGear />,
    frontTitle: 'Learn from Industry experts',
    backTitle: 'Industry Experts',
    backDesc: 'Learn from engineers at Google, Microsoft, and Amazon. Real insights, real experience, real connections.',
  },
  {
    id: '04',
    icon: <Icons.BuildingColumns />,
    frontTitle: 'Campus Built for Techies',
    backTitle: 'Tech-First Campus',
    backDesc: 'AI-powered smart classrooms, 24/7 coding labs, high-speed internet. Spaces designed for innovation.',
  },
  {
    id: '05',
    icon: <Icons.ArrowTrendUp />,
    frontTitle: 'Career Launch Ecosystem',
    backTitle: 'Career Launch Ecosystem',
    backDesc: '250+ hiring partners, resume workshops, mock interviews. Your career journey starts from year one.',
  },
  {
    id: '06',
    icon: <Icons.UserGroup />,
    frontTitle: 'Selective Peer Group',
    backTitle: 'Selective Peer Group',
    backDesc: 'Rigorous CPUEST selection ensures you learn alongside motivated, talented future tech leaders.',
  },
];

export default function FeaturesFlipCards() {
  return (
    <section className="py-20 bg-[#fafafa]" id="features">
      
      {/* Required CSS for 3D Flip & Ribbon injected globally for this component */}
      <style dangerouslySetInnerHTML={{__html: `
        .feature-card-wrapper {
          perspective: 1000px;
        }
        .feature-card-inner {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        /* Handle both Hover for desktop and a .flipped class for mobile click support */
        .feature-card-wrapper:hover .feature-card-inner,
        .feature-card-wrapper.flipped .feature-card-inner {
          transform: rotateY(180deg);
        }
        .feature-card-front, .feature-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .feature-card-back {
          transform: rotateY(180deg);
        }
        /* Custom Ribbon Shape matching the video */
        .ribbon-shape {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4">
            Why Choose Career Point University?
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            AI First B.Tech Program in collaboration with UGC/AICTE approved campuses
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} data={feature} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Individual Card Component to manage its own click state for mobile
function FeatureCard({ data }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`feature-card-wrapper h-64 w-full cursor-pointer rounded-xl group ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="feature-card-inner relative w-full h-full rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
        
        {/* --- FRONT OF CARD --- */}
        <div className="feature-card-front absolute inset-0 w-full h-full bg-white rounded-xl flex items-center p-8 overflow-hidden">
          
          {/* Yellow Ribbon */}
          <div className="absolute top-0 right-6 w-12 h-16 bg-[#ffcc00] ribbon-shape flex items-start justify-center pt-3 z-10 shadow-sm">
            <span className="text-[#0f172a] font-bold text-lg">{data.id}</span>
          </div>
          {/* Ribbon Fold/Shadow effect on the left side of the ribbon */}
          <div className="absolute top-0 right-[4.5rem] w-3 h-3 bg-[#cca300] shadow-inner" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>

          <div className="flex items-center gap-6 w-full pr-12">
            <div className="flex-shrink-0">
              {data.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#0f172a] leading-tight">
              {data.frontTitle}
            </h3>
          </div>
        </div>

        {/* --- BACK OF CARD --- */}
        <div className="feature-card-back absolute inset-0 w-full h-full bg-[#0f172a] rounded-xl flex flex-col items-start justify-center p-8 border border-[#1e293b]">
          <h4 className="text-xl font-bold text-[#ffcc00] mb-3">
            {data.backTitle}
          </h4>
          <p className="text-white text-base leading-relaxed opacity-90">
            {data.backDesc}
          </p>
        </div>

      </div>
    </div>
  );
}