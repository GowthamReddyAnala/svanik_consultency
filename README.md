# Svanik Consistency - Web Application

A full-stack web application for professional consultancy services with landing page, consultation form, booking calendar, services listing, testimonials, and contact pages.

## Prerequisites

- **Node.js** (v18+): [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)

## Quick Setup & Installation

### Step 1: Navigate to Project Directory

Open Command Prompt (cmd) or PowerShell and navigate to the project folder:

```cmd
cd d:\Gowtham\Learning
```

### Step 2: Install Root Dependencies

```cmd
npm install
```

This installs `concurrently` for running frontend and backend together.

### Step 3: Install Frontend Dependencies

```cmd
npm install --prefix frontend
```

This installs React, React-DOM, and Vite.

### Step 4: Install Backend Dependencies

```cmd
npm install --prefix backend
```

This installs Express and CORS.

## Running the Project

### Option A: Run Both Frontend & Backend (Recommended)

```cmd
npm run dev
```

This starts:
- **Frontend** on `http://localhost:5173` (Vite dev server)
- **Backend** on `http://localhost:4000` (Express server)

### Option B: Run Separately

**Frontend only:**
```cmd
npm run dev:frontend
```

**Backend only:**
```cmd
npm run dev:backend
```

## Project Structure

```
svanik-consistency/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── pages/        # Home, About, Contact pages
│   │   ├── components/   # Header, Form, Calendar, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/              # Express API server
│   ├── index.js          # Main server file
│   └── package.json
├── package.json          # Root config (concurrently)
└── README.md
```

## Features

- **Landing Page**: Hero section with CTA button
- **Consultation Form**: Name, email, phone, service type, message, preferred date/time
- **Booking Calendar**: Available consultation slots
- **Services List**: Project Planning, Cost Estimation, Structural Design, etc.
- **Testimonials**: Customer feedback and case studies
- **About Us**: Team, mission, experience
- **Contact**: Footer with privacy, terms, social links

## API Endpoints

- `GET /api/slots` — Fetch available consultation time slots
- `POST /api/consultation` — Submit consultation request

## Troubleshooting

### npm command not found
- Ensure Node.js is installed: `node --version`
- Restart terminal after installing Node.js

### Port already in use
- Change port in `backend/index.js`: `const port = process.env.PORT || 4000`
- Or set environment: `set PORT=5000` (cmd) or `$env:PORT=5000` (PowerShell)

### Frontend shows blank page
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure backend is running on port 4000

## Notes

- Uses **Tailwind CSS** via CDN for styling
- Backend is stateless (can be enhanced with database later)
- Vite hot-reloads on code changes
