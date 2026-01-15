import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

// Modern Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl animate-pulse">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
          <svg
            className="h-5 w-5 text-rose-600"
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
      </div>
      <div>
        <p className="text-sm font-semibold text-rose-800">Login Failed</p>
        <p className="text-sm text-rose-600 mt-0.5">{message}</p>
      </div>
    </div>
  </div>
);

// Modern Login Header Component
const LoginHeader = () => (
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
      {/* Icon */}
      <div className="relative inline-block mb-4">
        <div className="absolute -inset-1 bg-white/30 rounded-full blur-sm"></div>
        <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
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
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
      <p className="text-white/80">Sign in to your account</p>

      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mt-4">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        <span className="text-sm font-medium text-white">
          Secure Connection
        </span>
      </div>
    </div>
  </div>
);

// Modern Input Field Component
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
          className={`h-5 w-5 transition-colors duration-200 ${
            error
              ? "text-rose-400"
              : "text-slate-400 group-focus-within:text-indigo-500"
          }`}
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
        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
          error
            ? "border-rose-300 focus:ring-rose-500 focus:border-transparent"
            : "border-slate-200 focus:ring-indigo-500 focus:border-transparent"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

// Modern Submit Button Component
const SubmitButton = ({ loading, children }) => (
  <button
    type="submit"
    disabled={loading}
    className="group/btn relative w-full inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {/* Button Glow */}
    {!loading && (
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover/btn:opacity-100 transition-all duration-300"></div>
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
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          {children}
        </>
      )}
    </span>
  </button>
);

// Modern Footer Links Component
const FooterLinks = () => (
  <>
    {/* Sign Up Link */}
    <div className="mt-8 text-center">
      <p className="text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        >
          Sign Up
        </Link>
      </p>
    </div>
  </>
);

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const { email, password } = formData;

  const formIcons = useMemo(
    () => ({
      email: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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

  const onChange = useCallback(
    (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
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

      setLoginError("");

      try {
        const result = await login({ email, password });

        if (!result.success) {
          setLoginError(result.error);
        }
      } catch (error) {
        console.error("Unexpected login error:", error);
        setLoginError("An unexpected error occurred. Please try again.");
      }
    },
    [email, password, login]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
          <LoginHeader />

          {/* Form Content */}
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
              Protected by enterprise-grade security
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

export default Login;
