import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

// Set baseURL for requests from this component
axios.defaults.baseURL = "http://localhost:5000/api";

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

      // Create new comment object with author info
      const newComment = {
        ...res.data.data, // id, content, createdAt
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

  // Function to safely format date
  const formatDate = (date) => {
    if (!date) return "Unknown date";

    try {
      const dateObj = new Date(date);
      // Check if the date is valid
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

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Active Discussion</span>
        </div>
      </div>

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-start space-x-4">
            {/* User Initial Avatar - Removed image dependency */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() ?? "?"}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Join the discussion
              </h3>
              <form onSubmit={onSubmit}>
                <div className="relative">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    rows={4}
                    placeholder="Share your thoughts..."
                  ></textarea>
                  <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                    {commentText.length}/500
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !commentText.trim()}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      "Post Comment"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Join the discussion
              </h3>
              <p className="text-gray-600">
                Sign in to share your thoughts on this post.
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Comments List */}
      {commentList.length > 0 ? (
        <div className="space-y-6">
          {commentList.map((comment, index) => (
            <div
              key={comment._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Comment Author Initial Avatar - Removed image dependency */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {comment.author?.name?.charAt(0).toUpperCase() ?? "?"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {comment.author?.name || "Unknown Author"}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
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
                              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No comments yet
          </h3>
          <p className="text-gray-600 mb-4">
            Be the first to share your thoughts on this post.
          </p>
          {isAuthenticated ? (
            <button
              onClick={() => document.querySelector("textarea").focus()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Write a Comment
            </button>
          ) : (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Sign In to Comment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
