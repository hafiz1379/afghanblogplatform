import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

// Extracted components for better organization
const RegisterHeader = () => (
  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
    <div className="text-center">
      <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white">Create Account</h2>
      <p className="mt-2 text-blue-100">Join our community today</p>
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
  helpText,
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
    {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
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
  <>
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
        >
          Sign In
        </Link>
      </p>
    </div>

    <div className="mt-6 text-center">
      <p className="text-xs text-gray-500">
        By creating an account, you agree to our{" "}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="text-blue-600 hover:text-blue-500 transition-colors duration-200"
          onClick={(e) => e.preventDefault()}
        >
          Terms of Service
        </a>{" "}
        and {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="text-blue-600 hover:text-blue-500 transition-colors duration-200"
          onClick={(e) => e.preventDefault()}
        >
          Privacy Policy
        </a>
      </p>
    </div>
  </>
);

const Register = () => {
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Memoize form data to prevent unnecessary re-renders
  const { name, email, password, confirmPassword } = useMemo(
    () => formData,
    [formData]
  );

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
      password: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      ),
      confirmPassword: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
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

  const validateForm = useCallback(() => {
    // Validate form data
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please enter all fields");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    // Simple email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    return true;
  }, [name, email, password, confirmPassword]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (validateForm()) {
        register({ name, email, password });
      }
    },
    [validateForm, register, name, email, password]
  );

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <RegisterHeader />

          <div className="p-8">
            <form className="space-y-6" onSubmit={onSubmit}>
              <InputField
                id="name"
                name="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
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
                value={email}
                onChange={onChange}
                icon={formIcons.email}
                autoComplete="email"
                required
              />

              <InputField
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Create a password"
                value={password}
                onChange={onChange}
                icon={formIcons.password}
                autoComplete="new-password"
                required
                helpText="Must be at least 6 characters"
              />

              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={onChange}
                icon={formIcons.confirmPassword}
                autoComplete="new-password"
                required
              />

              <div className="pt-2">
                <SubmitButton loading={loading}>Create Account</SubmitButton>
              </div>
            </form>

            <FooterLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
