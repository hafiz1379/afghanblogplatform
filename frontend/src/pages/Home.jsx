import React, { useEffect, useState, useCallback } from "react";
import { usePost } from "../context/PostContext";
import HeroSection from "../components/Home/HeroSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import CategoriesSection from "../components/Home/CategoriesSection";
import AboutSection from "../components/Home/AboutSection";

const Home = () => {
  const { posts, loading, getPosts, filters, setFilters } = usePost();
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use useCallback to prevent recreation of functions on every render
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setFilters({ search: searchTerm });
    },
    [searchTerm, setFilters]
  );

  // Load posts initially and whenever filters change
  useEffect(() => {
    getPosts(1, 6, filters);
  }, [getPosts, filters]);

  // Set featured posts when posts are loaded
  useEffect(() => {
    if (posts.length > 0) {
      // Take first 3 posts as featured
      setFeaturedPosts(posts.slice(0, 3));
      // Trigger animation after component mounts
      setTimeout(() => setIsLoaded(true), 100);
    }
  }, [posts]);

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
