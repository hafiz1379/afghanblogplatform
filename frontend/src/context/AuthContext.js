import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: true,
  isAuthenticated: false,
};

// Create context
const AuthContext = createContext(initialState);

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
    case "USER_UPDATED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set base URL
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  // Load user for authenticated routes using useCallback
  const loadUser = useCallback(async () => {
    if (!localStorage.token) {
      dispatch({ type: "AUTH_ERROR" });
      return;
    }

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      const res = await axios.get("/auth/me");
      dispatch({
        type: "USER_LOADED",
        payload: res.data.data,
      });
    } catch (err) {
      console.error("Error loading user:", err);
      localStorage.removeItem("token");
      dispatch({ type: "AUTH_ERROR" });
    }
  }, []);

  // Register user using useCallback
  const register = useCallback(
    async (formData) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post("/auth/register", formData, config);

        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        dispatch({
          type: "REGISTER_SUCCESS",
          payload: res.data,
        });

        await loadUser();

        toast.success("Registration successful");
        return { success: true };
      } catch (err) {
        dispatch({ type: "AUTH_ERROR" });
        let errorMessage = "Registration failed";

        // Extract error message from different possible structures
        if (err.response) {
          if (err.response.data && err.response.data.error) {
            errorMessage = err.response.data.error;
          } else if (err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (err.response.statusText) {
            errorMessage = err.response.statusText;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }

        console.error("Registration error:", err.response?.data || err.message);

        return {
          success: false,
          error: errorMessage,
          response: err.response,
        };
      }
    },
    [loadUser]
  );

  // Login user using useCallback
  const login = useCallback(
    async (formData) => {
      try {
        const res = await axios.post("/auth/login", formData);

        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });

        await loadUser();

        toast.success("Login successful");
        return { success: true };
      } catch (err) {
        dispatch({ type: "AUTH_ERROR" });
        let errorMessage = "Login failed";

        // Extract error message from different possible structures
        if (err.response) {
          if (err.response.data && err.response.data.error) {
            errorMessage = err.response.data.error;
          } else if (err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (err.response.statusText) {
            errorMessage = err.response.statusText;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }

        console.error("Login error:", err.response?.data || err.message);

        return {
          success: false,
          error: errorMessage,
          response: err.response,
        };
      }
    },
    [loadUser]
  );

  // Logout
  const logout = async () => {
    try {
      delete axios.defaults.headers.common["Authorization"];
      await axios.get("/auth/logout");
      dispatch({ type: "LOGOUT" });
      toast.success("Logged out successfully");
    } catch (err) {
      dispatch({ type: "LOGOUT" });
      toast.error("Logout failed");
    }
  };

  // Update user profile using useCallback
  const updateProfile = useCallback(async (formData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.put("/auth/me", formData);
      dispatch({
        type: "USER_UPDATED",
        payload: res.data.data,
      });
      toast.success("Profile updated successfully");
      return { success: true };
    } catch (err) {
      dispatch({ type: "AUTH_ERROR" });
      let errorMessage = "Failed to update profile";

      // Extract error message from different possible structures
      if (err.response) {
        if (err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.statusText) {
          errorMessage = err.response.statusText;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);

      return {
        success: false,
        error: errorMessage,
        response: err.response,
      };
    }
  }, []);

  // Set loading
  const setLoading = (loading) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  useEffect(() => {
    if (localStorage.token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
    }
    loadUser();
  }, [loadUser]);

  // This effect ensures axios has the correct Authorization header
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        loadUser,
        setLoading,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
