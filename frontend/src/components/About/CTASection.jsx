import React from "react";
import { Link } from "react-router-dom";

const CTASection = ({ isAuthenticated }) => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-100/60 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-pink-100/50 rounded-full blur-[100px]"></div>

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
        {/* Main Card */}
        <div className="relative max-w-4xl mx-auto">
          {/* Card Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-10 blur-2xl"></div>

          {/* Card */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-12 lg:p-16 text-center overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-transparent rounded-br-full opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-100 to-transparent rounded-tl-full opacity-50"></div>

            {/* Badge */}
            <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-6">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="text-sm font-medium text-indigo-600">
                Join Us Today
              </span>
            </div>

            {/* Title */}
            <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Join Our{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Community
              </span>
            </h2>

            {/* Description */}
            <p className="relative text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you're a writer looking to share your story or a reader
              eager to explore new ideas, Afghan Blog welcomes you. Become a
              part of our growing community today.
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-2 mb-10">
              <div className="w-12 h-1 rounded-full bg-slate-200"></div>
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            </div>

            {/* Buttons */}
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="group relative inline-flex items-center justify-center"
                >
                  {/* Button Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover:opacity-100 transition-all duration-300"></div>

                  {/* Button */}
                  <span className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 group-hover:shadow-lg">
                    Sign Up Now
                    <svg
                      className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
                  </span>
                </Link>
              )}

              <Link
                to="/posts"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                Explore Posts
                <svg
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
            </div>

            {/* Trust Indicators */}
            <div className="relative flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-500">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Free to Join</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Instant Access</span>
              </div>
            </div>

            {/* Bottom Gradient Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center gap-3 mt-16">
          <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-pink-300"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
