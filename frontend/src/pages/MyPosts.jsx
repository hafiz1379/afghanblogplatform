import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";

// Category color mapping
const CATEGORY_COLORS = {
  Technology: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-100",
    dot: "bg-indigo-500",
  },
  Culture: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
    dot: "bg-purple-500",
  },
  Travel: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
  },
  Food: {
    bg: "bg-pink-50",
    text: "text-pink-600",
    border: "border-pink-100",
    dot: "bg-pink-500",
  },
  Lifestyle: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-100",
    dot: "bg-amber-500",
  },
  default: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
};

const getCategoryColors = (category) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
};

// Post Card Component
const PostCard = ({ post, onDelete, formattedDate, index }) => {
  const categoryColors = getCategoryColors(post.category);

  return (
    <div
      className="group relative"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Card Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>

      {/* Card */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group-hover:border-slate-300 group-hover:-translate-y-1">
        <div className="p-6 flex-grow">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${categoryColors.bg} ${categoryColors.text} ${categoryColors.border}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${categoryColors.dot}`}
              ></span>
              {post.category || "Uncategorized"}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold mb-3 text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {post.content.substring(0, 120)}...
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{post.comments?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{post.likes?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <Link
              to={`/posts/${post._id}`}
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors duration-200 group/link"
            >
              Read More
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                to={`/edit-post/${post._id}`}
                className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200"
                title="Edit Post"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </Link>
              <button
                onClick={() => onDelete(post._id)}
                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
                title="Delete Post"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="h-1 w-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="relative group">
    {/* Card Glow */}
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-5 blur-xl"></div>

    {/* Card */}
    <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-12 text-center">
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
      <h2 className="text-2xl font-bold text-slate-900 mb-3">No Posts Yet</h2>

      {/* Description */}
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        You haven't created any posts yet. Start sharing your thoughts and ideas
        with the community.
      </p>

      {/* CTA Button */}
      <Link
        to="/create-post"
        className="group/btn relative inline-flex items-center justify-center"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover/btn:opacity-100 transition-all duration-300"></div>
        <span className="relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Your First Post
        </span>
      </Link>
    </div>
  </div>
);

// Delete Modal Component
const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
          onClick={onCancel}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
          {/* Header */}
          <div className="p-6 text-center">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 rounded-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Delete Post
            </h3>

            {/* Description */}
            <p className="text-slate-600">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              type="button"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-3 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors duration-200"
              onClick={onConfirm}
            >
              Delete Post
            </button>
          </div>

          {/* Bottom Line */}
          <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div>
        </div>
      </div>
    </div>
  );
};

const MyPosts = () => {
  const { user } = useAuth();
  const { posts, loading, getPosts, deletePost } = usePost();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const formattedDates = useMemo(() => {
    return posts.reduce((acc, post) => {
      acc[post._id] = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
      });
      return acc;
    }, {});
  }, [posts]);

  const handleDeletePost = useCallback((postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  }, []);

  const confirmDeletePost = useCallback(async () => {
    if (postToDelete) {
      await deletePost(postToDelete);
      toast.success("Post deleted successfully");
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  }, [postToDelete, deletePost]);

  const cancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  }, []);

  useEffect(() => {
    if (user && user._id) {
      getPosts(1, 100, { author: user._id });
    }
  }, [user, getPosts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-pink-100/40 rounded-full blur-[120px]"></div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="relative group mb-10">
          {/* Card Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>

          {/* Card */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 md:p-8 overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full"></div>

            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 mb-4">
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span className="text-sm font-medium text-indigo-600">
                    Content Management
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  My{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Posts
                  </span>
                </h1>

                <p className="text-slate-600 mb-4">
                  Manage and organize all your posts in one place
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {posts.length} {posts.length === 1 ? "Post" : "Posts"}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {posts.reduce(
                      (acc, post) => acc + (post.views || 0),
                      0
                    )}{" "}
                    Total Views
                  </span>
                </div>
              </div>

              {/* Create Button */}
              <Link
                to="/create-post"
                className="group/btn relative inline-flex items-center justify-center"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover/btn:opacity-100 transition-all duration-300"></div>
                <span className="relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200">
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Post
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handleDeletePost}
                formattedDate={formattedDates[post._id]}
                index={index}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-pink-300"></div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onConfirm={confirmDeletePost}
        onCancel={cancelDelete}
      />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MyPosts;
