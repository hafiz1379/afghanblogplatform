import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

//  Register Header Component
const RegisterHeader = () => (
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
      <p className="text-white/80">Join our community today</p>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="w-8 h-1 rounded-full bg-white"></div>
        <div className="w-8 h-1 rounded-full bg-white/30"></div>
        <div className="w-8 h-1 rounded-full bg-white/30"></div>
      </div>
    </div>
  </div>
);

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
  helpText,
}) => (
  <div className="group">
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-slate-700 mb-2"
    >
      {label}
      {required && <span className="text-rose-500 ml-1">*</span>}
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
    {helpText && (
      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
        <svg
          className="w-3.5 h-3.5"
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
        {helpText}
      </p>
    )}
  </div>
);

// Submit Button Component
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
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
  <>
    {/* Sign In Link */}
    <div className="mt-8 text-center">
      <p className="text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        >
          Sign In
        </Link>
      </p>
    </div>

    {/* Terms */}
    <div className="mt-6 text-center">
      <p className="text-xs text-slate-500">
        By creating an account, you agree to our{" "}
        <a
          href="#terms"
          className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
          onClick={(e) => e.preventDefault()}
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#privacy"
          className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
          onClick={(e) => e.preventDefault()}
        >
          Privacy Policy
        </a>
      </p>
    </div>
  </>
);

// Password Strength Indicator Component
const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    if (!password) return { level: 0, text: "", color: "" };
    if (password.length < 6)
      return { level: 1, text: "Too short", color: "bg-rose-500" };
    if (password.length < 8)
      return { level: 2, text: "Weak", color: "bg-amber-500" };
    if (password.length < 12)
      return { level: 3, text: "Good", color: "bg-emerald-500" };
    return { level: 4, text: "Strong", color: "bg-emerald-600" };
  };

  const strength = getStrength();

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i <= strength.level ? strength.color : "bg-slate-200"
              }`}
            ></div>
          ))}
        </div>
        <span
          className={`text-xs font-medium ${
            strength.level <= 1
              ? "text-rose-500"
              : strength.level === 2
              ? "text-amber-500"
              : "text-emerald-500"
          }`}
        >
          {strength.text}
        </span>
      </div>
    </div>
  );
};

const Register = () => {
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = useMemo(
    () => formData,
    [formData]
  );

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

  const onChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const validateForm = useCallback(() => {
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
          <RegisterHeader />

          {/* Form Content */}
          <div className="p-8">
            <form className="space-y-5" onSubmit={onSubmit}>
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

              <div>
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
                />
                <PasswordStrength password={password} />
              </div>

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

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div
                  className={`flex items-center gap-2 text-sm ${
                    password === confirmPassword
                      ? "text-emerald-600"
                      : "text-rose-500"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {password === confirmPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    )}
                  </svg>
                  {password === confirmPassword
                    ? "Passwords match"
                    : "Passwords do not match"}
                </div>
              )}

              <div className="pt-2">
                <SubmitButton loading={loading}>Create Account</SubmitButton>
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-xs text-slate-500">
              Your data is protected with 256-bit encryption
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

export default Register;
