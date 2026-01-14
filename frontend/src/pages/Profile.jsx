import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Profile Header Component
const ProfileHeader = ({ user }) => {
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  };

  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 overflow-hidden">
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

      <div className="relative text-center">
        {/* Avatar */}
        <div className="relative inline-block mb-4">
          <div className="absolute -inset-1 bg-white/30 rounded-full blur-sm"></div>
          <div className="relative w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
            <span className="text-3xl font-bold text-white">
              {getInitials(user?.name)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">Edit Profile</h2>
        <p className="text-white/80">Update your personal information</p>

        {/* User Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mt-4">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-sm font-medium text-white">{user?.email}</span>
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  autoComplete,
}) => (
  <div className="group">
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-slate-700 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

// Submit Button Component
const SubmitButton = ({ loading, children }) => (
  <button
    type="submit"
    disabled={loading}
    className="group relative w-full inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {/* Button Glow */}
    {!loading && (
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover:opacity-100 transition-all duration-300"></div>
    )}

    {/* Button */}
    <span
      className={`relative w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
        loading
          ? "bg-slate-100 text-slate-400"
          : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white"
      }`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        <>
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          {children}
        </>
      )}
    </span>
  </button>
);

// Footer Links Component
const FooterLinks = () => (
  <div className="mt-8 pt-6 border-t border-slate-100">
    <p className="text-center text-sm text-slate-500">
      By updating your profile, you agree to our{" "}
      <a
        href="#terms"
        className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        onClick={(e) => e.preventDefault()}
      >
        Terms of Service
      </a>{" "}
      and{" "}
      <a
        href="#privacy"
        className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        onClick={(e) => e.preventDefault()}
      >
        Privacy Policy
      </a>
    </p>
  </div>
);

// Account Info Section
const AccountInfo = ({ user }) => (
  <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900">Account Status</p>
        <p className="text-xs text-slate-500">
          Member since{" "}
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "N/A"}
        </p>
      </div>
      <div className="ml-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Active
        </span>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const formIcons = useMemo(
    () => ({
      name: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
      email: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
    }),
    []
  );

  const onChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const showSuccessToast = useCallback(() => {
    toast.success(
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold text-slate-900">
            Profile Updated Successfully!
          </p>
          <p className="mt-0.5 text-sm text-slate-500">
            Your changes have been saved.
          </p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        className:
          "border-l-4 border-emerald-500 bg-white shadow-lg rounded-lg",
      }
    );
  }, []);

  const showErrorToast = useCallback((error) => {
    toast.error(
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-rose-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold text-slate-900">Update Failed</p>
          <p className="mt-0.5 text-sm text-slate-500">
            {error.response?.data?.error ||
              "Failed to update profile. Please try again."}
          </p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        className: "border-l-4 border-rose-500 bg-white shadow-lg rounded-lg",
      }
    );
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await updateProfile(formData);
        showSuccessToast();
      } catch (error) {
        showErrorToast(error);
      }
    },
    [formData, updateProfile, showSuccessToast, showErrorToast]
  );

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-pink-100/40 rounded-full blur-[120px]"></div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-10 blur-xl"></div>

        {/* Main Card */}
        <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Header */}
          <ProfileHeader user={user} />

          {/* Form Content */}
          <div className="p-8">
            {/* Account Info */}
            <AccountInfo user={user} />

            {/* Form */}
            <form className="space-y-6" onSubmit={onSubmit}>
              <InputField
                id="name"
                name="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={onChange}
                icon={formIcons.name}
                autoComplete="name"
                required
              />

              <InputField
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={onChange}
                icon={formIcons.email}
                autoComplete="email"
                required
              />

              <div className="pt-4">
                <SubmitButton loading={loading}>Update Profile</SubmitButton>
              </div>
            </form>

            <FooterLinks />
          </div>

          {/* Bottom Gradient Line */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-xs text-slate-500">
              Your data is encrypted and secure
            </span>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-pink-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
