import React, { memo } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show a centered loading spinner while auth state is resolving
  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        aria-label="Loading authentication status..."
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Only allow access if the user is authenticated and has an admin role
  if (isAuthenticated && user?.role === "admin") {
    return children;
  }

  // Redirect non-admin users to dashboard or another default route
  return <Navigate to="/dashboard" replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// Memoized for better performance in re-renders
export default memo(AdminRoute);
