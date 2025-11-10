import React, { useMemo } from "react";
import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
  // Memoize categories to prevent recreation on every render
  const categories = useMemo(
    () => [
      {
        name: "Technology",
        icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        color: "blue",
      },
      {
        name: "lifestyle",
        icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
        color: "purple",
      },
      {
        name: "Business",
        icon: "M3 10h11v11H3zM16 4h5v5h-5zM16 14h5v7h-5z",
        color: "green",
      },
      {
        name: "Entertainment",
        icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z",
        color: "red",
      },
    ],
    []
  );

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Categories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
