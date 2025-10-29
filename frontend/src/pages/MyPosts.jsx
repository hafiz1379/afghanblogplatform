import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const MyPosts = () => {
  const { user } = useAuth();
  const { posts, loading, getPosts, deletePost } = usePost();

  useEffect(() => {
    if (user && user._id) {
      getPosts(1, 100, { author: user._id });
    }
  }, [user._id, getPosts]);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
      toast.success("Post deleted successfully");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Posts</h1>
          <Link
            to="/create-post"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
          >
            Create Post
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow-md border flex flex-col"
              >
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {post.content.substring(0, 100)}...
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t">
                  <Link
                    to={`/posts/${post._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Read More
                  </Link>
                  <div className="space-x-2">
                    <Link
                      to={`/edit-post/${post._id}`}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">No Posts Found</h2>
            <p className="text-gray-600 mb-4">
              You have not created any posts yet.
            </p>
            <Link
              to="/create-post"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
