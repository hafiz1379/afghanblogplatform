import React from "react";

const MissionSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Afghan Blog is a platform dedicated to sharing stories, ideas, and
            knowledge from Afghanistan and around the world. Our mission is to
            provide a space where writers can express themselves and readers can
            discover new perspectives. We believe in the power of words to
            bridge cultures, foster understanding, and inspire change.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
