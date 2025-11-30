import React, { useState, useEffect } from "react";

const StatsSection = () => {
  const stats = [
    { number: 50, label: "Published Articles", suffix: "+" },
    { number: 20, label: "Contributing Writers", suffix: "+" },
    { number: 1000, label: "Monthly Readers", suffix: "+" },
    { number: 3, label: "Countries Reached", suffix: "+" },
  ];

  // State to trigger animation when component is in view
  const [isAnimated, setIsAnimated] = useState(false);

  // Simple intersection observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    const target = document.getElementById("stats-container");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  return (
    <section
      id="stats-container"
      className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-800 text-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <div className="w-24 h-1 bg-white mx-auto opacity-80"></div>
          <p className="text-lg mt-4 max-w-2xl mx-auto opacity-90">
            Numbers reflect our growing community and the reach of Afghan voices
            around the world.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative inline-flex items-center justify-center mb-4">
                {/* Animated Counter Background Circle */}
                <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 bg-white opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-300"></div>

                {/* The Number */}
                <div
                  className={`text-4xl md:text-5xl font-bold relative z-10 transition-all duration-1000 ${
                    isAnimated ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                  }}
                >
                  {isAnimated ? (
                    <span>
                      {stat.number.toLocaleString()}
                      <span className="text-3xl md:text-4xl">
                        {stat.suffix}
                      </span>
                    </span>
                  ) : (
                    <span>0</span>
                  )}
                </div>
              </div>
              <div className="text-lg md:text-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
