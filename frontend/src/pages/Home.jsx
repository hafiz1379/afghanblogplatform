import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/PostContext";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

// Extracted components for better organization
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

const FeaturedPosts = ({ isLoaded, posts, loading }) => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Posts</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className={`transition-all duration-700 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No posts found.</p>
        </div>
      )}
      <div className="text-center mt-12">
        <Link
          to="/posts"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          View All Posts
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  </section>
);

const CategoryCard = ({ category }) => (
  <div
    className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 text-center cursor-pointer group`}
  >
    <div
      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${category.color}-100 flex items-center justify-center group-hover:bg-${category.color}-200 transition-colors duration-300`}
    >
      <svg
        className={`w-8 h-8 text-${category.color}-600`}
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
    <h3 className="font-semibold text-lg">{category.name}</h3>
  </div>
);

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

const AboutSection = () => (
  <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
    {/* Background Pattern - Fixed the URL encoding issue here */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
    </div>

    <div className="relative container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Afghan Blog
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 text-gray-700">
              Afghan Blog is a platform dedicated to sharing stories, ideas, and
              knowledge from Afghanistan and around the world. Our mission is to
              provide a space where writers can express themselves and readers
              can discover new perspectives.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Whether you're interested in technology, culture, politics, or
              personal stories, you'll find something that resonates with you on
              Afghan Blog.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Learn More
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-blue-200"
              >
                Join Us
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://picsum.photos/seed/afghanblog/600/400.jpg"
                alt="Afghan Blog Team"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  const { posts, loading, getPosts, filters, setFilters } = usePost();
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use useCallback to prevent recreation of functions on every render
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setFilters({ search: searchTerm });
    },
    [searchTerm, setFilters]
  );

  // Load posts initially and whenever filters change
  useEffect(() => {
    getPosts(1, 6, filters);
  }, [getPosts, filters]);

  // Set featured posts when posts are loaded
  useEffect(() => {
    if (posts.length > 0) {
      // Take the first 3 posts as featured
      setFeaturedPosts(posts.slice(0, 3));
      // Trigger animation after component mounts
      setTimeout(() => setIsLoaded(true), 100);
    }
  }, [posts]);

  return (
    <div className="min-h-screen">
      <HeroSection
        isLoaded={isLoaded}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <FeaturedPosts
        isLoaded={isLoaded}
        posts={featuredPosts}
        loading={loading}
      />
      <CategoriesSection />
      <AboutSection />
    </div>
  );
};

export default Home;
