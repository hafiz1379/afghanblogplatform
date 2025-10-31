import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

// Constants for better maintainability
const READING_SPEED = 1000; // characters per minute
const DEFAULT_READ_TIME = 5; // minutes
const DEFAULT_CATEGORY_COLOR = "bg-gray-100 text-gray-800";

// Category color mapping
const CATEGORY_COLORS = {
  Technology: "bg-blue-100 text-blue-800",
  Culture: "bg-purple-100 text-purple-800",
  Travel: "bg-green-100 text-green-800",
  Food: "bg-red-100 text-red-800",
  Politics: "bg-indigo-100 text-indigo-800",
  Sports: "bg-yellow-100 text-yellow-800",
};

/**
 * PostCard component for displaying post information with interaction capabilities
 * @param {Object} props - Component props
 * @param {Object} props.post - Post data object
 * @returns {JSX.Element} The rendered PostCard component
 */
const PostCard = memo(({ post }) => {
  const { likePost, unlikePost } = usePost();
  const { isAuthenticated, user } = useAuth();
  const [localPost, setLocalPost] = useState(post);
  const [isLiking, setIsLiking] = useState(false);

  // Ref to store the latest post ID to avoid stale closures
  const postIdRef = useRef(post?._id);
  const userIdRef = useRef(user?._id);

  // Update refs when values change
  useEffect(() => {
    postIdRef.current = post?._id;
  }, [post?._id]);

  useEffect(() => {
    userIdRef.current = user?._id;
  }, [user?._id]);

  // Update local post when prop changes
  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  // Memoized function to get category color
  const getCategoryColor = useCallback((category) => {
    return CATEGORY_COLORS[category] || DEFAULT_CATEGORY_COLOR;
  }, []);

  // Memoized function to calculate reading time
  const calculateReadingTime = useCallback((content) => {
    if (!content) return DEFAULT_READ_TIME;
    return Math.ceil(content.length / READING_SPEED) || DEFAULT_READ_TIME;
  }, []);

  // Memoized check if the current user has liked this post
  const isLiked = useCallback(() => {
    if (
      !localPost ||
      !user ||
      !localPost.likes ||
      !Array.isArray(localPost.likes)
    ) {
      return false;
    }
    return localPost.likes.includes(user._id);
  }, [localPost, user]);

  // Memoized function to get author initials
  const getAuthorInitials = useCallback((name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  }, []);

  // Handle like/unlike functionality with loading state
  const handleLike = useCallback(
    async (e) => {
      e.preventDefault(); // Prevent navigation when clicking like button

      if (!isAuthenticated) {
        toast.error("You need to login to like posts");
        return;
      }

      if (isLiking) return; // Prevent multiple clicks during loading

      // Get current values from refs to avoid stale closures
      const currentPostId = postIdRef.current;
      const currentUserId = userIdRef.current;

      if (!currentPostId) return;

      setIsLiking(true);

      // Use functional update to get the latest state
      const currentlyLiked = (() => {
        const currentPost = localPost;
        if (
          !currentPost ||
          !currentPost.likes ||
          !Array.isArray(currentPost.likes)
        ) {
          return false;
        }
        return currentPost.likes.includes(currentUserId);
      })();

      try {
        // Optimistic UI update using functional update
        setLocalPost((prev) => {
          if (!prev || !prev.likes) return prev;
          return {
            ...prev,
            likes: currentlyLiked
              ? prev.likes.filter((id) => id !== currentUserId)
              : [...prev.likes, currentUserId],
          };
        });

        // API call
        const result = currentlyLiked
          ? await unlikePost(currentPostId)
          : await likePost(currentPostId);

        if (!result.success) {
          // Revert optimistic update if API call fails
          setLocalPost((prev) => {
            if (!prev || !prev.likes) return prev;
            return {
              ...prev,
              likes: currentlyLiked
                ? [...prev.likes, currentUserId]
                : prev.likes.filter((id) => id !== currentUserId),
            };
          });
          toast.error("Failed to update like status");
        }
      } catch (error) {
        console.error("Error toggling like:", error);
        // Revert optimistic update on error
        setLocalPost((prev) => {
          if (!prev || !prev.likes) return prev;
          return {
            ...prev,
            likes: currentlyLiked
              ? [...prev.likes, currentUserId]
              : prev.likes.filter((id) => id !== currentUserId),
          };
        });
        toast.error("Failed to update like status");
      } finally {
        setIsLiking(false);
      }
    },
    [isAuthenticated, isLiking, unlikePost, likePost, localPost]
  );

  // Handle image error with fallback
  const handleImageError = useCallback((e) => {
    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "flex";
  }, []);

  // Handle read more click with scroll to top
  const handleReadMore = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Generate safe URL for post
  const getPostUrl = useCallback(() => {
    const postId = postIdRef.current;
    if (!postId) return "#";
    return `/posts/${postId}`;
  }, []);

  // Check if post data is valid
  if (!localPost || !localPost._id) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <p className="text-gray-500">Post data is unavailable</p>
      </div>
    );
  }

  // Ensure likes and comments are arrays
  const likesCount = Array.isArray(localPost.likes)
    ? localPost.likes.length
    : 0;
  const commentsCount = Array.isArray(localPost.comments)
    ? localPost.comments.length
    : 0;
  const viewsCount = typeof localPost.views === "number" ? localPost.views : 0;

  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full transform hover:-translate-y-2">
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="mb-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(
              localPost.category
            )}`}
          >
            {localPost.category || "Uncategorized"}
          </span>
        </div>

        <div className="flex-grow">
          {/* Date and Reading Time */}
          <div className="flex items-center mb-3">
            <time
              dateTime={localPost.createdAt}
              className="text-gray-500 text-sm"
            >
              {localPost.createdAt
                ? formatDistanceToNow(new Date(localPost.createdAt), {
                    addSuffix: true,
                  })
                : "Unknown date"}
            </time>
            <span className="mx-2 text-gray-400" aria-hidden="true">
              •
            </span>
            <span className="text-gray-500 text-sm">
              {calculateReadingTime(localPost.content)} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            <Link
              to={getPostUrl()}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
            >
              {localPost.title || "Untitled Post"}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {localPost.excerpt || "No excerpt available"}
          </p>
        </div>

        <div className="mt-auto">
          {/* Author Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {/* Author Avatar with fallback */}
              {localPost.author?.avatar ? (
                <img
                  src={localPost.author.avatar}
                  alt={localPost.author.name || "Author"}
                  className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-200"
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : null}

              {/* Fallback avatar */}
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center mr-3 border-2 border-gray-200"
                style={{ display: localPost.author?.avatar ? "none" : "flex" }}
                aria-hidden="true"
              >
                <span className="text-white text-sm font-semibold">
                  {getAuthorInitials(localPost.author?.name)}
                </span>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-800">
                  {localPost.author?.name || "Unknown Author"}
                </span>
                <div className="text-xs text-gray-500">
                  {localPost.author?.role || "Writer"}
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-gray-500">
              {/* Like Button */}
              <button
                className={`flex items-center group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded ${
                  isLiked() ? "text-red-500" : ""
                } ${
                  isLiking ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={handleLike}
                disabled={isLiking}
                aria-label={isLiked() ? "Unlike this post" : "Like this post"}
                aria-pressed={isLiked()}
              >
                <svg
                  className={`w-5 h-5 mr-1 ${
                    isLiked() ? "text-red-500" : "group-hover:text-red-500"
                  } transition-colors duration-200`}
                  fill={isLiked() ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="text-sm">{likesCount}</span>
              </button>

              {/* Comment Link */}
              <Link
                to={`${getPostUrl()}#comments`}
                className="flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                aria-label={`View ${commentsCount} comments`}
              >
                <svg
                  className="w-5 h-5 mr-1 group-hover:text-blue-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm">{commentsCount}</span>
              </Link>

              {/* Views */}
              <div
                className="flex items-center group cursor-pointer"
                aria-label={`${viewsCount} views`}
              >
                <svg
                  className="w-5 h-5 mr-1 group-hover:text-green-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326"
                  />
                </svg>
                <span className="text-sm">{viewsCount}</span>
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-4">
            <Link
              to={getPostUrl()}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
              onClick={handleReadMore}
            >
              Read More
              <svg
                className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;
