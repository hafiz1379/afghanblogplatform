import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDistanceToNow } from "date-fns";

// Category color mapping
const CATEGORY_COLORS = {
  technology: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-100",
    dot: "bg-indigo-500",
  },
  lifestyle: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
    dot: "bg-purple-500",
  },
  business: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
  },
  entertainment: {
    bg: "bg-pink-50",
    text: "text-pink-600",
    border: "border-pink-100",
    dot: "bg-pink-500",
  },
  news: {
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
  return CATEGORY_COLORS[category?.toLowerCase()] || CATEGORY_COLORS.default;
};

// Stat Card Component
const StatCard = ({ icon, color, title, value }) => {
  const colorClasses = {
    indigo: {
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-600",
    },
    emerald: {
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
    },
    purple: {
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
    },
    amber: {
      iconBg: "bg-amber-100",
      iconText: "text-amber-600",
    },
  };

  const colors = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition-all duration-300 group-hover:shadow-lg group-hover:border-slate-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center transition-colors duration-300`}
            >
              <svg
                className={`w-7 h-7 ${colors.iconText}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {icon}
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{title}</p>
              <p className="text-3xl font-bold text-slate-900">{value}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Author Avatar Component
const AuthorAvatar = ({ author }) => {
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  };

  return (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <span className="text-white text-sm font-semibold">
        {getInitials(author?.name)}
      </span>
    </div>
  );
};

// Category Badge Component
const CategoryBadge = ({ category }) => {
  const colors = getCategoryColors(category);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></span>
      {category}
    </span>
  );
};

// Action Buttons Component
const ActionButtons = ({ post, onDelete }) => (
  <div className="flex items-center gap-2">
    <Link
      to={`/edit-post/${post._id}`}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200 text-sm font-medium"
    >
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
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      Edit
    </Link>
    <button
      onClick={() => onDelete(post)}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200 text-sm font-medium"
    >
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete
    </button>
  </div>
);

