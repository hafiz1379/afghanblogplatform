import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

// Extracted components for better organization
const ErrorMessage = ({ message }) => (
  <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md animate-pulse">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-red-800">Login Failed</p>
        <p className="text-sm text-red-700">{message}</p>
      </div>
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
  error,
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
        className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
          error ? "border-red-300" : "border-gray-300"
        } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? "focus:ring-red-500 focus:border-red-500"
            : "focus:ring-blue-500 focus:border-transparent"
        } transition-all duration-200`}
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

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  // Memoize form data to prevent unnecessary re-renders
  const { email, password } = formData;

  // Memoize icons to prevent recreation on every render
  const formIcons = useMemo(
    () => ({
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
    }),
    []
  );

  // Use useCallback to prevent recreation of functions on every render
  const onChange = useCallback(
    (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
      // Clear error when user starts typing
      if (loginError) {
        setLoginError("");
      }
    },
    [loginError]
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Please enter all fields");
        return;
      }

      setLoginError(""); // Clear previous error

      try {
        const result = await login({ email, password });

        if (!result.success) {
          // Set the error message from the returned result
          setLoginError(result.error);
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error("Unexpected login error:", error);
        setLoginError("An unexpected error occurred. Please try again.");
      }
    },
    [email, password, login]
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="mt-2 text-blue-100">Sign in to your account</p>
            </div>
          </div>

          <div className="p-8">
            {/* Error Message */}
            {loginError && <ErrorMessage message={loginError} />}

            <form className="space-y-6" onSubmit={onSubmit}>
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                value={email}
                onChange={onChange}
                error={loginError}
                icon={formIcons.email}
                autoComplete="email"
                required
              />

              <InputField
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
                error={loginError}
                icon={formIcons.password}
                autoComplete="current-password"
                required
              />

              <div className="pt-2">
                <SubmitButton loading={loading}>Sign In</SubmitButton>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
