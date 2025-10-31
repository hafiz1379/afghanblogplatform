import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

// Extracted components for better organization
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
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
    >
      <svg
        className="w-4 h-4 mr-2 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {icon}
      </svg>
      {label}
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

const FormButton = ({
  type,
  onClick,
  className,
  children,
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {children}
  </button>
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

  // Memoize form data to prevent unnecessary re-renders
  const { title, content, excerpt, category, tags } = useMemo(
    () => formData,
    [formData]
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

  // Memoize icons to prevent recreation on every render
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

  // Use useCallback to prevent recreation of functions on every render
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

  // Fetch post data when component mounts or id changes
  useEffect(() => {
    getPost(id);
  }, [id, getPost]);

  // Update form data when post data is available
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Post</h1>
          <p className="text-gray-600">
            Make changes to your post and update it for your readers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mt-4"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <h2 className="text-2xl font-bold text-white">Post Details</h2>
              <p className="mt-2 text-blue-100">
                Update the information below to modify your post
              </p>
            </div>

            <div className="p-6">
              <form onSubmit={onSubmit} className="space-y-6">
                <FormField
                  id="title"
                  label="Title"
                  icon={formIcons.title}
                  value={title}
                  onChange={onChange}
                  placeholder="Enter a catchy title for your post"
                  required
                />

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

                <FormField
                  id="content"
                  label="Content"
                  type="textarea"
                  icon={formIcons.content}
                  value={content}
                  onChange={onChange}
                  rows={10}
                  placeholder="Write your post content here..."
                  helpText="You can use Markdown to format your content"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    id="category"
                    label="Category"
                    type="select"
                    icon={formIcons.category}
                    value={category}
                    onChange={onChange}
                  >
                    {categoryOptions}
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

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <FormButton
                    type="button"
                    id="cancel-button"
                    name="cancel-button"
                    onClick={navigateBack}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                  </FormButton>
                  <FormButton
                    type="submit"
                    id="update-button"
                    name="update-button"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                  </FormButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
