"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  ShieldAlert
} from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // 🔥 NAYA STATE: Taki system yaad rakhe kahan jana hai
  const [callbackUrl, setCallbackUrl] = useState("/admin");

  // States for Smooth Entry/Exit Animations
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 🔥 URL CLEANUP MAGIC
    // 1. Pehle check karo ki kya URL mein koi lamba address chhipa hai?
    const params = new URLSearchParams(window.location.search);
    const savedCallback = params.get("callbackUrl");
    
    // 2. Agar hai, toh usko memory (state) mein save kar lo
    if (savedCallback) {
      setCallbackUrl(savedCallback);
    }

    // 3. Ab address bar se us kabaad ko permanently delete kar do
    if (window.location.search) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Page load hone par smooth entry animation ke liye
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials. Please verify your identity.");
        setIsLoading(false);
      } else {
        // Login success hote hi Exiting animation trigger hogi
        setIsExiting(true);
        
        // 🔥 SMART ROUTING: Ab hardcoded '/admin' ki jagah callbackUrl par bhejenge
        setTimeout(() => {
          router.push(callbackUrl); 
          router.refresh();
        }, 800);
      }
    } catch (err) {
      setError("System connection error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-[var(--bg-surface)] overflow-hidden">
      
      {/* --- LEFT SIDE: IMAGE BACKDROP --- */}
      <div className={`hidden lg:flex lg:w-[55%] relative items-center justify-center transition-all duration-1000 ease-in-out
        ${!isMounted ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
      `}>
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: "url('https://cpur.in/wp-content/uploads/2023/07/banner-005.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}
      ></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-darker)]/95 via-[var(--color-primary-dark)]/85 to-transparent mix-blend-multiply"></div>

        <div className="relative z-10 px-20 w-full">
          <div className="mb-6 h-1 w-16 bg-[var(--color-info)]"></div>
          <h1 className="text-5xl xl:text-6xl font-black text-[var(--color-white)] tracking-tight leading-tight mb-6">
            CONTENT <br />
            MANAGEMENT.
          </h1>
          <p className="text-lg text-[var(--color-gray-200)] font-medium max-w-lg tracking-wide leading-relaxed border-l-2 border-[var(--color-info)] pl-6">
            Centralized workspace for the Content Management Team. Securely create, edit, and publish digital experiences.
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: SEAMLESS SMART FORM AREA --- */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 sm:p-16 relative z-20">
        
        <div className={`w-full max-w-[400px] transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]
          ${!isMounted ? 'opacity-0 translate-y-12' : 'opacity-100 translate-y-0'}
          ${isExiting ? 'opacity-0 -translate-y-24 scale-95 pointer-events-none' : ''}
        `}>
          
          <div className="mb-12">
            <Image 
              src="/icon.png" 
              alt="Brand Logo" 
              width={75} 
              height={75} 
              className="mb-8"
            />
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Admin Portal
            </h2>
            <p className="text-sm font-medium text-[var(--text-muted)] mt-2">
              Authenticate to access the CMS environment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {error && (
              <div className="bg-[var(--color-danger-light)] text-[var(--color-danger-dark)] px-4 py-3 text-xs font-bold tracking-wide flex items-center border-l-2 border-[var(--color-danger)]">
                <ShieldAlert className="w-4 h-4 mr-3 shrink-0" />
                {error}
              </div>
            )}

            <div className="relative pt-5">
              <Mail className="absolute right-0 bottom-3 w-5 h-5 text-[var(--color-gray-400)] peer-focus:text-[var(--color-primary)] transition-colors z-10" />
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full py-2 bg-transparent border-0 border-b border-[var(--border-default)] focus:border-[var(--color-primary)] focus:border-b-2 focus:ring-0 outline-none transition-all duration-300 text-base text-[var(--text-primary)] placeholder-transparent"
                placeholder="name@company.com"
                required 
              />
              <label 
                htmlFor="email"
                className="absolute left-0 text-[var(--text-muted)] transition-all duration-300 pointer-events-none
                           top-7 text-base font-medium
                           peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[var(--color-primary)] peer-focus:font-bold peer-focus:tracking-widest peer-focus:uppercase
                           peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-[var(--color-primary)] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase"
              >
                Work Email
              </label>
            </div>

            <div className="relative pt-5">
              <div className="absolute right-0 bottom-2 z-10 flex space-x-2 items-center">
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[var(--color-gray-400)] hover:text-[var(--color-primary)] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full py-2 pr-10 bg-transparent border-0 border-b border-[var(--border-default)] focus:border-[var(--color-primary)] focus:border-b-2 focus:ring-0 outline-none transition-all duration-300 text-base text-[var(--text-primary)] placeholder-transparent tracking-widest"
                placeholder="••••••••"
                required 
              />
              <label 
                htmlFor="password"
                className="absolute left-0 text-[var(--text-muted)] transition-all duration-300 pointer-events-none
                           top-7 text-base font-medium tracking-normal
                           peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[var(--color-primary)] peer-focus:font-bold peer-focus:tracking-widest peer-focus:uppercase
                           peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-[var(--color-primary)] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase"
              >
                Password
              </label>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4 mr-2">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="appearance-none w-4 h-4 border border-[var(--border-dark)] rounded-[2px] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] transition-all cursor-pointer peer"
                  />
                  <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                  Remember me
                </span>
              </label>

              <button type="button" className="text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || isExiting}
              className={`w-full h-14 mt-6 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-sm uppercase tracking-widest transition-all duration-[var(--transition-medium)] hover:bg-[var(--btn-primary-hover)] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center group
                ${isExiting ? 'bg-[var(--color-success)]' : ''}
              `}
            >
              {isLoading && !isExiting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isExiting ? (
                <span className="flex items-center">
                  ACCESS GRANTED <ArrowRight className="w-4 h-4 ml-3 translate-x-2" />
                </span>
              ) : (
                <>
                  Authenticate
                  <ArrowRight className="w-4 h-4 ml-3 transition-transform group-hover:translate-x-2" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}