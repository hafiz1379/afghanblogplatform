import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

// Category options with colors
const CATEGORIES = [
  { value: "technology", label: "Technology", color: "indigo" },
  { value: "lifestyle", label: "Lifestyle", color: "purple" },
  { value: "business", label: "Business", color: "emerald" },
  { value: "entertainment", label: "Entertainment", color: "pink" },
  { value: "news", label: "News", color: "amber" },
  { value: "other", label: "Other", color: "slate" },
];

// Form Field Component
const FormField = ({
  id,
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  rows,
  helpText,
  required = false,
  children,
}) => (
  <div className="group">
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
    >
      <svg
        className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {icon}
      </svg>
      {label}
      {required && <span className="text-rose-500">*</span>}
    </label>

    {type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200 resize-none"
      />
    ) : type === "select" ? (
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200"
      />
    )}

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

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, updatePost, loading, post } = usePost();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "technology",
    tags: [],
  });

  const { title, content, excerpt, category, tags } = useMemo(
    () => formData,
    [formData]
  );

  // Memoize icons
  const formIcons = useMemo(
    () => ({
      title: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      ),
      excerpt: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h7"
        />
      ),
      content: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      ),
      category: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      ),
      tags: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
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

  const onTagsChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  }, []);

  const navigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await updatePost(id, formData);
        toast.success("Post updated successfully");
        navigate(`/posts/${id}`);
      } catch (error) {
        toast.error("Failed to update post");
      }
    },
    [id, formData, updatePost, navigate]
  );

  useEffect(() => {
    getPost(id);
  }, [id, getPost]);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
        excerpt: post.excerpt || "",
        category: post.category || "technology",
        tags: post.tags || [],
      });
    }
  }, [post]);

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
          {/* Back Button */}
          <button
            onClick={navigateBack}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 shadow-sm transition-all duration-200 mb-6"
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="text-sm font-medium text-indigo-600">
              Edit Mode
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Edit{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Post
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            Make changes to your post and update it for your readers
          </p>

          {/* Decorative Line */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Form Card */}
          <div className="relative group">
            {/* Card Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-10 blur-xl"></div>

            {/* Card */}
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              {/* Header */}
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

                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Post Details
                    </h2>
                    <p className="text-white/80">
                      Update the information below to modify your post
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Title Field */}
                  <FormField
                    id="title"
                    label="Title"
                    icon={formIcons.title}
                    value={title}
                    onChange={onChange}
                    placeholder="Enter a catchy title for your post"
                    required
                  />

                  {/* Excerpt Field */}
                  <FormField
                    id="excerpt"
                    label="Excerpt"
                    type="textarea"
                    icon={formIcons.excerpt}
                    value={excerpt}
                    onChange={onChange}
                    rows={3}
                    placeholder="Write a brief summary of your post"
                    helpText="This will be displayed in post previews and search results"
                    required
                  />

                  {/* Content Field */}
                  <FormField
                    id="content"
                    label="Content"
                    type="textarea"
                    icon={formIcons.content}
                    value={content}
                    onChange={onChange}
                    rows={12}
                    placeholder="Write your post content here..."
                    helpText="You can use Markdown to format your content"
                    required
                  />

                  {/* Category & Tags Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      id="category"
                      label="Category"
                      type="select"
                      icon={formIcons.category}
                      value={category}
                      onChange={onChange}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </FormField>

                    <FormField
                      id="tags"
                      label="Tags"
                      icon={formIcons.tags}
                      value={tags.join(", ")}
                      onChange={onTagsChange}
                      placeholder="tag1, tag2, tag3"
                      helpText="Separate tags with commas"
                    />
                  </div>

                  {/* Preview Section */}
                  {(title || excerpt) && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Preview
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">
                        {title || "Untitled Post"}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {excerpt || "No excerpt provided"}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={navigateBack}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="group/btn relative inline-flex items-center justify-center"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-70 blur group-hover/btn:opacity-100 transition-all duration-300"></div>
                      <span className="relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200">
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
                        Update Post
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Bottom Gradient Line */}
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Writing Tips
                </h4>
                <p className="text-sm text-slate-600">
                  Use a compelling title, write a clear excerpt for better SEO,
                  and break your content into readable sections. Don't forget to
                  add relevant tags!
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="flex items-center justify-center gap-3 mt-12">
            <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-pink-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
