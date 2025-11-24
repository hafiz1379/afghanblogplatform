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

  useEffect(() => {
    // Cycle through loading texts
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingTexts.indexOf(prev);
        return loadingTexts[(currentIndex + 1) % loadingTexts.length];
      });
    }, 2000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 300);

    // Cleanup function to clear intervals when the component unmounts
    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []); 

  return (
    // Main container with glassmorphism effect
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      </div>

      {/* Logo and Spinner Container */}
      <div className="relative mb-12 z-10">
        {/* Outer ring with gradient */}
        <div className="w-32 h-32 rounded-full border-4 border-gray-200 bg-white/50 backdrop-blur-sm shadow-lg"></div>

        {/* Inner spinning ring with gradient */}
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-4 border-transparent border-t-blue-600 border-r-teal-500 animate-spin shadow-lg"></div>

        {/* Center Logo with enhanced styling */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        </div>

        {/* Orbiting dots */}
        <div className="absolute top-0 left-0 w-32 h-32">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-teal-500 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 bg-teal-400 rounded-full animate-ping"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>

      {/* Loading Text with typewriter effect */}
      <div className="text-center z-10 mb-8">
        <p className="text-gray-700 text-2xl font-light tracking-wide transition-all duration-500">
          {loadingText}
        </p>
        <p className="text-gray-500 text-sm mt-2 animate-pulse">
          Please wait, we're preparing amazing content for you.
        </p>
      </div>

      {/* Progress Bar with enhanced styling */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200/50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full filter blur-xl opacity-40 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-teal-100 rounded-full filter blur-xl opacity-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );
};

export default HomeLoading;
