# MAJ'25 — Digitalized Scout Camping Experience

MAJ'25 is a full-stack digital platform built for the Maliyadeva Adarsha Scout Group to modernize and streamline the entire camping experience in Sri Lanka. It was designed to bring registration, activity tracking, admin management, and participant profiles into one smart digital system.

This project represents Sri Lanka’s first digitalized camping experience for the scout community, combining a modern React frontend with a fast Express + MongoDB backend.

## ✨ What this project does

- Digital registration and participant profile management
- Activity tracking and marking for scout campers
- Admin dashboard for registrations, activity logs, and management
- Gallery, sponsor, and event information pages
- Secure login and protected admin routes
- QR/profile-based activity flow for event operations

## 🏗️ System architecture

The application is split into three main layers:

1. Frontend (React + Vite + Tailwind CSS)
   - User-facing pages for registration, profile, sponsors, gallery, and activity access
   - Admin pages for approvals, activity updates, and management
   - Protected routes and responsive UI for event operations

2. Backend (Express + Node.js)
   - REST API for registrations, authentication, activities, and admin operations
   - JWT-based protected routes and cookie-based session handling
   - CORS configuration for local and deployed environments

3. Database (MongoDB + Mongoose)
   - Stores registrations, activities, users, and admin data
   - Supports fast lookups by email, school, and activity references

### Architecture flow

Client (React/Vite) -> API (Express) -> MongoDB (Mongoose)

## 🔧 Tech stack

Frontend
- React 18
- Vite
- Tailwind CSS
- Redux Toolkit + Redux Persist
- React Router
- Axios
- Framer Motion

Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- Cookie Parser
- CORS

Deployment
- Frontend: Netlify
- Backend: Node server / hosting platform
- API proxy configured via Netlify redirect rules

## 📁 Project structure

- backend/ — Express API, controllers, models, routes, middleware
- frontend/ — React app, pages, components, assets
- netlify.toml — frontend deployment and API proxy configuration

## 🚀 Getting started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd MAJ-25
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Start the backend

Create a .env file in backend/ with your MongoDB connection string:

```env
MONGOURI=your_mongodb_connection_string
```

Then run:

```bash
npm run dev
```

The backend server will start on port 3000.

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 5. Start the frontend

```bash
npm run dev
```

The frontend will run on Vite’s local development server (usually http://localhost:5173).

## 🔐 Main backend flows

- Registration flow
  - Creates and validates participant entries
  - Checks duplicate emails
  - Stores payment and school information

- Activity marking flow
  - Marks participant activity completion using activity IDs and names
  - Supports activity updates and undo/remove actions

- Admin flow
  - Admin login, account management, and protected page access

## ⚡ Backend performance notes

This backend is designed to be lightweight and responsive for an event-based platform:

- Express API with focused REST endpoints for registration and activity operations
- Mongoose for efficient document-based storage and retrieval
- Fast lookups using email, school, and activity-based queries
- CORS and timeout handling for reliable frontend communication
- Structured controllers/routes to keep logic clean and scalable

For larger event traffic, the next improvement would be to add database indexing on frequently queried fields such as email, school, and activity IDs.

## ✅ Feature highlights

- Digital registration system
- Activity pass / mark system
- Admin-controlled event management
- Responsive and modern UI
- Scout event information and sponsor pages
- QR/profile integration for camp operations

## 🧭 Future improvements

- Add real-time analytics for registrations and activity completion
- Improve admin reporting and export features
- Add stronger validation and audit trail logs
- Introduce caching for frequently requested dashboards

## 👥 Project purpose

This project was built to preserve the spirit of scout camping in a modern digital form and to make event management more efficient, organized, and accessible for the Maliyadeva Adarsha Scout Group and its participants.

