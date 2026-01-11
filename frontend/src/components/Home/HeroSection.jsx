import React from "react";

const HeroSection = ({ isLoaded, searchTerm, setSearchTerm, handleSearch }) => (
  <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[128px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-200/30 rounded-full blur-[128px]"></div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      ></div>
    </div>

    {/* Floating Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-indigo-300/40 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
          }}
        ></div>
      ))}
    </div>

    <div className="relative container mx-auto px-4 py-20 md:py-32 z-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-indigo-100 shadow-sm mb-8 transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-slate-600 font-medium">
            Discover Amazing Stories
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="block text-slate-900">Afghan Blog</span>
          <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Platform
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-200 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Discover stories, ideas, and knowledge from writers around the world.
          <span className="text-slate-700 font-medium">
            {" "}
            Join our community of creators and readers.
          </span>
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className={`max-w-xl mx-auto transition-all duration-1000 delay-400 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 group-focus-within:opacity-25 blur-xl transition-opacity duration-500"></div>

            <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300">
              {/* Search Icon */}
              <div className="pl-5 pr-3">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <label htmlFor="searchInput" className="sr-only">
                Search posts
              </label>
              <input
                type="text"
                id="searchInput"
                name="search"
                placeholder="Search articles, topics, or authors..."
                className="flex-1 bg-transparent py-4 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button
                type="submit"
                className="relative m-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 group/btn"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                <span className="relative">Search</span>
              </button>
            </div>
          </div>

          {/* Quick Search Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Technology", "Culture", "Travel", "Food"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchTerm(tag)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all duration-200 shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-3 gap-4 md:gap-8 mt-16 md:mt-20 transition-all duration-1000 delay-600 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {[
            { value: "50+", label: "Articles", icon: "📝" },
            { value: "20+", label: "Writers", icon: "✍️" },
            { value: "5K+", label: "Readers", icon: "👥" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group relative p-4 md:p-6 rounded-2xl bg-white/80 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="text-2xl mb-2 hidden md:block">{stat.icon}</div>
                <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          className={`mt-16 transition-all duration-1000 delay-700 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <span className="text-xs uppercase tracking-widest">
              Scroll to explore
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center p-2">
              <div className="w-1 h-2 bg-slate-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Gradient Fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
  </section>
);

export default HeroSection;
