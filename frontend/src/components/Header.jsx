import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isRTL = i18n.language === "fa";

  return (
    <header className={`bg-gray-800 text-white ${isRTL ? "font-farsi" : ""}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Afghan Blog
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-300">
              {t("nav.home")}
            </Link>
            <Link to="/posts" className="hover:text-gray-300">
              {t("nav.posts")}
            </Link>
            <LanguageSelector />
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-gray-300">
                  {t("nav.dashboard")}
                </Link>
                <div className="relative group">
                  <button className="flex items-center hover:text-gray-300">
                    {user?.name}
                    <svg
                      className={`ml-1 h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("nav.profile")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("nav.logout")}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              to="/"
              className="block py-2 hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/posts"
              className="block py-2 hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.posts")}
            </Link>
            <div className="py-2">
              <LanguageSelector />
            </div>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.dashboard")}
                </Link>
                <Link
                  to="/profile"
                  className="block py-2 hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.profile")}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 hover:text-gray-300"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="block py-2 hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
