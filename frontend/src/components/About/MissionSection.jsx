import React from "react";

const MissionSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/60 rounded-full blur-[120px]"></div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm mb-6">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-sm font-medium text-indigo-600">
                Our Purpose
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-12 h-1 rounded-full bg-slate-200"></div>
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            </div>
          </div>

          {/* Mission Content Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-10 blur-xl"></div>

            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-12">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>

              {/* Mission Text */}
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center mb-8">
                Afghan Blog is a platform dedicated to sharing stories, ideas,
                and knowledge from Afghanistan and around the world. Our mission
                is to provide a space where writers can express themselves and
                readers can discover new perspectives.
              </p>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-center">
                We believe in the{" "}
                <span className="font-semibold text-slate-900">
                  power of words
                </span>{" "}
                to bridge cultures, foster understanding, and inspire change.
              </p>

              {/* Decorative Bottom Elements */}
              <div className="flex items-center justify-center gap-3 mt-10">
                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <div className="w-2 h-2 rounded-full bg-pink-400"></div>
              </div>
            </div>
          </div>

          {/* Values Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                title: "Global Reach",
                description: "Connecting Afghan voices with readers worldwide",
                color: "indigo",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                ),
                title: "Quality Content",
                description: "Curated stories that inform and inspire",
                color: "purple",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                ),
                title: "Community First",
                description: "Building bridges through shared stories",
                color: "pink",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300 text-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    value.color === "indigo"
                      ? "bg-indigo-100 text-indigo-600"
                      : value.color === "purple"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-pink-100 text-pink-600"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {value.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-500 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
