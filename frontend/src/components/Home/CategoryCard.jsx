import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, index }) => {
  // Define color gradients for each category
  const colorGradients = {
    blue: "from-blue-400 to-cyan-500",
    purple: "from-purple-400 to-pink-500",
    green: "from-green-400 to-teal-500",
    red: "from-red-400 to-orange-500",
  };

  // Define icon background colors
  const iconBgColors = {
    blue: "bg-blue-50 group-hover:bg-blue-100",
    purple: "bg-purple-50 group-hover:bg-purple-100",
    green: "bg-green-50 group-hover:bg-green-100",
    red: "bg-red-50 group-hover:bg-red-100",
  };

  // Define icon colors
  const iconColors = {
    blue: "text-blue-500",
    purple: "text-purple-500",
    green: "text-green-500",
    red: "text-red-500",
  };


  return (
    <Link to="/posts" className="block group relative w-full">
      {/* Card with gradient border effect */}
      <div className="relative h-full overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-md sm:shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 sm:hover:-translate-y-3">
        {/* Gradient overlay that appears on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            colorGradients[category.color]
          } opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
        ></div>

        {/* Card content */}
        <div className="relative p-4 sm:p-6 md:p-8">
          {/* Icon container with animated gradient border */}
          <div className="relative mb-4 sm:mb-6">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                colorGradients[category.color]
              } rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-500 scale-110`}
            ></div>
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl sm:rounded-2xl ${
                iconBgColors[category.color]
              } flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
            >
              <svg
                className={`w-8 h-8 sm:w-10 sm:h-10 ${
                  iconColors[category.color]
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={category.icon}
                ></path>
              </svg>
            </div>
          </div>

          {/* Category name with gradient text on hover */}
          <h3 className="font-bold text-lg sm:text-xl text-center mb-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r">
            <span
              className={`block bg-gradient-to-r ${
                colorGradients[category.color]
              } bg-clip-text text-transparent`}
            >
              {category.name}
            </span>
          </h3>

          {/* Category description */}
          <p className="text-gray-600 text-center text-xs sm:text-sm mb-3 sm:mb-4 px-2">
            {category.description ||
              `Explore ${category.name} articles and resources`}
          </p>

          {/* Animated arrow that appears on hover */}
          <div className="flex justify-center opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${
                colorGradients[category.color]
              } p-0.5`}
            >
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    iconColors[category.color]
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div
            className={`absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${
              colorGradients[category.color]
            } opacity-0 group-hover:opacity-20 blur-xl transform translate-x-6 -translate-y-6 sm:translate-x-8 sm:-translate-y-8 transition-all duration-700`}
          ></div>
          <div
            className={`absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${
              colorGradients[category.color]
            } opacity-0 group-hover:opacity-20 blur-xl transform -translate-x-8 translate-y-8 sm:-translate-x-10 sm:translate-y-10 transition-all duration-700`}
          ></div>
        </div>

        {/* Bottom accent bar */}
        <div
          className={`h-1 bg-gradient-to-r ${
            colorGradients[category.color]
          } transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
        ></div>
      </div>
    </Link>
  );
};

export default CategoryCard;
