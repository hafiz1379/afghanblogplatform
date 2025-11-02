import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDistanceToNow } from "date-fns";

// Extracted components for better organization
const StatCard = ({ icon, bgColor, iconColor, title, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex items-center">
      <div
        className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mr-4`}
      >
        <svg
          className={`w-6 h-6 ${iconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

const AuthorAvatar = ({ author }) => (
  <div className="flex-shrink-0 h-8 w-8">
    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
      <span className="text-white text-xs font-medium">
        {author?.name?.charAt(0).toUpperCase() || "?"}
      </span>
    </div>
  </div>
);

const ActionButtons = ({ post, onEdit, onDelete }) => (
  <div className="flex space-x-2">
    <Link
      to={`/edit-post/${post._id}`}
      className="text-yellow-600 hover:text-yellow-900 flex items-center transition-colors duration-150"
    >
      <svg
        className="w-4 h-4 mr-1"
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
      className="text-red-600 hover:text-red-900 flex items-center transition-colors duration-150"
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
        />
      </svg>
      Delete
    </button>
  </div>
);

const DeleteModal = ({ isOpen, post, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Delete Post
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete "{post?.title}"? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onConfirm}
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
      <svg
        className="w-8 h-8 text-gray-400"
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
    <h3 className="text-lg font-medium text-gray-900 mb-1">No posts found</h3>
    <p className="text-gray-500">Get started by creating a new post.</p>
  </div>
);

const AdminPosts = () => {
  const { posts, loading, getPosts, deletePost } = usePost();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    // Get all posts without filters
    getPosts();
  }, [getPosts]);

  // Memoize statistics to prevent recalculation on every render
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

  // Memoize formatted dates to prevent recalculation
  const formattedDates = useMemo(() => {
    return posts.reduce((acc, post) => {
      acc[post._id] = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
      });
      return acc;
    }, {});
  }, [posts]);

  // Use useCallback to prevent recreation of functions on every render
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Manage Posts
          </h1>
          <p className="text-gray-600">
            View and manage all posts from all users
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mt-4"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            }
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
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
            bgColor="bg-green-100"
            iconColor="text-green-600"
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
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
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
            bgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            title="Recent"
            value={stats.recentPostsCount}
          />
        </div>

        {/* Posts Table - Desktop View */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hidden lg:block">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">All Posts</h2>
          </div>

          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr
                      key={post._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            <Link
                              to={`/posts/${post._id}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                            >
                              {post.title}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {post.excerpt}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <AuthorAvatar author={post.author} />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {post.author?.name || "Unknown Author"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formattedDates[post._id]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
        </div>

        {/* Tablet View */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hidden md:block lg:hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">All Posts</h2>
          </div>

          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr
                      key={post._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            <Link
                              to={`/posts/${post._id}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                            >
                              {post.title}
                            </Link>
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {post.excerpt}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {formattedDates[post._id]}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <AuthorAvatar author={post.author} />
                          <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-[100px]">
                              {post.author?.name || "Unknown Author"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col space-y-1">
                          <Link
                            to={`/edit-post/${post._id}`}
                            className="text-yellow-600 hover:text-yellow-900 flex items-center transition-colors duration-150"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
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
                            className="text-red-600 hover:text-red-900 flex items-center transition-colors duration-150"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
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
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">All Posts</h2>
          </div>

          {posts.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post._id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <Link
                        to={`/posts/${post._id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-gray-900 transition-colors duration-150"
                      >
                        {post.title}
                      </Link>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center mb-3">
                    <AuthorAvatar author={post.author} />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {post.author?.name || "Unknown Author"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formattedDates[post._id]}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/edit-post/${post._id}`}
                        className="text-yellow-600 hover:text-yellow-900 p-1 transition-colors duration-150"
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
                        className="text-red-600 hover:text-red-900 p-1 transition-colors duration-150"
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
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        post={postToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default AdminPosts;
