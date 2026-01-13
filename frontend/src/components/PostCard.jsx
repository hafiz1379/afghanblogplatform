import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { Link } from "react-router-dom"; 
import { formatDistanceToNow } from "date-fns";
import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// Constants
const READING_SPEED = 1000;
const DEFAULT_READ_TIME = 5;

// Category colors
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
  Politics: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-500",
  },
  Sports: {
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

const PostCard = memo(({ post }) => {
  const { likePost, unlikePost } = usePost();
  const { isAuthenticated, user } = useAuth();

  const [localPost, setLocalPost] = useState(post);
  const [isLiking, setIsLiking] = useState(false);

  const postIdRef = useRef(post?._id);
  const userIdRef = useRef(user?._id);

  useEffect(() => {
    postIdRef.current = post?._id;
  }, [post?._id]);

  useEffect(() => {
    userIdRef.current = user?._id;
  }, [user?._id]);

  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  const getCategoryColors = useCallback((category) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  }, []);

  const calculateReadingTime = useCallback((content) => {
    if (!content) return DEFAULT_READ_TIME;
    return Math.ceil(content.length / READING_SPEED) || DEFAULT_READ_TIME;
  }, []);

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

  const getAuthorInitials = useCallback((name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  }, []);

  // Handle like with react-hot-toast
  const handleLike = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Check authentication
      if (!isAuthenticated) {
        toast.error("Please login to like posts", {
          duration: 3000,
          icon: "🔒",
        });
        return;
      }

      if (isLiking) return;

      const currentPostId = postIdRef.current;
      const currentUserId = userIdRef.current;

      if (!currentPostId) return;

      setIsLiking(true);

      const currentlyLiked = localPost?.likes?.includes(currentUserId) || false;

      try {
        setLocalPost((prev) => {
          if (!prev || !prev.likes) return prev;
          return {
            ...prev,
            likes: currentlyLiked
              ? prev.likes.filter((id) => id !== currentUserId)
              : [...prev.likes, currentUserId],
          };
        });

        const result = currentlyLiked
          ? await unlikePost(currentPostId)
          : await likePost(currentPostId);

        if (!result.success) {
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

  const handleImageError = useCallback((e) => {
    e.target.style.display = "none";
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.style.display = "flex";
    }
  }, []);

  const handleReadMore = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getPostUrl = useCallback(() => {
    const postId = postIdRef.current;
    if (!postId) return "#";
    return `/posts/${postId}`;
  }, []);

  if (!localPost || !localPost._id) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
        <p className="text-slate-500">Post data is unavailable</p>
      </div>
    );
  }

  const likesCount = Array.isArray(localPost.likes)
    ? localPost.likes.length
    : 0;
  const commentsCount = Array.isArray(localPost.comments)
    ? localPost.comments.length
    : 0;
  const categoryColors = getCategoryColors(localPost.category);

  return (
    <article className="group relative flex flex-col h-full">
      {/* Card Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>

      {/* Main Card */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-500 overflow-hidden flex flex-col h-full group-hover:-translate-y-1">
        <div className="p-6 flex flex-col flex-grow">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${categoryColors.bg} ${categoryColors.text} ${categoryColors.border}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${categoryColors.dot}`}
              ></span>
              {localPost.category || "Uncategorized"}
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
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {calculateReadingTime(localPost.content)} min
            </span>
          </div>

          <div className="flex-grow">
            <time
              dateTime={localPost.createdAt}
              className="text-slate-400 text-xs font-medium mb-3 block"
            >
              {localPost.createdAt
                ? formatDistanceToNow(new Date(localPost.createdAt), {
                    addSuffix: true,
                  })
                : "Unknown date"}
            </time>

            <h3 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
              <Link
                to={getPostUrl()}
                className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded"
              >
                {localPost.title || "Untitled Post"}
              </Link>
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {localPost.excerpt || "No excerpt available"}
            </p>
          </div>

          <div className="mt-auto">
            {/* Author Info */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300"></div>
                  {localPost.author?.avatar ? (
                    <img
                      src={localPost.author.avatar}
                      alt={localPost.author.name || "Author"}
                      className="relative w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  ) : null}

                  <div
                    className="relative w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center border-2 border-white shadow-sm"
                    style={{
                      display: localPost.author?.avatar ? "none" : "flex",
                    }}
                  >
                    <span className="text-white text-sm font-semibold">
                      {getAuthorInitials(localPost.author?.name)}
                    </span>
                  </div>
                </div>

                <div className="ml-3">
                  <span className="text-sm font-semibold text-slate-900 block">
                    {localPost.author?.name || "Unknown Author"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {localPost.author?.role || "Writer"}
                  </span>
                </div>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Like Button */}
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all duration-200 ${
                    isLiked()
                      ? "text-rose-500 bg-rose-50"
                      : "text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                  } ${
                    isLiking
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={handleLike}
                  disabled={isLiking}
                  aria-label={isLiked() ? "Unlike this post" : "Like this post"}
                >
                  <svg
                    className="w-4 h-4"
                    fill={isLiked() ? "currentColor" : "none"}
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
                  <span className="text-xs font-medium">{likesCount}</span>
                </button>

                {/* Comments */}
                <Link
                  to={`${getPostUrl()}#comments`}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all duration-200"
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-xs font-medium">{commentsCount}</span>
                </Link>
              </div>

              {/* Read More */}
              <Link
                to={getPostUrl()}
                className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 group/btn"
                onClick={handleReadMore}
              >
                Read
                <svg
                  className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1"
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
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="h-1 w-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </div>
      </div>
    </article>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;
