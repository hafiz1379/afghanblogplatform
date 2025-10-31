import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Extracted components for better organization
const ProfileHeader = ({ user }) => (
  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
    <div className="text-center">
      <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl font-bold text-white">
          {user?.name?.charAt(0).toUpperCase() ?? "?"}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
      <p className="mt-2 text-blue-100">Update your personal information</p>
    </div>
  </div>
);

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
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
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
        className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const SubmitButton = ({ loading, children }) => (
  <button
    type="submit"
    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
    disabled={loading}
  >
    {loading ? (
      <span className="flex items-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
      </span>
    ) : (
      children
    )}
  </button>
);

const FooterLinks = () => (
  <div className="mt-6 text-center">
    <p className="text-sm text-gray-500">
      By updating your profile, you agree to our{" "}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        className="font-medium text-blue-600 hover:text-blue-500"
        onClick={(e) => e.preventDefault()}
      >
        Terms of Service
      </a>{" "}
      and {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        className="font-medium text-blue-600 hover:text-blue-500"
        onClick={(e) => e.preventDefault()}
      >
        Privacy Policy
      </a>
    </p>
  </div>
);

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Memoize icons to prevent recreation on every render
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
          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        />
      ),
    }),
    []
  );

  // Use useCallback to prevent recreation of functions on every render
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
            className="h-6 w-6 text-green-400"
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
          <p className="text-sm font-medium text-green-900">
            Profile Updated Successfully!
          </p>
          <p className="mt-1 text-sm text-green-700">
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
        className: "border-l-4 border-green-500 bg-white shadow-lg",
      }
    );
  }, []);

  const showErrorToast = useCallback((error) => {
    toast.error(
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-red-400"
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
          <p className="text-sm font-medium text-red-900">Update Failed</p>
          <p className="mt-1 text-sm text-red-700">
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
        className: "border-l-4 border-red-500 bg-white shadow-lg",
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

  // Populate form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ProfileHeader user={user} />

          <div className="p-8">
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
