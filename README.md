# 🌍 Afghan Blog Platform (MERN Stack)

<div align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
</div>

A **modern, full-featured blogging platform** built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** — designed to help creators write, publish, and manage their blogs with ease.  
With a strong focus on **performance, security, and accessibility**, Afghan Blog delivers a smooth and seamless experience on any device.

---

## 🚀 Live Demo

<div align="center">
  <a href="https://afghanblog.netlify.app/">
    <img src="https://img.shields.io/badge/Live_Demo-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Demo">
  </a>
</div>

---

## ✨ **Key Features**
<div align="center">
  <img src="https://img.icons8.com/color/96/000000/blog.png" width="60">
</div>

- 🔐 **User Authentication** – Secure login, registration, and logout using **JWT** and **HTTP-only cookies**.  
- 📝 **Full Post Management (CRUD)** – Create, edit, update, and delete posts with ease.  
- 💬 **Interactive System** – Like and comment on posts with **real-time feedback**.  
- 👤 **User Profiles** – Manage your profile and view your posts.  
- 🔎 **Search & Filter** – Find posts by **title or author** instantly.   
- 🛠️ **Admin Dashboard** – Manage users and posts with **admin privileges**.  
- 📱 **Responsive Design** – Built with **Tailwind CSS**, fully optimized for mobile and desktop.  
- 🔔 **User Notifications** – Toast notifications for success, errors, and alerts.  
- ⚙️ **Centralized Error Handling** – Clean and scalable Express error middleware.  

---

## 🧠 **Tech Stack Overview**

### 🖥️ **Frontend**
- **React.js** + **React Router**
- **Tailwind CSS** for modern styling
- **Axios** for API communication
- **React Toastify** for notifications
- **Context API** for global state management

### ⚙️ **Backend**
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **cookie-parser** for cookies
- **slugify**, **cors**, **multer** for uploads & SEO optimization

---

## ⚙️ **Installation & Setup**

### 🔧 Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)

---

### 🛠️ Backend Setup

```bash
cd backend
npm install
````

Create a `.env` file inside `backend/`:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

Start the backend server:

```bash
npm start
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

> The frontend runs on `http://localhost:3000` and connects to the backend API on `http://localhost:5000`.

---

## 🧩 **Usage Guide**

1. **Register/Login** → Create an account or log in.
2. **Create Posts** → Write and publish your blogs via the dashboard.
3. **Manage Posts** → Edit or delete your posts anytime.
4. **Interact** → Like and comment on posts in real-time.
5. **Admin Panel** → Admins can manage all posts and users.

---

## 🧑‍💻 **Contributing**

Contributions are welcome 💙

To contribute:

1. **Fork** the repository
2. **Create** a new branch
3. **Commit** your changes
4. **Submit** a pull request

> Please ensure your code style is consistent and your commits are descriptive.

---

## 🪪 **License**

This project is licensed under the **[MIT License](LICENSE)** — free to use, modify, and distribute.

---

## 👨‍🎨 **Author**

**Hafizullah Rasa**
🔗 [GitHub Profile](https://github.com/hafiz1379)
💡 Passionate about building impactful full-stack applications using modern web technologies.

---

## 🙏 **Acknowledgements**

Thanks to the MERN open-source community and the tools that made this project possible. Appreciation to everyone who supported and inspired the development of Afghan Blog.

---

### 🌟 *If you like this project, don’t forget to give it a ⭐ on GitHub!*
