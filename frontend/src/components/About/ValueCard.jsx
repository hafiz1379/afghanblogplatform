import React from "react";

const ValueCard = ({ value, index }) => {
  // Rotating color schemes for visual variety
  const colorSchemes = [
    {
      iconBg: "bg-indigo-50",
      iconBorder: "border-indigo-100",
      iconColor: "text-indigo-600",
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-600",
      glow: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600",
      hoverIconBg: "group-hover:bg-indigo-100",
    },
    {
      iconBg: "bg-purple-50",
      iconBorder: "border-purple-100",
      iconColor: "text-purple-600",
      badgeBg: "bg-purple-50",
      badgeText: "text-purple-600",
      glow: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      hoverIconBg: "group-hover:bg-purple-100",
    },
    {
      iconBg: "bg-pink-50",
      iconBorder: "border-pink-100",
      iconColor: "text-pink-600",
      badgeBg: "bg-pink-50",
      badgeText: "text-pink-600",
      glow: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600",
      hoverIconBg: "group-hover:bg-pink-100",
    },
    {
      iconBg: "bg-emerald-50",
      iconBorder: "border-emerald-100",
      iconColor: "text-emerald-600",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-600",
      glow: "bg-emerald-500",
      gradient: "from-emerald-500 to-emerald-600",
      hoverIconBg: "group-hover:bg-emerald-100",
    },
  ];

  const scheme = colorSchemes[index % colorSchemes.length];

  return (
    <div className="group relative h-full">
      {/* Glow Effect on Hover */}
      <div
        className={`absolute -inset-1 ${scheme.glow} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`}
      ></div>

      {/* Card */}
      <div className="relative h-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center transition-all duration-500 group-hover:border-slate-300 group-hover:shadow-xl group-hover:-translate-y-2 overflow-hidden">
        {/* Subtle Gradient Background on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
        ></div>

        {/* Card Number Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${scheme.badgeBg} ${scheme.badgeText}`}
          >
            0{index + 1}
          </span>
        </div>

        {/* Icon Container */}
        <div className="relative mb-6 inline-block">
          {/* Icon Glow */}
          <div
            className={`absolute inset-0 ${scheme.glow} rounded-2xl opacity-0 group-hover:opacity-20 blur-lg scale-150 transition-all duration-500`}
          ></div>

          <div
            className={`relative w-16 h-16 ${scheme.iconBg} ${scheme.iconBorder} ${scheme.hoverIconBg} border rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110`}
          >
            <svg
              className={`w-8 h-8 ${scheme.iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d={value.icon}
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            {value.title}
          </h3>
          <p className="text-slate-500 leading-relaxed">{value.description}</p>
        </div>

        {/* Animated Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl">
          <div
            className={`h-full bg-gradient-to-r ${scheme.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`}
          ></div>
        </div>

        {/* Corner Decoration */}
        <div
          className={`absolute -bottom-10 -right-10 w-20 h-20 ${scheme.glow} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-700`}
        ></div>
      </div>
    </div>
  );
};

export default ValueCard;
