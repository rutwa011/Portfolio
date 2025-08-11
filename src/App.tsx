import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight, Code, Palette, Zap, Star, Sparkles, MousePointer, BarChart, TrendingUp } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsLoaded(true);
    }, 100);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills = [
    { 
      icon: BarChart, 
      title: "Data Analysis", 
      description: "Uncovering patterns and driving decisions through intelligent data storytelling",
      color: "from-blue-500 via-purple-500 to-indigo-600",
      delay: "0ms"
    }, 
    { 
      icon: TrendingUp, 
      title: "Business Analysis", 
      description: "Aligning business goals with actionable insights to fuel strategic growth",
      color: "from-green-500 via-emerald-500 to-teal-600",
      delay: "400ms"
    },
    { 
      icon: Code, 
      title: "Full Stack Development", 
      description: "Engineering robust, end-to-end digital experiences with precision and creativity",
      color: "from-pink-500 via-rose-500 to-red-600",
      delay: "200ms"
    }
  ];

  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden relative">
      {/* Cursor follower */}
      <div 
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isLoaded ? 1 : 0})`,
        }}
      >
        <div className="w-full h-full rounded-full bg-white animate-pulse" />
      </div>

      {/* Advanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(219, 39, 119, 0.2) 50%, transparent 100%)',
            left: mousePosition.x / 8 - 400,
            top: mousePosition.y / 8 - 400,
            transform: `scale(${isLoaded ? 1 : 0.5})`,
          }}
        />
        
        {/* Floating geometric shapes */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-xl animate-float"
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10 transition-opacity duration-1000"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
      </div>

      {/* Premium Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${scrollY > 50 ? 'bg-black/20 backdrop-blur-2xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="relative group">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                Portfolio
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative text-gray-300 hover:text-white transition-all duration-500 hover:scale-110 group px-4 py-2"
                  style={{ 
                    animationDelay: `${index * 100 + 300}ms`,
                    animation: isVisible ? 'slideInDown 0.8s ease-out forwards' : 'none'
                  }}
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full group-hover:left-0 transition-all duration-500" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Advanced Animations */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Animated title with stagger effect */}
          <div className="mb-8">
            <div className={`transition-all duration-1200 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 leading-none relative">
                <span className="inline-block animate-gradient-x bg-gradient-to-r from-purple-400 via-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent bg-300% font-extrabold">
                  Data
                </span>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-2xl opacity-50 animate-pulse" />
              </h1>
            </div>
            
            <div className={`transition-all duration-1200 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none relative group">
                <span className="inline-block transition-all duration-500 group-hover:scale-105">
                  Analyst
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </h1>
            </div>
          </div>

          {/* Enhanced description */}
          <div className={`transition-all duration-1200 delay-900 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              I craft{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                extraordinary digital experiences
              </span>
              {' '}with clean code, stunning design, and seamless interactions that captivate and inspire.
            </p>
          </div>

          {/* Premium CTA buttons */}
          <div className={`transition-all duration-1200 delay-1100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl text-white font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden bg-300% animate-gradient-x">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Sparkles className="w-6 h-6 animate-spin" />
                  View My Work
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-300% animate-gradient-x" />
                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl" />
              </button>
              
              <button className="group relative px-10 py-5 border-2 border-white/30 rounded-2xl text-white font-bold text-lg transition-all duration-500 hover:scale-110 hover:bg-white/10 hover:border-white/60 backdrop-blur-xl overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Get In Touch
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl" />
              </button>
            </div>

            {/* Enhanced social links */}
            <div className="flex justify-center space-x-8">
              {[
                { icon: Github, href: "#", label: "GitHub", color: "hover:text-purple-400" },
                { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-400" },
                { icon: Mail, href: "#", label: "Email", color: "hover:text-pink-400" }
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`group relative p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 text-gray-300 ${social.color} hover:scale-125 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25`}
                  style={{ 
                    animationDelay: `${index * 150 + 1300}ms`,
                    animation: isVisible ? 'bounceIn 0.8s ease-out forwards' : 'none'
                  }}
                >
                  <social.icon className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1200 delay-1500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <MousePointer className="w-6 h-6 text-gray-400" />
            <ChevronDown className="w-8 h-8 text-gray-400" />
            <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent" />
          </div>
        </div>
      </section>

      {/* Premium Skills Section */}
      <section ref={skillsRef} className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300 font-medium">What I Excel At</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Expertise &
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Transforming complex challenges into elegant solutions with cutting-edge technology
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"
                style={{ 
                  animationDelay: skill.delay,
                  animation: isVisible ? 'slideInUp 1s ease-out forwards' : 'none'
                }}
              >
                {/* Card background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`} />
                
                {/* Icon container */}
                <div className="relative mb-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                    <skill.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-r ${skill.color} blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500">
                  {skill.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
                  {skill.description}
                </p>

                {/* Hover effect overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CSS for advanced animations */}
      <style jsx>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
}

export default App;