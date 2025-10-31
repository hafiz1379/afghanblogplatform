import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { UserProvider } from "./context/UserContext";
import AdminUsers from "./pages/AdminUsers";
import AdminPosts from "./pages/AdminPosts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        {" "}
        {/* Wrap the application with UserProvider */}
        <PostProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow pt-16">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/create-post"
                    element={
                      <ProtectedRoute>
                        <CreatePost />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-posts"
                    element={
                      <ProtectedRoute>
                        <MyPosts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/edit-post/:id"
                    element={
                      <ProtectedRoute>
                        <EditPost />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin routes */}
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <AdminUsers />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/posts"
                    element={
                      <AdminRoute>
                        <AdminPosts />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </Router>
        </PostProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
