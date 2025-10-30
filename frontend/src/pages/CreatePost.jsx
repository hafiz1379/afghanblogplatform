import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { toast } from "react-toastify";

// Extracted components for better organization
const FormField = ({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  rows,
  helpText,
  children,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        autoComplete="off"
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
      />
    ) : type === "select" ? (
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        autoComplete="off"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    )}
    {helpText && <p className="text-sm text-gray-500 mt-1">{helpText}</p>}
  </div>
);

const CreatePost = () => {
  const { createPost } = usePost();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "technology",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  // Memoize form data to prevent unnecessary re-renders
  const { title, content, excerpt, category, tags } = useMemo(
    () => formData,
    [formData]
  );

  // Use useCallback to prevent recreation of functions on every render
  const onChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const navigateToDashboard = useCallback(() => {
    navigate("/dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!title || !content || !excerpt) {
        toast.error("Please fill in all required fields");
        return;
      }

      setLoading(true);

      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const success = await createPost({
        title,
        content,
        excerpt,
        category,
        tags: tagsArray,
      });

      setLoading(false);
      if (success) {
        navigateToDashboard();
      }
    },
    [title, content, excerpt, category, tags, createPost, navigateToDashboard]
  );

  // Memoize category options to prevent recreation on every render
  const categoryOptions = useMemo(
    () => (
      <>
        <option value="technology">Technology</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="news">News</option>
        <option value="other">Other</option>
      </>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Post</h1>
          <p className="text-gray-600">
            Share your thoughts and ideas with the community
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mt-4"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <h2 className="text-2xl font-bold text-white">Post Details</h2>
              <p className="mt-2 text-blue-100">
                Fill in the information below to create your post
              </p>
            </div>

            <div className="p-6">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Title */}
                <FormField
                  id="title"
                  label="Title"
                  required
                  value={title}
                  onChange={onChange}
                  placeholder="Enter a catchy title for your post"
                />

                {/* Excerpt */}
                <FormField
                  id="excerpt"
                  label="Excerpt"
                  type="textarea"
                  required
                  value={excerpt}
                  onChange={onChange}
                  rows={3}
                  placeholder="Write a brief summary of your post"
                  helpText="This will be displayed in post previews and search results"
                />

                {/* Content */}
                <FormField
                  id="content"
                  label="Content"
                  type="textarea"
                  required
                  value={content}
                  onChange={onChange}
                  rows={10}
                  placeholder="Write your post content here..."
                  helpText="You can use Markdown to format your content"
                />

                {/* Category and Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    id="category"
                    label="Category"
                    type="select"
                    required
                    value={category}
                    onChange={onChange}
                  >
                    {categoryOptions}
                  </FormField>

                  <FormField
                    id="tags"
                    label="Tags"
                    value={tags}
                    onChange={onChange}
                    placeholder="tag1, tag2, tag3"
                    helpText="Separate tags with commas"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    aria-label="Cancel and go back to dashboard"
                    onClick={navigateToDashboard}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    aria-label="Save Post"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                  >
                    {loading ? "Processing..." : "Save Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
