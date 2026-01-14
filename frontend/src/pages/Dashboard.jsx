import React, { useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";

// User Avatar Component
const UserAvatar = ({ name }) => {
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-50 blur-sm"></div>
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center border-2 border-white shadow-lg">
        <span className="text-2xl font-bold text-white">
          {getInitials(name)}
        </span>
      </div>
    </div>
  );
};

// Role Badge Component
const RoleBadge = ({ role }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
      role === "admin"
        ? "bg-amber-100 text-amber-700 border border-amber-200"
        : "bg-indigo-100 text-indigo-700 border border-indigo-200"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        role === "admin" ? "bg-amber-500" : "bg-indigo-500"
      }`}
    ></span>
    {role === "admin" ? "Administrator" : "User"}
  </span>
);

// Dashboard Card Component
const DashboardCard = ({
  icon,
  color,
  title,
  description,
  linkTo,
  value,
  onClick,
}) => {
  const colorClasses = {
    indigo: {
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-600",
      border: "border-indigo-100",
      hoverBorder: "hover:border-indigo-200",
      link: "text-indigo-600 hover:text-indigo-700",
      valueBg: "bg-indigo-500",
    },
    emerald: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
      border: "border-emerald-100",
      hoverBorder: "hover:border-emerald-200",
      link: "text-emerald-600 hover:text-emerald-700",
      valueBg: "bg-emerald-500",
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
      border: "border-purple-100",
      hoverBorder: "hover:border-purple-200",
      link: "text-purple-600 hover:text-purple-700",
      valueBg: "bg-purple-500",
    },
  };

  const colors = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="group relative">
      {/* Card Glow */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`}
      ></div>

      {/* Card */}
      <div
        className={`relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:border-slate-300`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center transition-colors duration-300`}
            >
              <svg
                className={`w-7 h-7 ${colors.iconText}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {icon}
              </svg>
            </div>
            {value !== undefined && (
              <div
                className={`min-w-[48px] h-12 ${colors.valueBg} rounded-xl flex items-center justify-center`}
              >
                <span className="text-xl font-bold text-white">{value}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <h2 className="text-xl font-bold mb-2 text-slate-900">{title}</h2>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            {description}
          </p>

          {/* Link */}
          <Link
            to={linkTo}
            onClick={onClick}
            className={`inline-flex items-center gap-2 ${colors.link} font-semibold text-sm transition-colors duration-200 group/link`}
          >
            {title.includes("Create")
              ? "Create Post"
              : title.includes("Profile")
              ? "View Profile"
              : "View My Posts"}
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 w-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Admin Link Component
const AdminLink = ({ to, icon, title, description, onClick, color }) => {
  const colorClasses = {
    indigo: {
      iconBg: "bg-indigo-100 group-hover:bg-indigo-200",
      iconText: "text-indigo-600",
      dot: "bg-indigo-500",
    },
    purple: {
      iconBg: "bg-purple-100 group-hover:bg-purple-200",
      iconText: "text-purple-600",
      dot: "bg-purple-500",
    },
  };

  const colors = colorClasses[color] || colorClasses.indigo;

  return (
    <Link
      to={to}
      onClick={onClick}
      className="group relative flex items-center gap-4 p-5 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
    >
      <div
        className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center transition-colors duration-200`}
      >
        <svg
          className={`w-7 h-7 ${colors.iconText}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-slate-900 mb-1">{title}</h3>
        <p className="text-slate-500 text-sm">{description}</p>
      </div>
      <svg
        className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-all duration-200 group-hover:translate-x-1"
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
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const { posts, loading, getPosts } = usePost();

  const userPosts = useMemo(() => {
    if (!user || !posts) return [];
    return posts.filter((post) => post.author._id === user._id);
  }, [posts, user]);

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
        color: "indigo",
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
        color: "emerald",
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
        color: "purple",
        title: "Create Post",
        description: "Share your thoughts with the community",
        linkTo: "/create-post",
        value: "+",
      },
    ];
  }, [user, userPosts.length]);

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
        color: "indigo",
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
        color: "purple",
      },
    ],
    []
  );

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-pink-100/40 rounded-full blur-[120px]"></div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-6">
            <svg
              className="w-4 h-4 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            <span className="text-sm font-medium text-indigo-600">
              Dashboard
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {user?.name}
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            Here's what's happening with your account today.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="relative group mb-10">
          {/* Card Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-20 blur-xl"></div>

          {/* Card */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-xl p-8 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              ></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
              <UserAvatar name={user?.name} />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {user?.name}
                </h2>
                <p className="text-white/80 mb-3">{user?.email}</p>
                <RoleBadge role={user?.role} />
              </div>

              {/* Quick Stats */}
              <div className="flex gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{userPosts.length}</div>
                  <div className="text-white/70 text-sm">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {userPosts.reduce(
                      (acc, post) => acc + (post.likes?.length || 0),
                      0
                    )}
                  </div>
                  <div className="text-white/70 text-sm">Total Likes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {dashboardCards.map((card, index) => (
            <DashboardCard
              key={index}
              icon={card.icon}
              color={card.color}
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
          <div className="relative group">
            {/* Card Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-5 blur-xl"></div>

            {/* Card */}
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: "32px 32px",
                    }}
                  ></div>
                </div>

                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Admin Dashboard
                    </h2>
                    <p className="text-slate-400">
                      Manage users and content across the platform
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adminLinks.map((link, index) => (
                    <AdminLink
                      key={index}
                      to={link.to}
                      icon={link.icon}
                      title={link.title}
                      description={link.description}
                      color={link.color}
                      onClick={scrollToTop}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Gradient Line */}
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
          </div>
        )}

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-pink-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
