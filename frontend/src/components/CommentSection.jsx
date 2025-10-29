import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

// Set baseURL for requests from this component
axios.defaults.baseURL = "http://localhost:5000/api";

const CommentSection = ({ postId, comments }) => {
  const { user, isAuthenticated } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState(comments || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCommentList(comments || []);
  }, [comments]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">{commentList.length} Comments</h2>

      {/* Add Comment Form */}
      {isAuthenticated && (
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
          <form onSubmit={onSubmit}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Comment Content"
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
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
                    Processing...
                  </span>
                ) : (
                  "Add Comment"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      {commentList.length > 0 ? (
        <div className="space-y-6">
          {commentList.map((comment) => (
            <div
              key={comment._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-semibold">
                    {comment.author?.name?.charAt(0).toUpperCase() ?? "?"}
                  </span>
                </div>
                <div>
                  <p className="font-medium">
                    {comment.author?.name || "Unknown Author"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No Comments</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
