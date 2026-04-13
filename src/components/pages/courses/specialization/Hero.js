'use client';

import React, { useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
const Bot = LucideIcons.Bot || LucideIcons.Cpu;
const Code = LucideIcons.Code || LucideIcons.Code2 || LucideIcons.Terminal;
const ShieldCheck = LucideIcons.ShieldCheck || LucideIcons.ShieldCheckIcon || LucideIcons.Shield || LucideIcons.CheckCircle;

// Icon Map for Specializations
const ICON_MAP = {
  Bot: <Bot className="w-4 h-4 text-[#f1bd0e]" />,
  Code: <Code className="w-4 h-4 text-[#f1bd0e]" />,
  ShieldCheck: <ShieldCheck className="w-3.5 h-3.5 text-[#f1bd0e]" />
};

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    
    let animationFrameId;
    let particles = [];
    
    let mouse = {
      x: null,
      y: null,
      radius: 140
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 195, 226, 0.5)'; 
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const setCanvasSize = () => {
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        initParticles();
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

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
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 195, 226, ${0.4 - distance / 375})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        if (mouse.x != null && mouse.y != null) {
          const dxMouse = particles[i].x - mouse.x;
          const dyMouse = particles[i].y - mouse.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distanceMouse < mouse.radius) {
            ctx.beginPath();
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

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default function Hero({ data }) {
  if (!data) return null;
  const { title = [], subtitle, stats = [], specializations = [], cta = [] } = data || {};

  return (
    <div className="relative w-full bg-[#0c4088] font-sans h-[calc(100vh-120px)] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ParticlesBackground />
      </div>

      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(160deg, #00000052 37%, rgba(18, 74, 151, 0.7) 50%, rgba(18, 74, 151, 0.2) 100%)' }}
      ></div>

      <div className="relative z-20 w-[96%] max-w-[1400px] mx-auto px-[5%] py-10 pointer-events-none flex items-center justify-between gap-10">
        <div className="max-w-3xl pointer-events-auto">
          <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[68px] font-bold leading-[1.1] text-white mb-4 tracking-tight">
            {title.map((line, i) => (
              <span key={i} className={`block ${i === 1 ? 'text-[#f1bd0e] mt-1' : ''}`} style={{fontWeight: 600}}>
                {line}
              </span>
            ))}
          </h1>
          
          <p className="text-[1.25rem] md:text-[1.5rem] font-medium text-white mb-8">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center mb-8 gap-x-8 gap-y-4">
            {stats.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-gray-300 uppercase tracking-[0.15em] mb-1">{stat.label}</span>
                  <span className="text-[15px] font-normal text-white">{stat.value}</span>
                </div>
                {i < stats.length - 1 && <div className="w-[1px] h-8 bg-white/20 hidden sm:block"></div>}
              </React.Fragment>
            ))}
          </div>

          <div className="mb-10">
            <p className="text-white text-[15px] font-normal mb-3">Specialization:</p>
            <div className="flex flex-wrap gap-3">
              {specializations.map((spec, i) => (
                <span key={i} className="bg-[#ffffff08] border border-[#f1bd0e] text-[#f1bd0e] text-[13px] font-normal px-4 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
                  {ICON_MAP[spec.icon] || null}
                  {spec.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {cta.map((btn, i) => (
              <a 
                key={i}
                href={btn.href} 
                className={`${i === 0 ? 'bg-[#f1bd0e] text-[#0c4088] border-[#f1bd0e]' : 'bg-transparent border-white text-white hover:bg-white hover:!text-[#0c4088]'} border-2 rounded-md px-8 py-2.5 font-semibold transition-all duration-300 text-[15px]`}
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
