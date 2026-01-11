import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-100/60 rounded-full blur-[120px]"></div>
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
        <div className="max-w-6xl mx-auto">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-indigo-600">
                Our Story
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              About{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Afghan Blog
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
              Connecting voices, sharing stories, and building bridges through
              the power of words
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-1 rounded-full bg-slate-200"></div>
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              {/* Feature Cards */}
              <div className="space-y-6 mb-10">
                <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        Global Perspectives
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        Afghan Blog is a platform dedicated to sharing stories,
                        ideas, and knowledge from Afghanistan and around the
                        world. Our mission is to provide a space where writers
                        can express themselves.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        Diverse Content
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        Whether you're interested in technology, culture,
                        politics, or personal stories, you'll find something
                        that resonates with you on Afghan Blog.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/about"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-1"
                >
                  {/* Gradient Background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>

                  {/* Shine Effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

                  <span className="relative">Learn More</span>
                  <svg
                    className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>

                {/* Show Join Us ONLY if not logged in */}
                {!isLoggedIn && (
                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl transition-all duration-300 border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <span>Join Us</span>
                    <svg
                      className="w-5 h-5 text-indigo-500 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            {/* Image Section */}
            <div className="order-1 lg:order-2 relative">
              {/* Main Image Container */}
              <div className="relative">
                {/* Decorative Elements Behind */}
                <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-dashed border-slate-200"></div>

                {/* Image Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200">
                  <img
                    src="https://picsum.photos/seed/afghanblog/600/400.jpg"
                    alt="Afghan Blog Team"
                    className="w-full h-auto object-cover"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                </div>

                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">
                        5K+
                      </div>
                      <div className="text-sm text-slate-500">
                        Active Readers
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 md:p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-slate-900">20+</div>
                      <div className="text-slate-500 text-xs">Writers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Glow Effects */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-200/50 rounded-full blur-3xl"></div>
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-200/50 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
