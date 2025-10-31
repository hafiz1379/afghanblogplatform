import React, { useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";

// Extracted components for better organization
const UserAvatar = ({ name }) => (
  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-4">
    <span className="text-2xl font-bold">
      {name?.charAt(0).toUpperCase() ?? "?"}
    </span>
  </div>
);

const RoleBadge = ({ role }) => (
  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
    {role === "admin" ? "Administrator" : "User"}
  </span>
);

const DashboardCard = ({
  icon,
  iconBgColor,
  iconColor,
  title,
  description,
  linkTo,
  value,
  onClick,
}) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}
        >
          <svg
            className={`w-6 h-6 ${iconColor}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {icon}
          </svg>
        </div>
        {value && (
          <span className="text-2xl font-bold text-gray-800">{value}</span>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={linkTo}
        onClick={onClick}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
      >
        {title.includes("Create")
          ? "Create Post"
          : title.includes("Profile")
          ? "View Profile"
          : "View My Posts"}
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  </div>
);

const AdminLink = ({ to, icon, title, description, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="group bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition-all duration-200 border border-gray-200 hover:border-indigo-300"
  >
    <div className="flex items-center">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors duration-200">
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  </Link>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { posts, loading, getPosts } = usePost();

  // Filter posts authored by current user
  const userPosts = useMemo(() => {
    if (!user || !posts) return [];
    return posts.filter((post) => post.author._id === user._id);
  }, [posts, user]);

  // Memoize dashboard cards to prevent recreation on every render
  const dashboardCards = useMemo(() => {
    if (!user) return [];

    return [
      {
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        ),
        iconBgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        title: "My Profile",
        description: "View and manage your profile information",
        linkTo: "/profile",
        value: "1",
      },
      {
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        ),
        iconBgColor: "bg-green-100",
        iconColor: "text-green-600",
        title: "My Posts",
        description:
          userPosts.length === 0
            ? "You haven't created any posts yet"
            : `You have ${userPosts.length} ${
                userPosts.length === 1 ? "post" : "posts"
              }`,
        linkTo: "/my-posts",
        value: userPosts.length,
      },
      {
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        ),
        iconBgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        title: "Create Post",
        description: "Share your thoughts with the community",
        linkTo: "/create-post",
        value: "+",
      },
    ];
  }, [user, userPosts.length]);

  // Memoize admin links to prevent recreation on every render
  const adminLinks = useMemo(
    () => [
      {
        to: "/admin/users",
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        ),
        title: "Manage Users",
        description: "View and manage user accounts",
      },
      {
        to: "/admin/posts",
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        ),
        title: "Manage Posts",
        description: "Review and manage all posts",
      },
    ],
    []
  );

  // Use useCallback to prevent recreation of functions on every render
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (user && user._id) {
      getPosts();
    }
  }, [user, getPosts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mt-4"></div>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center">
            <UserAvatar name={user?.name} />
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="opacity-90">{user?.email}</p>
              <div className="mt-2">
                <RoleBadge role={user?.role} />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <DashboardCard
              key={index}
              icon={card.icon}
              iconBgColor={card.iconBgColor}
              iconColor={card.iconColor}
              title={card.title}
              description={card.description}
              linkTo={card.linkTo}
              value={card.value}
              onClick={scrollToTop}
            />
          ))}
        </div>

        {/* Admin Dashboard */}
        {user?.role === "admin" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
              <p className="opacity-90 mt-1">Manage users and content</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {adminLinks.map((link, index) => (
                  <AdminLink
                    key={index}
                    to={link.to}
                    icon={link.icon}
                    title={link.title}
                    description={link.description}
                    onClick={scrollToTop}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
