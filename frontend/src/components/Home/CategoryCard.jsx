import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, index }) => {
  // Modern color palette - light theme
  const colorSchemes = {
    indigo: {
      gradient: "from-indigo-500 to-indigo-600",
      glow: "bg-indigo-500",
      icon: "text-indigo-600",
      iconBg: "bg-indigo-50",
      border: "border-indigo-100",
      badge: "bg-indigo-50 text-indigo-600",
    },
    purple: {
      gradient: "from-purple-500 to-purple-600",
      glow: "bg-purple-500",
      icon: "text-purple-600",
      iconBg: "bg-purple-50",
      border: "border-purple-100",
      badge: "bg-purple-50 text-purple-600",
    },
    pink: {
      gradient: "from-pink-500 to-pink-600",
      glow: "bg-pink-500",
      icon: "text-pink-600",
      iconBg: "bg-pink-50",
      border: "border-pink-100",
      badge: "bg-pink-50 text-pink-600",
    },
    emerald: {
      gradient: "from-emerald-500 to-emerald-600",
      glow: "bg-emerald-500",
      icon: "text-emerald-600",
      iconBg: "bg-emerald-50",
      border: "border-emerald-100",
      badge: "bg-emerald-50 text-emerald-600",
    },
  };

  // Map old colors to new scheme
  const colorMap = {
    blue: "indigo",
    purple: "purple",
    green: "emerald",
    red: "pink",
  };

  const scheme = colorSchemes[colorMap[category.color] || "indigo"];

  return (
    <Link to="/posts" className="block group relative w-full h-full">
      {/* Glow Effect on Hover */}
      <div
        className={`absolute -inset-1 ${scheme.glow} rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500`}
      ></div>

      {/* Main Card */}
      <div className="relative h-full overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group-hover:border-slate-300 group-hover:shadow-xl group-hover:-translate-y-2">
        {/* Gradient Background on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
        ></div>

        {/* Card Content */}
        <div className="relative p-6 sm:p-8 flex flex-col items-center">
          {/* Icon Container */}
          <div className="relative mb-6">
            {/* Animated Glow Ring */}
            <div
              className={`absolute inset-0 ${scheme.glow} rounded-2xl opacity-0 group-hover:opacity-20 blur-lg scale-150 transition-all duration-500`}
            ></div>

            {/* Icon Background */}
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${scheme.iconBg} border ${scheme.border} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              <svg
                className={`w-8 h-8 sm:w-10 sm:h-10 ${scheme.icon} transition-transform duration-300 group-hover:scale-110`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d={category.icon}
                />
              </svg>
            </div>
          </div>

          {/* Category Name */}
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-3 transition-colors duration-300">
            {category.name}
          </h3>

          {/* Category Description */}
          <p className="text-slate-500 text-center text-sm leading-relaxed mb-6 line-clamp-2">
            {category.description ||
              `Explore ${category.name} articles and resources`}
          </p>

          {/* Post Count Badge */}
          {category.count && (
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${scheme.badge} mb-4`}
            >
              {category.count} articles
            </div>
          )}

          {/* Arrow Button */}
          <div className="mt-auto pt-2 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${scheme.gradient} text-white text-sm font-medium shadow-lg`}
            >
              <span>Explore</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div
          className={`absolute -top-12 -right-12 w-24 h-24 ${scheme.glow} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-700`}
        ></div>
        <div
          className={`absolute -bottom-12 -left-12 w-24 h-24 ${scheme.glow} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-700`}
        ></div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${scheme.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
