import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminPosts = () => {
  const { posts, loading, getPosts, deletePost } = usePost();

  useEffect(() => {
    // Get all posts without filters
    getPosts();
  }, [getPosts]);

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Posts</h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <Link
                      to={`/posts/${post._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {post.author?.name || "Unknown Author"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {post.category}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <Link
                      to={`/edit-post/${post._id}`}
                      className="text-yellow-600 hover:text-yellow-800 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No posts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
