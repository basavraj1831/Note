# 📝 Note – Full Stack Application

A feature-rich, full-stack **Note-taking** application built using:

- 🌐 **Frontend**: React + TypeScript  
- 🛠️ **Backend**: Node.js + Express + TypeScript  
- 🗃️ **Database**: MongoDB  
- 🔐 **Authentication**: Email OTP + Google Sign-in  

---

## ✨ Features

- ✅ User Signup/Login with Email OTP  
- 🔐 Google Authentication (OAuth2)  
- 🗒️ Create, Delete Notes 
- 🧾 Token-based authentication (JWT)  
- 🔍 Clean and responsive UI  

---

## 🚀 Tech Stack

| Frontend              | Backend               | Database | Auth         |
|-----------------------|-----------------------|----------|--------------|
| React + TypeScript    | Node.js + Express + TypeScript     | MongoDB  | Email OTP, Google OAuth2 |

---

## 📁 Folder Structure

---
## ⚙️ Installation and Setup Guide

### 🔽 Step 1: Clone the Repository

```bash
git clone https://github.com/basavraj1831/Note.git
```

### 🔽 Step 2: Install all Dependecies

```bash
🖥️ Backend Setup
cd server
npm install

💻 Frontend Setup
cd ../client
npm install
```
---

## 💻 Run the Project
### 🧪 Development Mode

Open two terminals:
```bash
Terminal 1 – Start Backend
cd server
npm run dev
```
```bash
Terminal 2 – Start Frontend
cd client
npm run dev
```
---

## 🔐 Authentication Flow
### ✉️ Email OTP
- User enters email address
- OTP sent via email
- User enters OTP to verify
- JWT token is issued on success

### 🔓 Google Login
- User clicks "Login with Google"
- Google popup for authentication
- On success, user gets JWT token

---

## ⚙️ Environment Variables
Create a .env file inside the server/ directory:
```bash
MONGO_URI =
PORT = 
FRONTEND_URL = 
JWT_SECRET_KEY = 
SMTP_PASSWORD = 
SENDER_EMAIL = 
```
Create a .env file inside the client/ directory:
```bash
FIREBASE_API = 
VITE_BASE_URL =  
```
---

## 👨‍💻 Author
- Basavraj Birajdar
- basavrajbirajdar1831@gmail.com