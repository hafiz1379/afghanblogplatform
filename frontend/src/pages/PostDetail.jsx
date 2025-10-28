import React, { useEffect } from "react";
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
  const { getPost, post, loading, likePost, unlikePost, deletePost } =
    usePost();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    getPost(id);
  }, [id, getPost]);

  const isLiked = post && user ? post.likes.includes(user._id) : false;

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error("You need to login to like posts");
      return;
    }
    if (isLiked) {
      unlikePost(post._id);
    } else {
      likePost(post._id);
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

  if (loading || !post) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-semibold">
                    {post.author?.name?.charAt(0).toUpperCase() ?? "?"}
                  </span>
                </div>
                <div>
                  <p className="font-medium">
                    {post.author?.name || "Unknown Author"}
                  </p>
                  <p className="text-sm">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {post.category}
              </span>
              {(post.tags || []).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Post Image */}
          {post.image && post.image !== "no-photo.jpg" && (
            <div className="mb-8">
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, "<br />"),
              }}
            />
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 ${
                  isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
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
                <span>{post.likes.length} Likes</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
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
                <span>{post.comments.length} Comments</span>
              </div>
            </div>
            {isAuthenticated &&
              (post.author?._id === user._id || user.role === "admin") && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <span className="text-gray-400">|</span>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>

          {/* Comments Section */}
          <CommentSection postId={post._id} comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
