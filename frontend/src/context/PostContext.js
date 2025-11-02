import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

// Initial state
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: null,
  pagination: null,
  filters: {
    search: "",
    category: "",
    sort: "-createdAt",
  },
};

// Create context
const PostContext = createContext(initialState);

// Reducer
const postReducer = (state, action) => {
  switch (action.type) {
    case "POSTS_LOADED":
      return {
        ...state,
        posts: action.payload.data,
        pagination: action.payload.pagination,
        loading: false,
      };
    case "POST_LOADED":
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case "POST_CREATED":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case "POST_UPDATED":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post: action.payload,
        loading: false,
      };
    case "POST_DELETED":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        post: state.post?._id === action.payload ? null : state.post,
        loading: false,
      };
    case "POST_LIKED":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post:
          state.post?._id === action.payload._id ? action.payload : state.post,
        loading: false,
      };
    case "POST_UNLIKED":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post:
          state.post?._id === action.payload._id ? action.payload : state.post,
        loading: false,
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Provider component
export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  // eslint-disable-next-line no-unused-vars
  const { isAuthenticated } = useAuth();

  // Set base URL
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  // Get all posts for a specific user
  const getPosts = useCallback(async (page = 1, limit = 10, filters = {}) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await axios.get(`/posts?${params}`);
      dispatch({
        type: "POSTS_LOADED",
        payload: {
          data: res.data.data,
          pagination: res.data.pagination,
        },
      });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.error || "Failed to load posts",
      });
    }
  }, []);

  // Get single post using useCallback
  const getPost = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`/posts/${id}`);
      dispatch({
        type: "POST_LOADED",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.error || "Failed to load post",
      });
    }
  }, []);

  // Create post using useCallback
  const createPost = useCallback(async (formData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.post("/posts", formData);
      dispatch({
        type: "POST_CREATED",
        payload: res.data.data,
      });
      toast.success("Post created successfully");
      return res.data.data;
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.error || "Failed to create post",
      });
      toast.error(err.response?.data?.error || "Failed to create post");
    }
  }, []);

  // Update post using useCallback
  const updatePost = useCallback(async (id, formData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.put(`/posts/${id}`, formData);
      dispatch({
        type: "POST_UPDATED",
        payload: res.data.data,
      });
      toast.success("Post updated successfully");
      return res.data.data;
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.error || "Failed to update post",
      });
      toast.error(err.response?.data?.error || "Failed to update post");
    }
  }, []);

  // Delete post using useCallback
  const deletePost = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await axios.delete(`/posts/${id}`);
      dispatch({
        type: "POST_DELETED",
        payload: id,
      });
      toast.success("Post deleted successfully");
    } catch (err) {
      dispatch({
        type: "setLoading",
        payload: err.response?.data?.error || "Failed to delete post",
      });
      toast.error(err.response?.data?.error || "Failed to delete post");
    }
  }, []);

  const { token } = useAuth();

  // Like post using useCallback
  const likePost = useCallback(
    async (id) => {
      try {
        const res = await axios.put(
          `/posts/${id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch({
          type: "POST_LIKED",
          payload: res.data.data,
        });

        return { success: true };
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to like post");
        return { success: false, error: err.response?.data?.error };
      }
    },
    [token]
  );

  const unlikePost = useCallback(
    async (id) => {
      try {
        const res = await axios.put(
          `/posts/${id}/unlike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch({
          type: "POST_UNLIKED",
          payload: res.data.data,
        });

        return { success: true };
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to unlike post");
        return { success: false, error: err.response?.data?.error };
      }
    },
    [token]
  );
  // Set filters using useCallback
  const setFilters = useCallback((filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  }, []);

  // Clear error using useCallback
  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  return (
    <PostContext.Provider
      value={{
        ...state,
        getPosts,
        getPost,
        createPost,
        updatePost,
        deletePost,
        likePost,
        unlikePost,
        setFilters,
        clearError,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// Custom hook to use the post context
export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};

export default PostContext;
