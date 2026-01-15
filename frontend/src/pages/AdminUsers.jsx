import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useUser } from "../context/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

// Stat Card Component
const StatCard = ({ icon, color, title, value }) => {
  const colorClasses = {
    indigo: {
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-600",
      border: "border-indigo-100",
      valueBg: "bg-indigo-500",
    },
    emerald: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
      border: "border-emerald-100",
      valueBg: "bg-emerald-500",
    },
    amber: {
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      iconText: "text-amber-600",
      border: "border-amber-100",
      valueBg: "bg-amber-500",
    },
  };

  const colors = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="group relative">
      {/* Card Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>

      {/* Card */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition-all duration-300 group-hover:shadow-lg group-hover:border-slate-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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
            <div>
              <p className="text-sm font-medium text-slate-500">{title}</p>
              <p className="text-3xl font-bold text-slate-900">{value}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="relative flex-shrink-0">
      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
          {getInitials(name)}
        </span>
      </div>
    </div>
  );
};

// Role Badge Component
const RoleBadge = ({ role }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
      role === "admin"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        role === "admin" ? "bg-amber-500" : "bg-emerald-500"
      }`}
    ></span>
    {role === "admin" ? "Admin" : "User"}
  </span>
);

// Delete Button Component
const DeleteButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200 text-sm font-medium"
  >
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
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
    Delete
  </button>
);

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-16 px-8">
    <div className="relative w-20 h-20 mx-auto mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-10"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">No users found</h3>
    <p className="text-slate-500">Get started by creating a new user.</p>
  </div>
);

// Delete Modal Component
const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
          onClick={onCancel}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
          {/* Header */}
          <div className="p-6 text-center">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 rounded-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Delete User
            </h3>

            {/* Description */}
            <p className="text-slate-600">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              type="button"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-3 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors duration-200"
              onClick={onConfirm}
            >
              Delete User
            </button>
          </div>

          {/* Bottom Line */}
          <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.pages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center">
      <nav className="inline-flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
        <button
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className={`p-2.5 rounded-lg transition-all duration-200 ${
            pagination.page === 1
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] h-10 rounded-lg font-medium transition-all duration-200 ${
                pagination.page === page
                  ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.pages}
          className={`p-2.5 rounded-lg transition-all duration-200 ${
            pagination.page === pagination.pages
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

const AdminUsers = () => {
  const { users, loading, getUsers, deleteUser, pagination } = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const regularUsers = users.filter((u) => u.role === "user").length;
    const adminUsers = users.filter((u) => u.role === "admin").length;

    return { totalUsers, regularUsers, adminUsers };
  }, [users]);

  const handleDeleteUser = useCallback((userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  }, []);

  const confirmDeleteUser = useCallback(() => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  }, [userToDelete, deleteUser]);

  const cancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      const limit = pagination?.limit || 10;
      getUsers(page, limit);
    },
    [getUsers, pagination?.limit]
  );

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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-sm font-medium text-indigo-600">
              User Management
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Manage{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Users
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            View and manage all registered users on the platform
          </p>

          {/* Decorative Line */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            }
            color="indigo"
            title="Total Users"
            value={stats.totalUsers}
          />
          <StatCard
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            }
            color="emerald"
            title="Regular Users"
            value={stats.regularUsers}
          />
          <StatCard
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            }
            color="amber"
            title="Admin Users"
            value={stats.adminUsers}
          />
        </div>

        {/* Users Table - Desktop View */}
        <div className="relative group hidden md:block">
          {/* Card Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-5 blur-xl"></div>

          {/* Card */}
          <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    User List
                  </h2>
                  <p className="text-sm text-slate-500">
                    {users.length} total users
                  </p>
                </div>
              </div>
            </div>

            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        className="hover:bg-slate-50/50 transition-colors duration-200"
                        style={{
                          animation: `fadeInUp 0.3s ease-out ${
                            index * 0.05
                          }s both`,
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <UserAvatar name={user.name} />
                            <div className="font-medium text-slate-900">
                              {user.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-slate-600">{user.email}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <RoleBadge role={user.role} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <DeleteButton
                            onClick={() => handleDeleteUser(user._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState />
            )}

            {/* Bottom Gradient Line */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          <div className="relative group">
            {/* Card Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-5 blur-xl"></div>

            {/* Card */}
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">User List</h2>
                  <p className="text-sm text-slate-500">
                    {users.length} total users
                  </p>
                </div>
              </div>

              {users.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {users.map((user, index) => (
                    <div
                      key={user._id}
                      className="p-5"
                      style={{
                        animation: `fadeInUp 0.3s ease-out ${
                          index * 0.05
                        }s both`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={user.name} />
                          <div>
                            <div className="font-medium text-slate-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-slate-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-200"
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
                      <div className="mt-3">
                        <RoleBadge role={user.role} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}

              {/* Bottom Gradient Line */}
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Pagination pagination={pagination} onPageChange={handlePageChange} />

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-pink-300"></div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onConfirm={confirmDeleteUser}
        onCancel={cancelDelete}
      />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminUsers;