// Delete Modal Component
const DeleteModal = ({ isOpen, post, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
          onClick={onCancel}
        ></div>

        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 rounded-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-rose-600"
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
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Delete Post
            </h3>

            <p className="text-slate-600 mb-2">
              Are you sure you want to delete this post?
            </p>
            {post && (
              <p className="text-sm font-medium text-slate-900 bg-slate-100 rounded-lg px-3 py-2 mb-4">
                "{post.title}"
              </p>
            )}
            <p className="text-sm text-slate-500">
              This action cannot be undone.
            </p>
          </div>

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

          <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-16 px-8">
    <div className="relative w-20 h-20 mx-auto mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-10"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-slate-400"
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
    <h3 className="text-lg font-bold text-slate-900 mb-2">No posts found</h3>
    <p className="text-slate-500">Get started by creating a new post.</p>
  </div>
);

const AdminPosts = () => {
  const { posts, loading, getPosts, deletePost } = usePost();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const stats = useMemo(() => {
    const uniqueAuthors = [...new Set(posts.map((post) => post.author?._id))];
    const uniqueCategories = [...new Set(posts.map((post) => post.category))];
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentPosts = posts.filter(
      (post) => new Date(post.createdAt) > weekAgo
    );

    return {
      totalPosts: posts.length,
      totalAuthors: uniqueAuthors.length,
      totalCategories: uniqueCategories.length,
      recentPostsCount: recentPosts.length,
    };
  }, [posts]);

  const formattedDates = useMemo(() => {
    return posts.reduce((acc, post) => {
      acc[post._id] = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
      });
      return acc;
    }, {});
  }, [posts]);

  const handleDeleteClick = useCallback((post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (postToDelete) {
      deletePost(postToDelete._id);
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  }, [postToDelete, deletePost]);

  const cancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  }, []);

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
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-6">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm font-medium text-indigo-600">
              Content Management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Manage{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Posts
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            View and manage all posts from all users on the platform
          </p>

          <div className="flex items-center gap-2">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            }
            color="indigo"
            title="Total Posts"
            value={stats.totalPosts}
          />
          <StatCard
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            }
            color="emerald"
            title="Authors"
            value={stats.totalAuthors}
          />
          <StatCard
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            }
            color="purple"
            title="Categories"
            value={stats.totalCategories}
          />
          <StatCard
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            }
            color="amber"
            title="This Week"
            value={stats.recentPostsCount}
          />
        </div>

        {/* Posts Table - Desktop View */}
        <div className="relative group hidden lg:block">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-5 blur-xl"></div>

          <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    All Posts
                  </h2>
                  <p className="text-sm text-slate-500">
                    {posts.length} total posts
                  </p>
                </div>
              </div>
            </div>

            {posts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Post
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {posts.map((post, index) => (
                      <tr
                        key={post._id}
                        className="hover:bg-slate-50/50 transition-colors duration-200"
                        style={{
                          animation: `fadeInUp 0.3s ease-out ${
                            index * 0.05
                          }s both`,
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <Link
                              to={`/posts/${post._id}`}
                              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 line-clamp-1 transition-colors duration-200"
                            >
                              {post.title}
                            </Link>
                            <p className="text-sm text-slate-500 line-clamp-1 mt-1">
                              {post.excerpt}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <AuthorAvatar author={post.author} />
                            <span className="text-sm font-medium text-slate-900">
                              {post.author?.name || "Unknown"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <CategoryBadge category={post.category} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-slate-500">
                            {formattedDates[post._id]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <ActionButtons
                            post={post}
                            onDelete={handleDeleteClick}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState />
            )}

            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          </div>
        </div>

        {/* Tablet View */}
        <div className="hidden md:block lg:hidden">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-5 blur-xl"></div>

            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                <div>
                  <h2 className="font-bold text-slate-900">All Posts</h2>
                  <p className="text-sm text-slate-500">
                    {posts.length} total posts
                  </p>
                </div>
              </div>

              {posts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                          Post
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                          Author
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {posts.map((post, index) => (
                        <tr
                          key={post._id}
                          className="hover:bg-slate-50/50"
                          style={{
                            animation: `fadeInUp 0.3s ease-out ${
                              index * 0.05
                            }s both`,
                          }}
                        >
                          <td className="px-4 py-3">
                            <div>
                              <Link
                                to={`/posts/${post._id}`}
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 line-clamp-1"
                              >
                                {post.title}
                              </Link>
                              <p className="text-xs text-slate-500 line-clamp-1">
                                {post.excerpt}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {formattedDates[post._id]}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <AuthorAvatar author={post.author} />
                              <span className="text-sm font-medium text-slate-900 truncate max-w-[80px]">
                                {post.author?.name || "Unknown"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <CategoryBadge category={post.category} />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex flex-col gap-1">
                              <Link
                                to={`/edit-post/${post._id}`}
                                className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium"
                              >
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDeleteClick(post)}
                                className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-sm font-medium"
                              >
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState />
              )}

              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-5 blur-xl"></div>

            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                <div>
                  <h2 className="font-bold text-slate-900">All Posts</h2>
                  <p className="text-sm text-slate-500">
                    {posts.length} total posts
                  </p>
                </div>
              </div>

              {posts.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {posts.map((post, index) => (
                    <div
                      key={post._id}
                      className="p-5"
                      style={{
                        animation: `fadeInUp 0.3s ease-out ${
                          index * 0.05
                        }s both`,
                      }}
                    >
                      <div className="mb-3">
                        <Link
                          to={`/posts/${post._id}`}
                          className="text-base font-semibold text-indigo-600 hover:text-indigo-700 line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <AuthorAvatar author={post.author} />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {post.author?.name || "Unknown Author"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {formattedDates[post._id]}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <CategoryBadge category={post.category} />
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/edit-post/${post._id}`}
                            className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-200"
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
                            onClick={() => handleDeleteClick(post)}
                            className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-200"
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
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}

              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>

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
        post={postToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export default AdminPosts;
