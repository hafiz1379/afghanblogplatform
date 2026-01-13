import React, { useState, useEffect, useCallback, useMemo } from "react";
import { usePost } from "../context/PostContext";
import PostCard from "../components/PostCard";

// Hero Section
const HeroSection = ({ isLoaded }) => (
  <div className="relative bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-100/60 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-pink-100/50 rounded-full blur-[100px]"></div>

      {/* Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      ></div>
    </div>

    <div className="relative container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-6 transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <svg
            className="w-4 h-4 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <span className="text-sm font-medium text-indigo-600">
            Blog Posts
          </span>
        </div>

        {/* Title */}
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 transition-all duration-1000 delay-100 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Explore Our{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Stories
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Discover stories, ideas, and knowledge from our community of writers.
        </p>

        {/* Decorative Line */}
        <div
          className={`flex items-center justify-center gap-2 transition-all duration-1000 delay-300 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="w-12 h-1 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </div>
  </div>
);

// Search Form
const SearchForm = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  handleCategoryChange,
  handleSearch,
}) => (
  <form onSubmit={handleSearch} className="space-y-4">
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search Input */}
      <div className="flex-grow relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200"
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
          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Select */}
      <div className="w-full md:w-64 relative group">
        <select
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white appearance-none transition-all duration-200 cursor-pointer"
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
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400"
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

      {/* Search Button */}
      <button
        type="submit"
        className="group relative inline-flex items-center justify-center"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover:opacity-100 transition-all duration-300"></div>
        <span className="relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3.5 rounded-xl font-medium transition-all duration-200">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </span>
      </button>
    </div>
  </form>
);

// Category Pills
const CategoryPills = ({
  categories,
  categoryFilter,
  handleCategoryChange,
}) => (
  <div className="flex flex-wrap gap-2 mt-6">
    {categories.map((category) => (
      <button
        key={category.value}
        onClick={() => handleCategoryChange(category.value)}
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          categoryFilter === category.value
            ? `${category.activeBg} ${category.activeText} ring-2 ring-offset-2 ${category.ring}`
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        {categoryFilter === category.value && (
          <span className={`w-1.5 h-1.5 rounded-full ${category.dot}`}></span>
        )}
        {category.label}
      </button>
    ))}
  </div>
);

// Search and Filter Section
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
    className={`relative group transition-all duration-1000 delay-400 transform ${
      isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}
  >
    {/* Card Glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>

    {/* Card */}
    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 md:p-8 mb-8">
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
  </div>
);

// Results Count
const ResultsCount = ({ posts, categoryFilter, searchTerm, categories }) => (
  <div className="mb-8 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>
      <p className="text-slate-600">
        Showing{" "}
        <span className="font-semibold text-slate-900">{posts.length}</span>{" "}
        posts
        {categoryFilter && (
          <span>
            {" "}
            in{" "}
            <span className="font-semibold text-indigo-600">
              {categories.find((c) => c.value === categoryFilter)?.label}
            </span>
          </span>
        )}
        {searchTerm && (
          <span>
            {" "}
            for{" "}
            <span className="font-semibold text-slate-900">"{searchTerm}"</span>
          </span>
        )}
      </p>
    </div>
  </div>
);

// Loading Skeleton
const LoadingPosts = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-6">
          {/* Category skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-7 w-24 bg-slate-100 rounded-lg animate-pulse"></div>
            <div className="h-4 w-16 bg-slate-100 rounded animate-pulse"></div>
          </div>

          {/* Date skeleton */}
          <div className="h-3 w-20 bg-slate-100 rounded animate-pulse mb-3"></div>

          {/* Title skeleton */}
          <div className="h-6 bg-slate-100 rounded-lg w-full mb-2 animate-pulse"></div>
          <div className="h-6 bg-slate-100 rounded-lg w-3/4 mb-4 animate-pulse"></div>

          {/* Excerpt skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded w-2/3 animate-pulse"></div>
          </div>

          {/* Author skeleton */}
          <div className="flex items-center pb-4 border-b border-slate-100 mb-4">
            <div className="h-10 w-10 bg-slate-100 rounded-full animate-pulse"></div>
            <div className="ml-3">
              <div className="h-4 w-24 bg-slate-100 rounded animate-pulse mb-1"></div>
              <div className="h-3 w-16 bg-slate-100 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Stats skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="h-8 w-14 bg-slate-100 rounded-lg animate-pulse"></div>
              <div className="h-8 w-14 bg-slate-100 rounded-lg animate-pulse"></div>
              <div className="h-8 w-14 bg-slate-100 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-5 w-12 bg-slate-100 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="h-1 bg-slate-100"></div>
      </div>
    ))}
  </div>
);

