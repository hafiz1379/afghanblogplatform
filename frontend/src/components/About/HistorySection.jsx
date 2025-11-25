import React from "react";

const HistorySection = () => {
  const milestones = [
    {
      year: "2025",
      title: "Project Inception",
      description:
        "The Afghan Blog Platform project was conceived, with a clear goal to create a modern, bilingual blogging platform using the MERN stack.",
    },
    {
      year: "2025",
      title: "Backend Development",
      description:
        "The core backend was built with Node.js and Express, establishing secure user authentication, post management, and API endpoints.",
    },
    {
      year: "2025",
      title: "Frontend Creation",
      description:
        "A responsive, modern frontend was developed with React and Tailwind CSS, including a custom design and full internationalization support.",
    },
    {
      year: "2025",
      title: "Feature Integration",
      description:
        "Key features like user profiles, a comment system, and an admin dashboard were successfully integrated, completing the core functionality.",
    },
    {
      year: "2025",
      title: "Beta Launch",
      description:
        "The platform entered its beta phase, inviting a select group of users to test and provide valuable feedback for improvements.",
    },
    {
      year: "2025",
      title: "Future Roadmap",
      description:
        "Planning for future enhancements, including a mobile app, advanced content discovery algorithms, and community-building tools.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Our Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            From a small idea to a thriving community, here are the key moments
            that shaped our platform.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 to-blue-600"></div>

          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Year Badge - Positioned on the line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                <div className="relative">
                  <div className="w-16 h-16 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-blue-600 font-bold">
                      {milestone.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div
                className={`w-full md:w-5/12 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  index % 2 === 0
                    ? "md:mr-auto md:pr-12"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Mobile Year Badge */}
                <div className="md:hidden flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold text-sm">
                      {milestone.year}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {milestone.description}
                </p>
              </div>

              {/* Empty Div for Spacing */}
              <div className="hidden md:block w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
