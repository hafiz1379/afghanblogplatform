import React from "react";

const HistorySection = () => {
  const milestones = [
    {
      year: "2025",
      title: "Project Inception",
      description:
        "The Afghan Blog Platform project was conceived, with a clear goal to create a modern, bilingual blogging platform using the MERN stack.",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      color: "indigo",
    },
    {
      year: "2025",
      title: "Backend Development",
      description:
        "The core backend was built with Node.js and Express, establishing secure user authentication, post management, and API endpoints.",
      icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
      color: "purple",
    },
    {
      year: "2025",
      title: "Frontend Creation",
      description:
        "A responsive, modern frontend was developed with React and Tailwind CSS, including a custom design and full internationalization support.",
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "pink",
    },
    {
      year: "2025",
      title: "Feature Integration",
      description:
        "Key features like user profiles, a comment system, and an admin dashboard were successfully integrated, completing the core functionality.",
      icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
      color: "indigo",
    },
    {
      year: "2025",
      title: "Beta Launch",
      description:
        "The platform entered its beta phase, inviting a select group of users to test and provide valuable feedback for improvements.",
      icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
      color: "purple",
    },
    {
      year: "2025",
      title: "Future Roadmap",
      description:
        "Planning for future enhancements, including a mobile app, advanced content discovery algorithms, and community-building tools.",
      icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
      color: "pink",
    },
  ];

  const colorClasses = {
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-600",
      glow: "bg-indigo-500",
      ring: "ring-indigo-100",
      gradient: "from-indigo-500 to-indigo-600",
      lineBg: "bg-indigo-500",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      glow: "bg-purple-500",
      ring: "ring-purple-100",
      gradient: "from-purple-500 to-purple-600",
      lineBg: "bg-purple-500",
    },
    pink: {
      bg: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-600",
      glow: "bg-pink-500",
      ring: "ring-pink-100",
      gradient: "from-pink-500 to-pink-600",
      lineBg: "bg-pink-500",
    },
  };

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-pink-100/40 rounded-full blur-[100px]"></div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "48px 48px",
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium text-indigo-600">
              Milestones
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            From a small idea to a thriving community, here are the key moments
            that shaped our platform.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-purple-300 to-pink-200 transform -translate-x-1/2"></div>

          {/* Mobile Line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-purple-300 to-pink-200"></div>

          {milestones.map((milestone, index) => {
            const colors = colorClasses[milestone.color];
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Center Node - Desktop */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="relative group">
                    {/* Glow */}
                    <div
                      className={`absolute -inset-2 ${colors.glow} rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300`}
                    ></div>

                    {/* Node */}
                    <div
                      className={`relative w-14 h-14 ${colors.bg} border-4 border-white rounded-2xl shadow-lg flex items-center justify-center ring-4 ${colors.ring}`}
                    >
                      <svg
                        className={`w-6 h-6 ${colors.text}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d={milestone.icon}
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Mobile Node */}
                <div className="md:hidden absolute left-6 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 ${colors.bg} border-4 border-white rounded-xl shadow-lg flex items-center justify-center`}
                  >
                    <svg
                      className={`w-5 h-5 ${colors.text}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d={milestone.icon}
                      />
                    </svg>
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`group w-full pl-16 md:pl-0 md:w-5/12 ${
                    isEven ? "md:pr-16" : "md:pl-16"
                  }`}
                >
                  <div className="relative">
                    {/* Card Glow */}
                    <div
                      className={`absolute -inset-1 ${colors.glow} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`}
                    ></div>

                    {/* Card */}
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group-hover:-translate-y-1">
                      {/* Year Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold ${colors.bg} ${colors.text}`}
                        >
                          {milestone.year}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          Step {index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {milestone.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Bottom Gradient Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colors.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`}
                        ></div>
                      </div>
                    </div>

                    {/* Connector Line - Desktop */}
                    <div
                      className={`hidden md:block absolute top-1/2 ${
                        isEven
                          ? "right-0 translate-x-full"
                          : "left-0 -translate-x-full"
                      } w-16 h-px ${colors.lineBg} opacity-30`}
                    ></div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            );
          })}
        </div>

        {/* End Marker */}
        <div className="flex justify-center mt-16">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-slate-500 mt-8">
          And the journey continues...
        </p>
      </div>
    </section>
  );
};

export default HistorySection;
