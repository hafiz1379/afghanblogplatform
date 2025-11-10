import React from "react";

const HeroSection = ({ isLoaded, searchTerm, setSearchTerm, handleSearch }) => (
  <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
    </div>

    {/* Animated Background Elements */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

    <div className="relative container mx-auto px-4 py-20 md:py-28">
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Afghan Blog Platform
        </h1>
        <p
          className={`text-xl md:text-2xl mb-8 transition-all duration-1000 delay-300 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Discover stories, ideas, and knowledge from writers around the world.
        </p>
        <form
          onSubmit={handleSearch}
          className={`max-w-lg mx-auto transition-all duration-1000 delay-500 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative group">
            <label htmlFor="searchInput" className="sr-only">
              Search posts
            </label>
            <input
              type="text"
              id="searchInput"
              name="search"
              placeholder="Search posts..."
              className="w-full px-6 py-4 pr-12 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </form>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-4 mt-16 transition-all duration-1000 delay-700 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm opacity-80">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">20+</div>
            <div className="text-sm opacity-80">Writers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">5K+</div>
            <div className="text-sm opacity-80">Readers</div>
          </div>
        </div>
      </div>
    </div>

    {/* Wave Separator */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg
        className="w-full h-12 md:h-24 fill-current text-white"
        viewBox="0 0 1440 54"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"></path>
      </svg>
    </div>
  </section>
);

export default HeroSection;
