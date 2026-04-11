'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const teamData = [
  {
    name: "Pramod Maheshwari",
    role: "B.Tech., IIT Delhi | OPM, Harvard Business School, Harvard University, USA | Founder-Career Point Group",
    image: "https://cpur.in/lp/b-tech/assets/img/team/pm-sir.jpg",
    logos: [
      "https://cpur.in/lp/b-tech/assets/img/logo/A_02.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/b_02.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/A_01.jpg"
    ]
  },
  {
    name: "Puneet Sharma",
    role: "B.Tech., IIT Delhi, Ph.D., University of Southern California, USA, HPE Fellow & VP – Hewlett Packard Enterprise",
    image: "https://cpur.in/lp/b-tech/assets/img/team/puneet-sharma.jpg",
    logos: [
      "https://cpur.in/lp/b-tech/assets/img/logo/b_01.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/b_02.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/b_03.jpg"
    ]
  },
  {
    name: "Vidushi Maheshwari",
    role: "BS & MS in Computer Science, Georgia Tech | Software Engineers at Google",
    image: "https://cpur.in/lp/b-tech/assets/img/team/Vidushi Maheshwari.jpg",
    logos: [
      "https://cpur.in/lp/b-tech/assets/img/logo/c_01.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/c_02.jpg"
    ]
  },
  {
    name: "Abhishek Soni",
    role: "B.Tech + M.Tech, IIT Delhi | Co-Founder & CEO, Upwards | Times 40U40",
    image: "https://cpur.in/lp/b-tech/assets/img/team/Abhishek Soni.jpg",
    logos: [
      "https://cpur.in/lp/b-tech/assets/img/logo/ibm_logo.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/go_upwards_logo.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/lendingkart_logo.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/b_02.jpg"
    ]
  },
  {
    name: "Shailendra Upadhyay",
    role: "B.Tech + M.Tech, IIT(BHU) Varanasi | AI Engineer at IBM",
    image: "https://cpur.in/lp/b-tech/assets/img/team/shailendraupadhyay.jpg",
    logos: [
      "https://cpur.in/lp/b-tech/assets/img/logo/iit.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/ibm_logo.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/avalara_logo.jpg"
    ]
  },
  {
    name: "Avinash Raju",
    role: "BE, University of Illinois Urbana-Champaign USA | AI and Tech Advisory at KPMG",
    image: "https://cpur.in/lp/b-tech/assets/img/team/Avinash Raju.jpg",
    logos: [
      "https://cpur.in/lp/b-tech/assets/img/logo/university_of_illinois_at_urbana_champaign.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/aptai_systems_logo.jpg"
    ]
  },
  {
    name: "Davis Zhu",
    role: "AI Advisor Associated with KPMG USA",
    image: "https://cpur.in/lp/b-tech/assets/img/team/Davis-Zhu.jpg",
    logos: [
      "https://cpur.in/lp/b-tech/assets/img/logo/kpmg_us.jpg",
      "https://cpur.in/lp/b-tech/assets/img/logo/university_of_illinois_at_urbana_champaign.jpg"
    ]
  }
];

export default function TeamSlider() {
  return (
    <section className="py-20 bg-white overflow-hidden" id="team">
      
      <style dangerouslySetInnerHTML={{__html: `
        .team-swiper {
          padding-bottom: 50px !important;
          padding-top: 10px !important;
        }
        
        .team-swiper .swiper-pagination-bullet {
          background-color: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        
        .team-swiper .swiper-pagination-bullet-active {
          background-color: #0f347c;
          transform: scale(1.2);
        }

        .swiper-container-wrapper .nav-btn {
          background-color: #0f347c;
          color: white;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          opacity: 0;
          box-shadow: 0 4px 12px rgba(15, 52, 124, 0.2);
        }

        .swiper-container-wrapper:hover .nav-btn {
          opacity: 1;
        }

        .swiper-container-wrapper .nav-btn:hover {
          background-color: #1e40af;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 16px rgba(15, 52, 124, 0.4);
        }

        .swiper-container-wrapper .nav-btn-prev {
          left: 0px;
        }

        .swiper-container-wrapper .nav-btn-next {
          right: 0px;
        }

        @media (max-width: 1300px) {
          .swiper-container-wrapper .nav-btn-prev { left: 4px; opacity: 1; }
          .swiper-container-wrapper .nav-btn-next { right: 4px; opacity: 1; }
        }

        .advisor-card-inner {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .advisor-card-inner:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -5px rgba(0,0,0,0.1);
        }
      `}} />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f347c] mb-6 tracking-tight">
            Meet the Board of Advisors
          </h2>
          <p className="text-[17px] text-slate-600 font-medium leading-relaxed">
            An accomplished panel of entrepreneurs and AI practitioners with deep industry experience. 
            They bridge the gap between academia and real-world technology, ensuring our students learn what truly matters.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative swiper-container-wrapper group px-12 md:px-14 lg:px-16">
          <button className="nav-btn nav-btn-prev swiper-button-prev-unique">
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <button className="nav-btn nav-btn-next swiper-button-next-unique">
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1.2}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              prevEl: '.swiper-button-prev-unique',
              nextEl: '.swiper-button-next-unique',
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 3.5 },
            }}
            className="team-swiper"
          >
            {teamData.map((member, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="advisor-card-inner bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col h-full overflow-hidden relative group">
                  
                  {/* Top Dark Blue Background Block */}
                  <div className="h-32 bg-[#0f347c] w-full shrink-0"></div>

                  {/* Overlapping Image - Now wider and without the white strip */}
                  <div className="px-5 -mt-24 relative z-10 flex justify-center">
                    <div className="w-full">
                      <div className="aspect-[4.5/5] bg-slate-100 rounded-[24px] overflow-hidden group-hover:shadow-xl transition-all duration-500">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="px-6 pb-8 pt-6 flex-grow flex flex-col items-start translate-z-0">
                    <h4 className="text-[22px] font-black text-[#0f347c] mb-2 leading-tight tracking-tight">
                      {member.name}
                    </h4>
                    <p className="text-[14px] text-slate-500 font-bold mb-6 leading-[1.6] line-clamp-3 min-h-[4.8rem] flex-grow pr-1">
                      {member.role}
                    </p>

                    {/* Logo Bar - Matching the screenshot style */}
                    <div className="flex flex-wrap items-center gap-2.5 mt-auto pt-4 w-full">
                      {member.logos.map((logo, idx) => (
                        <div key={idx} className="h-10 w-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-400 transition-colors">
                          <img 
                            src={logo} 
                            alt="partner logo" 
                            className="max-h-[70%] max-w-[70%] object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}