import React, { useState, useEffect, useCallback, useMemo } from "react";
import { usePost } from "../context/PostContext";
import PostCard from "../components/PostCard";

// Extracted components for better organization
const HeroSection = ({ isLoaded }) => (
  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Explore Our Posts
        </h1>
        <p
          className={`text-xl mb-8 transition-all duration-1000 delay-300 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Discover stories, ideas, and knowledge from our community of writers.
        </p>
      </div>
    </div>
  </div>
);

const SearchForm = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  handleCategoryChange,
  handleSearch,
}) => (
  <form onSubmit={handleSearch} className="space-y-4">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-grow relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search posts by title..."
          name="search"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-full md:w-64 relative">
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-200"
          value={categoryFilter}
          name="category"
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="news">News</option>
          <option value="other">Other</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </button>
    </div>
  </form>
);

const CategoryPills = ({
  categories,
  categoryFilter,
  handleCategoryChange,
}) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {categories.map((category) => (
      <button
        key={category.value}
        onClick={() => handleCategoryChange(category.value)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          categoryFilter === category.value
            ? `${category.color} ring-2 ring-offset-2 ring-blue-500`
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {category.label}
      </button>
    ))}
  </div>
);

const SearchAndFilter = ({
  isLoaded,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  handleCategoryChange,
  handleSearch,
  categories,
}) => (
  <div
    className={`bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-1000 delay-500 transform ${
      isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}
  >
    <SearchForm
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      categoryFilter={categoryFilter}
      handleCategoryChange={handleCategoryChange}
      handleSearch={handleSearch}
    />
    <CategoryPills
      categories={categories}
      categoryFilter={categoryFilter}
      handleCategoryChange={handleCategoryChange}
    />
  </div>
);

const ResultsCount = ({ posts, categoryFilter, searchTerm, categories }) => (
  <div className="mb-6 flex items-center justify-between">
    <p className="text-gray-600">
      Showing <span className="font-semibold">{posts.length}</span> posts
      {categoryFilter && (
        <span>
          {" "}
          in{" "}
          <span className="font-semibold">
            {categories.find((c) => c.value === categoryFilter)?.label}
          </span>
        </span>
      )}
      {searchTerm && (
        <span>
          {" "}
          for <span className="font-semibold">"{searchTerm}"</span>
        </span>
      )}
    </p>
  </div>
);

const LoadingPosts = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-56 bg-gray-200 animate-pulse"></div>
        <div className="p-6">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ searchTerm, categoryFilter, onClearFilters }) => (
  <div className="text-center py-16 bg-white rounded-xl shadow-md">
    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
      <svg
        className="w-10 h-10 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
    <p className="text-gray-600 mb-6">
      {searchTerm || categoryFilter
        ? "Try adjusting your search or filter to find what you're looking for."
        : "There are no posts available at the moment."}
    </p>
    {(searchTerm || categoryFilter) && (
      <button
        onClick={onClearFilters}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
      >
        Clear Filters
      </button>
    )}
  </div>
);

const Pagination = ({ currentPage, pagination, handlePageChange }) => {
  if (!pagination || pagination.pages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center space-x-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
          (page) => {
            // Show current page, first page, last page, and pages adjacent to current
            if (
              page === 1 ||
              page === pagination.pages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="px-2 text-gray-500">
                  ...
                </span>
              );
            }
            return null;
          }
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.pages}
          className={`p-2 rounded-lg ${
            currentPage === pagination.pages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

const Posts = () => {
  const { posts, loading, pagination, getPosts, filters } =
    usePost();
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState(filters.category || "");
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoize categories to prevent recreation on every render
  const categories = useMemo(
    () => [
      {
        value: "",
        label: "All Categories",
        color: "bg-gray-100 text-gray-800",
      },
      {
        value: "technology",
        label: "Technology",
        color: "bg-blue-100 text-blue-800",
      },
      {
        value: "lifestyle",
        label: "Lifestyle",
        color: "bg-purple-100 text-purple-800",
      },
      {
        value: "business",
        label: "Business",
        color: "bg-green-100 text-green-800",
      },
      {
        value: "entertainment",
        label: "Entertainment",
        color: "bg-red-100 text-red-800",
      },
      { value: "news", label: "News", color: "bg-indigo-100 text-indigo-800" },
      {
        value: "other",
        label: "Other",
        color: "bg-yellow-100 text-yellow-800",
      },
    ],
    []
  );

  // Use useCallback to prevent recreation of functions on every render
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setCategoryFilter("");
    setCurrentPage(1);
  }, []);

  // Fetch posts whenever filters or page changes
  useEffect(() => {
    getPosts(currentPage, 6, {
      search: searchTerm,
      category: categoryFilter,
    });
    // Trigger animation after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, [currentPage, searchTerm, categoryFilter, getPosts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection isLoaded={isLoaded} />

      <div className="container mx-auto px-4 py-8">
        <SearchAndFilter
          isLoaded={isLoaded}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          handleCategoryChange={handleCategoryChange}
          handleSearch={handleSearch}
          categories={categories}
        />

        {!loading && posts.length > 0 && (
          <ResultsCount
            posts={posts}
            categoryFilter={categoryFilter}
            searchTerm={searchTerm}
            categories={categories}
          />
        )}

        {loading ? (
          <LoadingPosts />
        ) : posts.length > 0 ? (
          <>
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

            <Pagination
              currentPage={currentPage}
              pagination={pagination}
              handlePageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            onClearFilters={clearFilters}
          />
        )}
      </div>
    </div>
  );
};

export default Posts;
