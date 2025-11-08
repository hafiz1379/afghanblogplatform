# Afghan Blog Platform

Afghan Blog is a full-featured blogging platform built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). It offers a clean and intuitive interface for creating, editing, and managing blog posts with ease. Designed for performance and usability, the platform includes secure authentication, and a fully responsive design that ensures a smooth experience across all devices.

---
## 🚀 Live Demo

👉 **[View the Live Demo Here](https://afghanblog.netlify.app/)**

---
## Features

- **User Authentication**: Secure registration, login, and logout with JWT and HTTP-only cookies.
- **Full Post Management**: Create, read, update, and delete posts (CRUD operations).
- **Interactive System**: Like and comment on posts with real-time feedback.
- **User Profiles**: View user posts and manage profile information.
- **Search & Filter**: Search posts by title or author.
- **SEO-Friendly URLs**: Clean, human-readable URLs using `slugify`.
- **Admin Dashboard**: Manage posts and users with admin privileges.
- **Responsive UI**: Modern, mobile-first design with Tailwind CSS.
- **User Notifications**: Success and error messages via Toast notifications.
- **Robust Error Handling**: Centralized error middleware for Express.

---

## Technologies Used

### Backend

- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **cookie-parser** for managing cookies
- **slugify** for SEO-friendly URLs
- **cors**, **multer** (for image uploads)

### Frontend

- **React.js** with **React Router**
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **react-toastify** for notifications
- **react-i18next** for internationalization
- **Context API** for global state management

---

## Project Structure

```

AfghanBlogPlatform/
├── backend/
│   ├── controllers/
│   │   ├── auth.js
│   │   ├── comments.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── error.js
│   ├── models/
│   │   ├── Comment.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── comments.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── utils/
│   │   ├── errorResponse.js
│   │   └── sendTokenResponse.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminRoute.jsx
│   │   ├── CommentSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LanguageSelector.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── PostCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── PostContext.js
│   │   └── UserContext.js
│   ├── pages/
│   │   ├── AdminPosts.jsx
│   │   ├── AdminUsers.jsx
│   │   ├── CreatePost.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditPost.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyPosts.jsx
│   │   ├── PostDetail.jsx
│   │   ├── Posts.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   ├── App.jsx
│   ├── index.css
│   └── index.jsx
├── package.json
└── tailwind.config.js

```

---

## Installation & Setup

### Prerequisites

- **Node.js** v16+
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)

### Backend Setup

```bash
cd backend
npm install
```

1. Create a `.env` file in `backend`:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

2. Start the backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

- Frontend runs on `http://localhost:3000` and communicates with backend at `http://localhost:5000`.

---

## Usage

- **Registration/Login**: Create a new account or log in.
- **Create Posts**: After logging in, use the dashboard to add posts.
- **Manage Posts**: Edit or delete posts you own.
- **Interact**: Like posts and add comments.
- **Admin Panel**: Admin users can manage all posts and users.

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.
3. Submit a pull request with your changes.

---

## License

This project is licensed under the MIT License.

---

## Author

- **Hafizullah Rasa** – [GitHub Profile](https://github.com/hafiz1379)

---

## Acknowledgements

- Inspired by MERN stack tutorials and open-source blog platforms.
- Thanks to contributors enhancing UI/UX, accessibility, and performance.
