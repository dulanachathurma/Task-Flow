# 📋 TaskFlow - Full-Stack Task Management App

A modern, responsive full-stack Task Management web application with JWT authentication, priority-based sorting, and a beautiful dual-column dashboard.

---

## 🚀 Features

- 🔐 User Authentication (JWT + bcrypt)
- 📝 Full CRUD Task Management
- 📊 Priority-based sorting (High / Medium / Low)
- 📌 Dual column dashboard (Pending / Done)
- 📅 Schedule date with "days left" countdown
- 🕐 Completed timestamp tracking
- 📱 Fully responsive mobile-friendly layout

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6, Axios, CSS |
| Backend | Node.js, Express 4, JWT, bcryptjs |
| Database | MongoDB Atlas (Mongoose) |
| Dev Tools | Vite, Nodemon |

---

## 📁 Project Structure

```
TaskFlow/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── server.js
│   ├── nodemon.json
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── context/AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 💻 Local Setup

### 1️⃣ Clone & Setup

```bash
git clone <your-repo-url>
cd TaskFlow
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=development
```

Start backend:

```bash
npm run dev
```

Backend runs on → `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on → `http://localhost:5173`

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Tasks (Protected - needs JWT token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all user tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## 🌐 MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user (username + password)
4. Whitelist your IP address (or use `0.0.0.0/0` for all)
5. Copy the connection string → paste in `.env` as `MONGO_URI`

---

## 📸 Screenshots

Login
<img width="1439" height="808" alt="Screenshot 2026-06-12 at 13 06 04" src="https://github.com/user-attachments/assets/b736f545-22b6-4e8f-ab34-b924898f3e7a" />
Register
  <img width="1439" height="808" alt="Screenshot 2026-06-12 at 13 06 22" src="https://github.com/user-attachments/assets/4e0e430b-01a8-431a-9eb2-c0bde3377c87" />
Dashboard
 <img width="1439" height="808" alt="Screenshot 2026-06-12 at 12 43 16" src="https://github.com/user-attachments/assets/2b54db65-3fb4-4bd5-bac4-ddf27bf3f989" />

 
# Task-Flow
