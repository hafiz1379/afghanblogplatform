import React, { useState } from "react";

const TEAM_MEMBERS = [
  {
    name: "Hafizullah Rasa",
    role: "Founder & Developer",
    image: "https://avatars.githubusercontent.com/u/117447018?v=4",
    bio: "Passionate developer dedicated to creating meaningful digital experiences. I built this platform from the ground up with a focus on user experience, performance, and clean code.",
    skills: ["React", "Node.js", "MongoDB", "Full-Stack"],
    social: {
      github: "https://github.com/hafiz1379",
      linkedin: "https://www.linkedin.com/in/hafiz1379/",
    },
  },
];

const TeamSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-[120px]"></div>
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
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 shadow-sm mb-6">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm font-medium text-purple-600">
              The Creator
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet The{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Developer
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            The passionate individual behind this platform, dedicated to
            building a seamless and engaging experience for all users.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Team Card */}
        <div className="max-w-4xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>

              {/* Main Card */}
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden transition-all duration-500 group-hover:border-slate-300 group-hover:shadow-2xl">
                <div className="md:flex">
                  {/* Image Container */}
                  <div className="md:w-2/5 relative">
                    {/* Gradient Overlay Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>

                    {/* Image */}
                    <div className="relative h-72 md:h-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          hoveredIndex === index
                            ? "scale-110 opacity-90"
                            : "scale-100 opacity-100"
                        }`}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

                      {/* Social Links Overlay */}
                      <div
                        className={`absolute inset-0 flex items-end justify-center pb-8 transition-all duration-300 ${
                          hoveredIndex === index
                            ? "opacity-100"
                            : "opacity-0 md:opacity-0"
                        }`}
                      >
                        <div className="flex gap-4">
                          {member.social.github && (
                            <a
                              href={member.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/40 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                              aria-label={`${member.name}'s GitHub`}
                            >
                              <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/40 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                              aria-label={`${member.name}'s LinkedIn`}
                            >
                              <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Mobile Social Links - Always visible on small screens */}
                      <div className="absolute bottom-4 left-4 flex gap-3 md:hidden">
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                            aria-label={`${member.name}'s GitHub`}
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-3/5 p-8 md:p-10 lg:p-12">
                    {/* Role Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-4">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                      <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {member.role}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                      {member.name}
                    </h3>

                    {/* Bio */}
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => {
                          const skillColors = [
                            "bg-indigo-50 text-indigo-600 border-indigo-100",
                            "bg-purple-50 text-purple-600 border-purple-100",
                            "bg-pink-50 text-pink-600 border-pink-100",
                            "bg-emerald-50 text-emerald-600 border-emerald-100",
                          ];
                          return (
                            <span
                              key={skill}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:scale-105 ${
                                skillColors[skillIndex % skillColors.length]
                              }`}
                            >
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Desktop Social Links */}
                    <div className="hidden md:flex items-center gap-4">
                      <span className="text-sm text-slate-400">Connect:</span>
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300 hover:scale-110"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300 hover:scale-110"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          ))}
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

export default TeamSection;
