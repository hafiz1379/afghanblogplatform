import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // تغییر جهت صفحه بر اساس زبان
    document.documentElement.dir = lng === "fa" ? "rtl" : "ltr";
    setIsOpen(false); // بستن منو بعد از انتخاب
  };

  // بستن منو در صورت کلیک بیرون از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      {/* دکمه باز/بسته کردن منو */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
        id="language-menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {i18n.language === "fa" ? "فارسی" : "English"}
        <svg
          className={`-mr-1 ml-2 h-5 w-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* منوی انتخاب زبان */}
      <div
        className={`absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 transform origin-top-right transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-menu"
      >
        <div className="py-1" role="none">
          <button
            onClick={() => changeLanguage("en")}
            className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm w-full text-right hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            role="menuitem"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("fa")}
            className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm w-full text-right hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            role="menuitem"
          >
            فارسی
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
