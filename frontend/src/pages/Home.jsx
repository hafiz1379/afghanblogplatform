import React, { useEffect, useState, useCallback } from "react";
import { usePost } from "../context/PostContext";

import HeroSection from "../components/Home/HeroSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import CategoriesSection from "../components/Home/CategoriesSection";
import AboutSection from "../components/Home/AboutSection";
import HomeLoading from "../components/Home/HomeLoading";

const Home = () => {
  const { posts, loading, getPosts, filters, setFilters } = usePost();
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setFilters({ search: searchTerm });
    },
    [searchTerm, setFilters]
  );

  useEffect(() => {
    getPosts(1, 6, filters);
  }, [getPosts, filters]);

  useEffect(() => {
    if (posts.length > 0) {
      setFeaturedPosts(posts.slice(0, 3));

      setTimeout(() => setIsLoaded(true), 200);
    }
  }, [posts]);

  // Show loading screen until posts are fetched
  if (loading || posts.length === 0) {
    return <HomeLoading />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        isLoaded={isLoaded}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <FeaturedPosts
        isLoaded={isLoaded}
        posts={featuredPosts}
        loading={loading}
      />
      <CategoriesSection />
      <AboutSection />
    </div>
  );
};

export default Home;
