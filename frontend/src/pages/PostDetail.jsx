import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/CommentSection";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getPost,
    post,
    loading,
    likePost,
    unlikePost,
    deletePost,
  } = usePost();
  const { isAuthenticated, user } = useAuth();
  const [localPost, setLocalPost] = useState(null);

  // Function to safely get post data
  const getPostData = useCallback(() => {
    return localPost || post;
  }, [localPost, post]);

  useEffect(() => {
    getPost(id);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, getPost]);

  // Update local post when post changes
  useEffect(() => {
    if (post && post._id === id) {
      setLocalPost(post);
    }
  }, [post, id]);

  // Listen for post updates in context
  useEffect(() => {
    if (post && post._id === id && (!localPost || localPost._id !== id)) {
      setLocalPost(post);
    }
  }, [post, id, localPost]);

  const isLiked =
    getPostData() && user ? getPostData().likes.includes(user._id) : false;

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("You need to login to like posts");
      return;
    }

    const currentPost = getPostData();
    if (!currentPost) return;

    try {
      let result;
      if (isLiked) {
        result = await unlikePost(currentPost._id);
        if (result.success) {
          // Update local state to reflect the change immediately
          setLocalPost((prev) => {
            if (!prev || prev._id !== currentPost._id) return prev;
            return {
              ...prev,
              likes: prev.likes.filter((id) => id !== user._id),
            };
          });
        }
      } else {
        result = await likePost(currentPost._id);
        if (result.success) {
          // Update local state to reflect the change immediately
          setLocalPost((prev) => {
            if (!prev || prev._id !== currentPost._id) return prev;
            return {
              ...prev,
              likes: [...prev.likes, user._id],
            };
          });
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like status");
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        toast.success("Post deleted successfully");
        navigate("/my-posts");
      } catch (error) {
        toast.error("Error deleting post");
      }
    }
  };

  // Function to get category color based on category name
  const getCategoryColor = (category) => {
    const colors = {
      Technology: "bg-blue-100 text-blue-800",
      Culture: "bg-purple-100 text-purple-800",
      Travel: "bg-green-100 text-green-800",
      Food: "bg-red-100 text-red-800",
      Politics: "bg-indigo-100 text-indigo-800",
      Sports: "bg-yellow-100 text-yellow-800",
      default: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.default;
  };

  if (loading || !getPostData()) {
    return <LoadingSpinner />;
  }

  const currentPost = getPostData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Posts
          </button>

          {/* Post Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Post Header */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(
                    currentPost.category
                  )}`}
                >
                  {currentPost.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {formatDistanceToNow(new Date(currentPost.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight">
                {currentPost.title}
              </h1>

              {/* Author Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {/* Author Avatar - Fixed to handle missing avatar */}
                  {currentPost.author?.avatar ? (
                    <img
                      src={currentPost.author.avatar}
                      alt={currentPost.author.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
                      onError={(e) => {
                        // Hide broken image and show fallback
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {/* Fallback avatar when no image or image fails to load */}
                  <div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center mr-4 border-2 border-gray-200"
                    style={{ display: currentPost.author?.avatar ? 'none' : 'flex' }}
                  >
                    <span className="text-white font-semibold">
                      {currentPost.author?.name?.charAt(0).toUpperCase() ??
                        "?"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {currentPost.author?.name || "Unknown Author"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {currentPost.author?.role || "Writer"} •{" "}
                      {Math.ceil(currentPost.content?.length / 1000) || 5} min
                      read
                    </p>
                  </div>
                </div>

                {isAuthenticated &&
                  (currentPost.author?._id === user._id ||
                    user.role === "admin") && (
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/edit-post/${currentPost._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
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
                        onClick={() => handleDeletePost(currentPost._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
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
                  )}
              </div>

              {/* Tags */}
              {currentPost.tags && currentPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Image */}
            {currentPost.image && currentPost.image !== "no-photo.jpg" && (
              <div className="px-6 md:px-8 pb-6">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${currentPost.image}`}
                    alt={currentPost.title}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      // Hide broken image and show fallback
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
                          <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0l4.414 4.586a2 2 0 012.828 0L19.414 11.414a2 2 0 002.828 0L16.586 6.586a2 2 0 00-2.828 0L9.172 11.414a2 2 0 01-2.828 0z" />
                          </svg>
                          <p class="mt-2 text-gray-500">Image not available</p>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            )}

            {/* Post Content */}
            <div className="px-6 md:px-8 pb-6">
              <div className="prose prose prose-lg max-w-none text-gray-700">
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentPost.content.replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-6 md:px-8 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isLiked
                        ? "text-red-500 bg-red-50 hover:bg-red-100"
                        : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                    }`}
                    disabled={!isAuthenticated}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={isLiked ? "currentColor" : "none"}
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
                    <span>
                      {currentPost.likes.length}{" "}
                      {currentPost.likes.length === 1 ? "Like" : "Likes"}
                    </span>
                  </button>

                  <div className="flex items-center space-x-2 text-gray-600 px-4 py-2">
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>
                      {currentPost.comments.length}{" "}
                      {currentPost.comments.length === 1
                        ? "Comment"
                        : "Comments"}
                    </span>
                  </div>

                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full transition-all duration-200">
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326"
                      />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Comments ({currentPost.comments.length})
              </h2>
              <CommentSection
                postId={currentPost._id}
                comments={currentPost.comments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;