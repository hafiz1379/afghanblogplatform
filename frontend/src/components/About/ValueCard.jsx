import React from "react";

const ValueCard = ({ value, index }) => {
  return (
    <div
      key={index}
      className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
    >
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={value.icon}
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {value.title}
      </h3>
      <p className="text-gray-600">{value.description}</p>
    </div>
  );
};

export default ValueCard;
