# MERN Stack Authentication System

This project is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. It features a complete user authentication system with registration, login, and secure session management using JSON Web Tokens (JWT).

The frontend is built with React and Vite, styled with Tailwind CSS, and uses React Router for navigation. The backend is a Node.js and Express server that connects to a MongoDB database.

## ✨ Features

- **User Authentication**: Secure user registration and login.
- **JWT-based Sessions**: Uses JSON Web Tokens stored in `httpOnly` cookies for secure, stateless authentication.
- **Password Hashing**: Passwords are securely hashed using `bcrypt` before being stored.
- **Token Blacklisting**: Implements a server-side token blacklist for a more secure logout mechanism.
- **API Endpoints**: A well-defined RESTful API for authentication.
- **Client-Side Routing**: A seamless single-page application (SPA) experience using React Router.
- **Centralized State Management**: Uses React Context API for managing authentication state across the frontend.
- **Responsive UI**: A modern, responsive user interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**:
  - React
  - Vite
  - React Router
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Token (JWT)
  - bcrypt

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or later recommended)
- MongoDB installed and running on your local machine or a connection string to a cloud instance.

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone <your-repository-url>
    cd AI-project
    ```

2.  **Backend Setup:**
    - Navigate to the root directory.
    - Install the backend dependencies:
      ```sh
      npm install
      ```
    - Create a `.env` file in the root directory and add the following environment variables:
      ```env
      PORT=8000
      MONGO_URI=<your_mongodb_connection_string>
      JWT_SECRET=<your_strong_jwt_secret>
      ```
    - Start the backend server:
      ```sh
      npm start
      ```
      The server will be running on `http://localhost:8000`.

3.  **Frontend Setup:**
    - Open a new terminal window and navigate to the `Frontend` directory:
      ```sh
      cd Frontend
      ```
    - Install the frontend dependencies:
      ```sh
      npm install
      ```
    - **Important:** To avoid CORS issues during development, you need to set up a proxy. Create a `vite.config.js` file in the `Frontend` directory and add the following configuration:

      ```javascript
      import { defineConfig } from "vite";
      import react from "@vitejs/plugin-react";

      // https://vitejs.dev/config/
      export default defineConfig({
        plugins: [react()],
        server: {
          proxy: {
            "/api": {
              target: "http://localhost:8000", // Your backend server
              changeOrigin: true,
            },
          },
        },
      });
      ```

    - Start the frontend development server:
      ```sh
      npm run dev
      ```
      The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📝 API Endpoints

All endpoints are prefixed with `/api/auth`.

| Method | Endpoint    | Description                        |
| :----- | :---------- | :--------------------------------- |
| `POST` | `/register` | Registers a new user.              |
| `POST` | `/login`    | Logs in an existing user.          |
| `POST` | `/logout`   | Logs out the current user.         |
| `GET`  | `/me`       | Retrieves the current user's data. |

---

This README provides a solid starting point for your project. You can add more sections as your project grows, such as "Deployment", "Contributing", or more detailed "API Documentation".
