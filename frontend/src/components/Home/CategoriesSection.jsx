import React, { useMemo } from "react";
import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
  const categories = useMemo(
    () => [
      {
        name: "Technology",
        description: "Latest tech trends, gadgets, and innovations",
        icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        color: "blue",
        count: 24,
      },
      {
        name: "Lifestyle",
        description: "Tips for better living and personal growth",
        icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        color: "purple",
        count: 18,
      },
      {
        name: "Business",
        description: "Entrepreneurship and career insights",
        icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        color: "green",
        count: 15,
      },
      {
        name: "Entertainment",
        description: "Movies, music, and pop culture news",
        icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
        color: "red",
        count: 21,
      },
    ],
    []
  );

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-purple-100/60 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-indigo-100/60 rounded-full blur-[100px]"></div>

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 shadow-sm mb-6">
            <svg
              className="w-4 h-4 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span className="text-sm font-medium text-purple-600">
              Browse Topics
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Popular{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
            Discover content tailored to your interests across our diverse range
            of topics
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CategoryCard category={category} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm">
            Can't find what you're looking for?{" "}
            <a
              href="/posts"
              className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
            >
              Browse all posts
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
