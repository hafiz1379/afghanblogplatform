import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../PostCard";
import LoadingSpinner from "../LoadingSpinner";

const FeaturedPosts = ({ isLoaded, posts, loading }) => (
  <section className="relative py-20 md:py-32 bg-slate-50 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[128px]"></div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
    </div>

    <div className="relative container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-6">
          <svg
            className="w-4 h-4 text-indigo-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-indigo-600">
            Featured Content
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Featured{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Posts
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Discover our most popular and trending articles, handpicked just for
          you
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="w-12 h-1 rounded-full bg-slate-200"></div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className={`transition-all duration-700 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No posts yet
          </h3>
          <p className="text-slate-500 text-center max-w-sm">
            We're working on bringing you amazing content. Check back soon!
          </p>
        </div>
      )}

      {/* View All Button */}
      {posts.length > 0 && (
        <div className="text-center mt-16">
          <Link
            to="/posts"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-1"
          >
            {/* Gradient Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>

            {/* Shine Effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

            {/* Button Content */}
            <span className="relative">View All Posts</span>
            <svg
              className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          {/* Secondary link */}
          <p className="mt-4 text-sm text-slate-500">
            or{" "}
            <Link
              to="/posts"
              className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
            >
              browse by category
            </Link>
          </p>
        </div>
      )}
    </div>
  </section>
);

export default FeaturedPosts;
