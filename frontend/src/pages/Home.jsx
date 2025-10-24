import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePost } from "../context/PostContext";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { t, i18n } = useTranslation();
  const { posts, loading, getPosts, filters, setFilters } = usePost();
  const [searchTerm, setSearchTerm] = useState("");
  const isRTL = i18n.language === "fa";

  useEffect(() => {
    getPosts(1, 6);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ search: searchTerm });
  };

  return (
    <div className={`min-h-screen ${isRTL ? "font-farsi" : ""}`}>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("nav.home")} - Afghan Blog Platform
            </h1>
            <p className="text-xl mb-8">
              Discover stories, ideas, and knowledge from writers around the
              world.
            </p>
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="text"
                  placeholder={t("post.searchPosts")}
                  className={`flex-grow px-4 py-2 rounded-l-md text-gray-800 ${
                    isRTL ? "rounded-r-md rounded-l-none" : ""
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-r-md"
                >
                  {t("common.search")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Posts
          </h2>
          {loading ? (
            <LoadingSpinner />
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">{t("post.noPostsFound")}</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/posts"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md inline-block"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              About Afghan Blog
            </h2>
            <p className="text-lg mb-6">
              Afghan Blog is a platform dedicated to sharing stories, ideas, and
              knowledge from Afghanistan and around the world. Our mission is to
              provide a space where writers can express themselves and readers
              can discover new perspectives.
            </p>
            <p className="text-lg mb-6">
              Whether you're interested in technology, culture, politics, or
              personal stories, you'll find something that resonates with you on
              Afghan Blog.
            </p>
            <div className="text-center">
              <Link
                to="/about"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md inline-block"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
