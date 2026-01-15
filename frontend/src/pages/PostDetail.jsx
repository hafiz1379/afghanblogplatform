import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/CommentSection";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

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
  Politics: {
    bg: "bg-slate-100",
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

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, post, loading, likePost, unlikePost, deletePost } =
    usePost();
  const { isAuthenticated, user } = useAuth();
  const [localPost, setLocalPost] = useState(null);

  const getPostData = useCallback(() => {
    return localPost || post;
  }, [localPost, post]);

  useEffect(() => {
    getPost(id);
    window.scrollTo(0, 0);
  }, [id, getPost]);

  useEffect(() => {
    if (post && post._id === id) {
      setLocalPost(post);
    }
  }, [post, id]);

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

  const getCategoryColor = (category) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  };

  if (loading || !getPostData()) {
    return <LoadingSpinner />;
  }

  const currentPost = getPostData();
  const categoryColors = getCategoryColor(currentPost.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-pink-100/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 shadow-sm transition-all duration-200"
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1"
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

          {/* Main Post Card */}
          <article className="relative group">
            {/* Card Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-5 blur-xl"></div>

            {/* Card */}
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              {/* Post Header */}
              <div className="p-6 md:p-10">
                {/* Category & Date Row */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl border ${categoryColors.bg} ${categoryColors.text} ${categoryColors.border}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${categoryColors.dot}`}
                    ></span>
                    {currentPost.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formatDistanceToNow(new Date(currentPost.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
                  {currentPost.title}
                </h1>

                {/* Author Section */}
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    {/* Author Avatar */}
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-50 blur-sm"></div>
                      {currentPost.author?.avatar ? (
                        <img
                          src={currentPost.author.avatar}
                          alt={currentPost.author.name}
                          className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center border-2 border-white shadow-md"
                        style={{
                          display: currentPost.author?.avatar ? "none" : "flex",
                        }}
                      >
                        <span className="text-white font-semibold text-lg">
                          {getInitials(currentPost.author?.name)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-lg text-slate-900">
                        {currentPost.author?.name || "Unknown Author"}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-600 text-xs font-medium">
                          {currentPost.author?.role || "Writer"}
                        </span>
                        <span>•</span>
                        <span>
                          {Math.ceil(currentPost.content?.length / 1000) || 5}{" "}
                          min read
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Edit/Delete Actions */}
                  {isAuthenticated &&
                    (currentPost.author?._id === user._id ||
                      user.role === "admin") && (
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/edit-post/${currentPost._id}`}
                          className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
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
                          className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
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
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentPost.tags.map((tag, index) => {
                      const tagColors = [
                        "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100",
                        "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100",
                        "bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100",
                        "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100",
                      ];
                      return (
                        <span
                          key={index}
                          className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors duration-200 cursor-pointer ${
                            tagColors[index % tagColors.length]
                          }`}
                        >
                          #{tag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Post Image */}
              {currentPost.image && currentPost.image !== "no-photo.jpg" && (
                <div className="px-6 md:px-10 pb-8">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-100">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/${currentPost.image}`}
                      alt={currentPost.title}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-64 bg-slate-100 flex flex-col items-center justify-center">
                            <svg class="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p class="mt-2 text-slate-400 text-sm">Image not available</p>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Post Content */}
              <div className="px-6 md:px-10 pb-8">
                <div className="prose prose-lg prose-slate max-w-none">
                  <div
                    className="text-slate-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: currentPost.content.replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-6 md:px-10 py-6 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Like Button */}
                    <button
                      onClick={handleLike}
                      disabled={!isAuthenticated}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        isLiked
                          ? "text-rose-600 bg-rose-50 border border-rose-200"
                          : "text-slate-600 bg-white border border-slate-200 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200"
                      } ${
                        !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
                      }`}
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

                    {/* Comments Count */}
                    <a
                      href="#comments"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-slate-600 bg-white border border-slate-200 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200"
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>
                        {currentPost.comments.length}{" "}
                        {currentPost.comments.length === 1
                          ? "Comment"
                          : "Comments"}
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Gradient Line */}
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
          </article>

          {/* Comments Section */}
          <div className="relative mt-10 group">
            {/* Card Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-5 blur-xl"></div>

            {/* Card */}
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="p-6 md:p-10">
                <CommentSection
                  postId={currentPost._id}
                  comments={currentPost.comments}
                />
              </div>

              {/* Bottom Gradient Line */}
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="flex items-center justify-center gap-3 mt-12">
            <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-pink-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
