# ⚡ NexaTask - Full-Stack Task Management App

A modern, responsive full-stack Task Management web application featuring a premium **Glassmorphism Dark UI**, real-time task search, priority analytics, and interactive task tracking.

---

## 🎨 What's New in NexaTask (v2.0)

- 🎨 **Modern Dark Mode UI:** Designed with glassmorphism blur effects, vibrant neon gradients, and sleek interactive cards.
- 🚀 **NexaTask Rebranding:** Completely revamped identity with dedicated branding and unified visual aesthetic.
- 🔍 **Real-Time Task Search:** Instant search filter built right into the dashboard header.
- 📊 **Enhanced Stat Cards:** Color-coded analytics displaying Total, Pending, and Completed task metrics.
- 🃏 **Interactive Task Cards:** Hover-effect elevation, priority status badges (High / Medium / Low), and complete/delete triggers.
- 💅 **Glassmorphism Auth Pages:** Animated glass containers with smooth hover states for Login and Register views.

---

## 🚀 Key Features

- 🔐 User Authentication (JWT + bcrypt encryption)
- 📝 Full CRUD Task Management
- 🔎 Instant Title & Description Search
- 📊 Priority-based Sorting & Dynamic Categorization
- 📌 Dual-Column Board Layout (Pending vs. Completed)
- 📅 Schedule Tracking with Live "Days Left" Countdown
- 🕐 Timestamp Tracking for Completed Tasks
- 📱 Fully Mobile-Responsive Layout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, React Router v6, Axios, Modern CSS3 |
| **Backend** | Node.js, Express.js 4, JWT, bcryptjs |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Dev Tools** | Vite, Nodemon, Git |

---

## 📁 Project Structure

```text
NexaTask/
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
    └── package.json

---

## Live demo

<img width="1413" height="803" alt="Screenshot 2026-08-29 at 17 36 57" src="https://github.com/user-attachments/assets/79df2173-77d8-4d92-a0ef-1f444ef4a082" />

<img width="1413" height="803" alt="Screenshot 2026-08-29 at 17 36 50" src="https://github.com/user-attachments/assets/02728e68-9f5c-4b63-a490-61ca64a74090" />

<img width="331" height="241" alt="Screenshot 2026-08-29 at 17 30 42" src="https://github.com/user-attachments/assets/3f07ae75-718a-486b-ad91-79d770502cb2" />



