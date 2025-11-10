import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../PostCard";
import LoadingSpinner from "../LoadingSpinner";

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

export default FeaturedPosts;
