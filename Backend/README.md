# 🌍 Travel Story App

### *(Node.js + Express + MongoDB + JWT + Multer + Cloudinary)*

A **travel storytelling web app** built with **Node.js**, **Express**, and **MongoDB**, featuring secure **JWT authentication**, **Cloudinary** image uploads, and flexible **story filtering**.
Users can **register, login, view profiles, post/edit/delete stories, upload travel images**, and **search/filter stories** by title, visited location, or travel dates.

---

## ✨ Features

### 🔐 User Management

* 👤 **Register / Login** with JWT authentication
* 🔑 **Protected routes** using middleware (`auth.user.js`)
* 🧾 **View user profile** details securely
* 🪪 **Token generation** handled by a custom utility (`generate.token.js`)

### 🗺️ Travel Stories

* 🖋️ **Create story** — post a travel story with image uploads
* ☁️ **Image Uploads** stored securely in **Cloudinary** via **Multer** configuration
* ✏️ **Edit story** — update details or change image
* 🗑️ **Delete story** — remove a story permanently
* 🔍 **Search stories** — query by:

  * Title
  * Story description
  * Visited location
  * Visited date
* 🗓️ **Filter by date range** — get all stories between specific `startDate` and `endDate`

---

## 🧩 Tech Stack

| Purpose            | Technology                       |
| ------------------ | -------------------------------- |
| Backend Framework  | **Node.js + Express**            |
| Database           | **MongoDB + Mongoose**           |
| Authentication     | **JWT (jsonwebtoken)**           |
| File Upload        | **Multer (for file handling)**   |
| Image Storage      | **Cloudinary**                   |
| Environment Config | **dotenv**                       |
| Utilities          | Custom token generator & helpers |

---

## 📁 Folder Structure

```
Backend/
├── Config/
│   ├── cloud.config.js       # Cloudinary setup
│   └── multer.config.js      # Multer storage & upload rules
│
├── Controllers/
│   ├── travelStory.controller.js  # Story CRUD logic
│   └── user.controller.js         # Auth & profile logic
│
├── DB/
│   └── connection.js         # MongoDB connection
│
├── Middlewares/
│   └── auth.user.js          # JWT verification middleware
│
├── Models/
│   ├── travel.model.js       # Story schema
│   └── user.model.js         # User schema
│
├── Routes/
│   ├── travelStory.routes.js # Story endpoints
│   └── user.routes.js        # Auth endpoints
│
├── Utility/
│   └── generate.token.js     # Access token creation
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>/Backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Start the server

```bash
npm start
```



---

## 🚀 API Endpoints Overview

### 👥 User Routes

| Method | Endpoint              | Description                  |
| ------ | --------------------- | ---------------------------- |
| `POST` | `/api/users/register` | Register a new user          |
| `POST` | `/api/users/login`    | Login and receive JWT        |
| `GET`  | `/api/users/profile`  | Get user profile (protected) |

---

### 🧳 Travel Story Routes

| Method   | Endpoint           | Description                            |
| -------- | ------------------ | -------------------------------------- |
| `POST`   | `/api/stories`     | Create a new story (with image upload) |
| `GET`    | `/api/stories`     | Get all stories                        |
| `GET`    | `/api/stories/:id` | Get a single story by ID               |
| `PUT`    | `/api/stories/:id` | Edit a story                           |
| `DELETE` | `/api/stories/:id` | Delete a story                         |

#### 🔍 Search & Filter

You can query stories dynamically:

```
GET /api/stories/search?title=mountain
GET /api/stories/search?visitedLocation=paris
GET /api/stories/search?visitedDate=2025-10-31
GET /api/stories/filter?startDate=2025-01-01&endDate=2025-12-31
```

> Combine parameters to refine results!

---

## 🧠 How It Works

1. **User registration/login**: Creates user, hashes password (bcrypt), issues JWT via `generate.token.js`.
2. **Auth middleware**: Validates JWT for protected routes.
3. **Multer + Cloudinary**: Handles file upload (local temporary storage → cloud upload).
4. **Story CRUD**: Controlled via `travelStory.controller.js`.
5. **Search & Filtering**: Queries MongoDB with regex for text fields and date ranges.






## ✅ Key Learnings

* Implementing **JWT authentication** securely in Express
* Using **Multer** for controlled file uploads
* Storing media in **Cloudinary** via API
* Handling **complex MongoDB queries** for text and date filters
* Structuring an Express app with **modular routes and controllers**

---

## 👩‍💻 Author

**Ritesh Kafle**
💻 Backend Developer | 🌏 Passion for Scalable APIs
📧 [GitHub](https://github.com/RiteshKafle1)

---

## 🤝 Contribute

Fork → Create a branch → Commit changes → Submit a Pull Request.
Feedback, ideas, and improvements are always welcome! 🚀
