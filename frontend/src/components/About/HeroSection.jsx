import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-indigo-50 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-200/50 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-200/50 rounded-full blur-[128px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-pink-200/30 rounded-full blur-[150px]"></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400/30 rounded-full animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-indigo-100 shadow-sm mb-8 backdrop-blur-sm">
            <svg
              className="w-4 h-4 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium text-indigo-600">
              Our Story
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-slate-900">About</span>
            <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Afghan Blog
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            Discover the story, mission, and purpose behind the platform that
            brings Afghan voices to the world and connects communities through
            the power of storytelling.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { value: "2025", label: "Founded" },
              { value: "50+", label: "Articles" },
              { value: "20+", label: "Writers" },
              { value: "5K+", label: "Readers" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 md:h-24"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 24C240 74 480 74 720 49C960 24 1200 24 1440 49V74H0V24Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Side Decorations */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
        <div className="w-2 h-8 rounded-full bg-gradient-to-b from-indigo-400 to-purple-400"></div>
        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
      </div>

      <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
        <div className="w-2 h-8 rounded-full bg-gradient-to-b from-purple-400 to-pink-400"></div>
        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
      </div>
    </section>
  );
};

export default HeroSection;