// Empty State
const EmptyState = ({ searchTerm, categoryFilter, onClearFilters }) => (
  <div className="relative group">
    {/* Card Glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-5 blur-xl"></div>

    {/* Card */}
    <div className="relative text-center py-16 px-8 bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50">
      {/* Icon */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-slate-900 mb-3">No posts found</h3>

      {/* Description */}
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        {searchTerm || categoryFilter
          ? "Try adjusting your search or filter to find what you're looking for."
          : "There are no posts available at the moment. Check back soon!"}
      </p>

      {/* Clear Filters Button */}
      {(searchTerm || categoryFilter) && (
        <button
          onClick={onClearFilters}
          className="group relative inline-flex items-center justify-center"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover:opacity-100 transition-all duration-300"></div>
          <span className="relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear Filters
          </span>
        </button>
      )}
    </div>
  </div>
);

// Pagination
const Pagination = ({ currentPage, pagination, handlePageChange }) => {
  if (!pagination || pagination.pages <= 1) return null;

  return (
    <div className="mt-16 flex justify-center">
      <nav className="inline-flex items-center gap-2 p-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-3 rounded-xl transition-all duration-200 ${
            currentPage === 1
              ? "bg-slate-50 text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
            (page) => {
              if (
                page === 1 ||
                page === pagination.pages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[44px] h-11 px-4 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 text-slate-400">
                    •••
                  </span>
                );
              }
              return null;
            }
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.pages}
          className={`p-3 rounded-xl transition-all duration-200 ${
            currentPage === pagination.pages
              ? "bg-slate-50 text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
  const { posts, loading, pagination, getPosts, filters } = usePost();
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState(filters.category || "");
  const [isLoaded, setIsLoaded] = useState(false);

  // categories
  const categories = useMemo(
    () => [
      {
        value: "",
        label: "All",
        activeBg: "bg-slate-100",
        activeText: "text-slate-900",
        ring: "ring-slate-300",
        dot: "bg-slate-500",
      },
      {
        value: "technology",
        label: "Technology",
        activeBg: "bg-indigo-50",
        activeText: "text-indigo-700",
        ring: "ring-indigo-300",
        dot: "bg-indigo-500",
      },
      {
        value: "lifestyle",
        label: "Lifestyle",
        activeBg: "bg-purple-50",
        activeText: "text-purple-700",
        ring: "ring-purple-300",
        dot: "bg-purple-500",
      },
      {
        value: "business",
        label: "Business",
        activeBg: "bg-emerald-50",
        activeText: "text-emerald-700",
        ring: "ring-emerald-300",
        dot: "bg-emerald-500",
      },
      {
        value: "entertainment",
        label: "Entertainment",
        activeBg: "bg-pink-50",
        activeText: "text-pink-700",
        ring: "ring-pink-300",
        dot: "bg-pink-500",
      },
      {
        value: "news",
        label: "News",
        activeBg: "bg-amber-50",
        activeText: "text-amber-700",
        ring: "ring-amber-300",
        dot: "bg-amber-500",
      },
      {
        value: "other",
        label: "Other",
        activeBg: "bg-slate-100",
        activeText: "text-slate-700",
        ring: "ring-slate-300",
        dot: "bg-slate-500",
      },
    ],
    []
  );

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

  useEffect(() => {
    getPosts(currentPage, 6, {
      search: searchTerm,
      category: categoryFilter,
    });
    setTimeout(() => setIsLoaded(true), 100);
  }, [currentPage, searchTerm, categoryFilter, getPosts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <HeroSection isLoaded={isLoaded} />

      <div className="container mx-auto px-4 py-12">
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

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center gap-3 mt-16">
          <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-pink-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
