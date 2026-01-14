import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const CommentSection = ({ postId, comments }) => {
  const { user, isAuthenticated } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState(comments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCommentList(comments || []);
  }, [comments]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(`/comments/post/${postId}`, {
        content: commentText,
      });

      const newComment = {
        ...res.data.data,
        author: {
          _id: user._id,
          name: user.name,
        },
      };

      setCommentList([newComment, ...commentList]);
      setCommentText("");
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return "Unknown date";
      }

      return formatDistanceToNow(dateObj, {
        addSuffix: true,
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown date";
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  };

  return (
    <div className="mt-12" id="comments">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>
            <h2 className="text-2xl font-bold text-slate-900">
              Discussion
              <span className="ml-2 text-lg font-normal text-slate-400">
                ({commentList.length})
              </span>
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-600">
            Active Discussion
          </span>
        </div>
      </div>

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <div className="relative group mb-10">
          {/* Card Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>

          {/* Card */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition-all duration-300 group-hover:shadow-lg group-hover:border-slate-300">
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-50 blur-sm"></div>
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {getInitials(user?.name)}
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Join the discussion
                  </h3>
                  <span className="text-sm text-slate-400">
                    as {user?.name}
                  </span>
                </div>

                <form onSubmit={onSubmit}>
                  <div className="relative">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      maxLength={500}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200 resize-none"
                      rows={4}
                      placeholder="Share your thoughts..."
                    ></textarea>
                    <div
                      className={`absolute bottom-3 right-3 text-xs font-medium ${
                        commentText.length > 450
                          ? "text-rose-500"
                          : "text-slate-400"
                      }`}
                    >
                      {commentText.length}/500
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      Be respectful and constructive
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting || !commentText.trim()}
                      className="group/btn relative inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {!isSubmitting && commentText.trim() && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover/btn:opacity-100 transition-all duration-300"></div>
                      )}
                      <span
                        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                          isSubmitting || !commentText.trim()
                            ? "bg-slate-100 text-slate-400"
                            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Posting...
                          </>
                        ) : (
                          <>
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
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                            Post Comment
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group mb-10">
          {/* Card */}
          <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100 p-6">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-transparent rounded-bl-full opacity-50"></div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center border border-indigo-100">
                  <svg
                    className="w-6 h-6 text-indigo-500"
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
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Join the discussion
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Sign in to share your thoughts on this post.
                  </p>
                </div>
              </div>

              <Link
                to="/login"
                className="group/btn relative inline-flex items-center justify-center"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover/btn:opacity-100 transition-all duration-300"></div>
                <span className="relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200">
                  Sign In
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Comments List */}
      {commentList.length > 0 ? (
        <div className="space-y-4">
          {commentList.map((comment, index) => (
            <div
              key={comment._id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Card Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-5 blur-xl transition-all duration-500"></div>

              {/* Comment Card */}
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:border-slate-300">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Author Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {getInitials(comment.author?.name)}
                        </span>
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {comment.author?.name || "Unknown Author"}
                          </h4>
                          <p className="text-sm text-slate-400">
                            {formatDate(comment.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Comment Text */}
                      <div className="prose prose-slate prose-sm max-w-none">
                        <p className="text-slate-700 leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="h-0.5 w-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative group">
          {/* Card Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-5 blur-xl"></div>

          {/* Empty State Card */}
          <div className="relative text-center py-16 px-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
            {/* Icon */}
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No comments yet
            </h3>

            {/* Description */}
            <p className="text-slate-600 mb-6 max-w-sm mx-auto">
              Be the first to share your thoughts on this post.
            </p>

            {/* CTA Button */}
            {isAuthenticated ? (
              <button
                onClick={() => document.querySelector("textarea")?.focus()}
                className="group/btn relative inline-flex items-center justify-center"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover/btn:opacity-100 transition-all duration-300"></div>
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Write a Comment
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="group/btn relative inline-flex items-center justify-center"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover/btn:opacity-100 transition-all duration-300"></div>
                <span className="relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200">
                  Sign In to Comment
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
                </span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* CSS for animation */}
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

export default CommentSection;
