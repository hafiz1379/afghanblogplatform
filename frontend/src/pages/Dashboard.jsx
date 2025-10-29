import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const { user } = useAuth();
  const { posts, loading, getPosts } = usePost();

  // Filter posts authored by current user
  const userPosts = useMemo(() => {
    if (!user || !posts) return [];
    return posts.filter((post) => post.author._id === user._id);
  }, [posts, user]);

  useEffect(() => {
    if (user && user._id) {
      getPosts();
    }
  }, [user, getPosts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">My Profile</h2>
            <p className="text-gray-600 mb-4">Profile Information</p>
            <Link
              to="/profile"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
            >
              View Profile
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">My Posts</h2>
            <p className="text-gray-600 mb-4">
              {userPosts.length} {userPosts.length === 1 ? "Post" : "Posts"}
            </p>
            <Link
              to="/my-posts"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
            >
              View My Posts
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Create Post</h2>
            <p className="text-gray-600 mb-4">Create a new post</p>
            <Link
              to="/create-post"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
            >
              Create Post
            </Link>
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/admin/users"
                className="bg-gray-100 hover:bg-gray-200 p-4 rounded-md block"
              >
                <h3 className="font-medium">Manage Users</h3>
              </Link>
              <Link
                to="/admin/posts"
                className="bg-gray-100 hover:bg-gray-200 p-4 rounded-md block"
              >
                <h3 className="font-medium">Manage Posts</h3>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
