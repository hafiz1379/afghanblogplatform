import React, { useState, useEffect, useRef } from "react";

// Move stats outside component since it's static data
const STATS_DATA = [
  {
    number: 50,
    label: "Published Articles",
    suffix: "+",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    color: "indigo",
  },
  {
    number: 20,
    label: "Contributing Writers",
    suffix: "+",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    color: "purple",
  },
  {
    number: 1000,
    label: "Monthly Readers",
    suffix: "+",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    color: "pink",
  },
  {
    number: 3,
    label: "Countries Reached",
    suffix: "+",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "emerald",
  },
];

const COLOR_CLASSES = {
  indigo: {
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    numberColor: "text-indigo-600",
    border: "border-indigo-100",
    glow: "bg-indigo-500",
  },
  purple: {
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    numberColor: "text-purple-600",
    border: "border-purple-100",
    glow: "bg-purple-500",
  },
  pink: {
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    numberColor: "text-pink-600",
    border: "border-pink-100",
    glow: "bg-pink-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    numberColor: "text-emerald-600",
    border: "border-emerald-100",
    glow: "bg-emerald-500",
  },
};

const StatsSection = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [counts, setCounts] = useState(STATS_DATA.map(() => 0));
  const sectionRef = useRef(null);

  // Intersection observer for triggering animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isAnimated) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    const target = sectionRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [isAnimated]);

  // Animated counter effect
  useEffect(() => {
    if (!isAnimated) return;

    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);

      setCounts(
        STATS_DATA.map((stat) => Math.round(stat.number * easeOutQuad))
      );

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [isAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-100/60 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-pink-100/50 rounded-full blur-[100px]"></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-6">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-sm font-medium text-indigo-600">
              By the Numbers
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Impact
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Numbers reflect our growing community and the reach of Afghan voices
            around the world.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS_DATA.map((stat, index) => {
            const colors = COLOR_CLASSES[stat.color];

            return (
              <div
                key={index}
                className="group relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 ${colors.glow} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`}
                ></div>

                {/* Card */}
                <div className="relative bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group-hover:-translate-y-1 text-center h-full">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`relative w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      {/* Icon Glow */}
                      <div
                        className={`absolute inset-0 ${colors.glow} rounded-2xl opacity-0 group-hover:opacity-20 blur-lg scale-150 transition-all duration-500`}
                      ></div>
                      <svg
                        className={`relative w-8 h-8 ${colors.iconColor}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d={stat.icon}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Number */}
                  <div
                    className={`text-4xl md:text-5xl font-bold ${
                      colors.numberColor
                    } mb-2 transition-all duration-500 ${
                      isAnimated
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {counts[index].toLocaleString()}
                    <span className="text-3xl md:text-4xl">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <div className="text-slate-600 font-medium">{stat.label}</div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.glow} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center gap-3 mt-16">
          <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-pink-300"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-300"></div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
