import React, { useState, useEffect } from "react";

const loadingTexts = [
  "Loading Afghan Blog",
  "Preparing amazing content",
  "Setting up your experience",
  "Almost there...",
];

const HomeLoading = () => {
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Cycle through loading texts
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
      setLoadingText(loadingTexts[(textIndex + 1) % loadingTexts.length]);
    }, 2000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [textIndex]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-200/40 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-200/30 rounded-full blur-[150px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Logo and Spinner Container */}
      <div className="relative mb-12 z-10">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 scale-150 animate-pulse"></div>

        {/* Outer Ring */}
        <div className="relative w-36 h-36">
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl"></div>

          {/* Spinning Gradient Ring */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            style={{ animationDuration: "2s" }}
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="180 360"
            />
          </svg>

          {/* Secondary Spinning Ring (opposite direction) */}
          <svg
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-spin"
            style={{ animationDuration: "3s", animationDirection: "reverse" }}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="60 360"
            />
          </svg>

          {/* Center Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
        </div>

        {/* Orbiting Dots */}
        <div
          className="absolute inset-0 w-36 h-36 animate-spin"
          style={{ animationDuration: "8s" }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
        </div>
        <div
          className="absolute inset-0 w-36 h-36 animate-spin"
          style={{ animationDuration: "8s", animationDelay: "-2s" }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
        </div>
        <div
          className="absolute inset-0 w-36 h-36 animate-spin"
          style={{ animationDuration: "8s", animationDelay: "-4s" }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center z-10 mb-8 px-4">
        <div className="overflow-hidden h-10 mb-3">
          <p
            className="text-slate-800 text-2xl md:text-3xl font-semibold tracking-tight transition-all duration-500 transform"
            key={loadingText}
            style={{
              animation: "slideUp 0.5s ease-out",
            }}
          >
            {loadingText}
          </p>
        </div>
        <p className="text-slate-500 text-sm md:text-base">
          Please wait while we prepare your experience
        </p>
      </div>

      {/* Progress Section */}
      <div className="z-10 w-full max-w-xs px-4">
        {/* Progress Bar Container */}
        <div className="relative h-2 bg-slate-200/60 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse"></div>

          {/* Progress Fill */}
          <div
            className="relative h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-slate-400">Loading...</span>
          <span className="text-xs font-medium text-slate-600">
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-float opacity-60"></div>
      <div
        className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-60"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-32 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-60"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-32 right-20 w-3 h-3 bg-indigo-300 rounded-full animate-float opacity-60"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </div>
  );
};

export default HomeLoading;
