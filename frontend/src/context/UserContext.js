import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  loading: true,
  error: null,
  pagination: null,
};

const UserContext = createContext(initialState);

const userReducer = (state, action) => {
  switch (action.type) {
    case "USERS_LOADED":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "USER_DELETED":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        loading: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUsers = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`/users`);

      dispatch({
        type: "USERS_LOADED",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.error || "Failed to load users",
      });
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      dispatch({ type: "USER_DELETED", payload: id });
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete user");
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, getUsers, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
