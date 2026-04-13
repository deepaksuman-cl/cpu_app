
const highlightData = [
  {
    id: 1,
    title: 'Learn by Building',
    desc: 'Future-proof curriculum with AI embedded from day one',
    // Custom SVG Icon equivalent to fa-laptop-code
    icon: (
      <svg className="w-[1.8rem] h-[1.8rem] text-[#f1bd0e]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
        <path d="M9.5 14l2.5-2.5-2.5-2.5-1.4 1.4L9.2 11.5l-1.1 1.1L9.5 14zm5 0l1.4-1.4L14.8 11.5l1.1-1.1-1.4-1.4L12 11.5L14.5 14z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Industry Led Innovation Lab',
    desc: "India's only deep tech lab for UG with funding support for startup",
    // Custom SVG Icon equivalent to fa-flask
    icon: (
      <svg className="w-[1.8rem] h-[1.8rem] text-[#f1bd0e]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.42-.73.45-1.15V3H8.2v.66c.03.42.19.82.45 1.15L10 6.5v4.17L4.2 18.4c-.65.87-.03 2.1.1 2.1h15c1.13 0 1.15-1.23.5-2.1zM12 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'AI First',
    desc: 'Every semester is built around real AI tools, APIs & projects',
    // Custom SVG Icon equivalent to fa-robot
    icon: (
      <svg className="w-[1.8rem] h-[1.8rem] text-[#f1bd0e]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.5 10c-.83 0-1.5.67-1.5 1.5V13c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-1.5c0-.83-.67-1.5-1.5-1.5zM8.5 13.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM18 7c-.55 0-1 .45-1 1V9H7V8c0-.55-.45-1-1-1s-1 .45-1 1v1.5c0 1.93 1.57 3.5 3.5 3.5H9c.55 0 1 .45 1 1v1h4v-1c0-.55.45-1 1-1h.5c1.93 0 3.5-1.57 3.5-3.5V8c0-.55-.45-1-1-1zm-6-5C9.79 2 8 3.79 8 6h8c0-2.21-1.79-4-4-4zm-8 8c-.83 0-1.5.67-1.5 1.5V13c0 .83.67 1.5 1.5 1.5S4 13.83 4 13v-1.5C4 10.67 3.33 10 2.5 10z" />
        <path d="M12 16c-2.76 0-5 2.24-5 5v1h10v-1c0-2.76-2.24-5-5-5z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: '70%',
    desc: 'Hands-on coding from Day 1 - no theory overload',
    // Custom SVG Icon equivalent to fa-code (</>)
    icon: (
      <svg className="w-[1.8rem] h-[1.8rem] text-[#f1bd0e]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: '250+',
    desc: "Hiring partners across India's top tech companies",
    // Custom SVG Icon equivalent to fa-users
    icon: (
      <svg className="w-[1.8rem] h-[1.8rem] text-[#f1bd0e]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  }
];

export default function DarkHighlights() {
  return (
    // Section Background & Padding
    <section className="w-full bg-[#0c4088] px-6 sm:px-8 py-10 border-b border-[#1a1a1a]">
      {/* Grid Container */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        
        {highlightData.map((item) => (
          // Individual Card styling
          <div 
            key={item.id} 
            className="bg-[#ffffff17] border border-transparent rounded-xl p-[30px_24px] flex flex-col transition-all duration-300 hover:-translate-y-[3px] hover:border-[#f1bd0e] hover:shadow-[0_10px_30px_rgba(34,172,209,0.1)] cursor-pointer"
          >
            {/* Icon */}
            <div className="mb-[20px]">
              {item.icon}
            </div>
            
            {/* Title */}
            <h4 className="text-[#f1bd0e] text-[1.2rem] font-[800] mb-[12px] leading-tight">
              {item.title}
            </h4>
            
            {/* Description */}
            <p className="text-white text-[0.95rem] font-normal leading-[1.5] m-0">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}