# svanik-consultant - Web Application

A full-stack web application for professional consultancy services with landing page, consultation form, booking calendar, services listing, testimonials, contact pages, **and image gallery management**.

## ✨ New Feature: Image Upload & Gallery

**Admins can now upload, manage, and display images!**
- 📸 Upload up to 10 images at once
- 🏷️ Organize by categories  
- 👥 Display gallery to users
- ✏️ Edit image metadata
- 🗑️ Delete unused images
- 📱 Fully responsive design

[Quick Start Guide](QUICK_START_IMAGES.md) | [Full Documentation](IMAGE_UPLOAD_GUIDE.md) | [Implementation Details](IMAGE_UPLOAD_IMPLEMENTATION.md)

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
svanik-consultant/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── pages/        # Home, About, Contact, Admin pages
│   │   ├── components/   # Header, Form, Calendar, Gallery, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/              # Express API server
│   ├── index.js          # Main server + image endpoints
│   ├── database.js       # Database schema + functions
│   ├── uploads/          # Image storage (created automatically)
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
- **Gallery Management** ⭐: **NEW**
  - Admin upload and management interface
  - User-facing responsive gallery
  - Category filtering
  - Lightbox view
  - Image optimization
- **About Us**: Team, mission, experience
- **Contact**: Footer with privacy, terms, social links

## API Endpoints

### Consultation & Contact
- `GET /api/slots` — Fetch available consultation time slots
- `POST /api/consultation` — Submit consultation request
- `POST /api/contact` — Submit contact message
- `GET /api/admin/consultations` — Get all consultations (admin)
- `GET /api/admin/contacts` — Get all contacts (admin)

### Image Gallery
- `GET /api/gallery` — Get all public images
- `POST /api/admin/gallery/upload` — Upload images (admin)
- `GET /api/admin/gallery/:id` — Get image details (admin)
- `PATCH /api/admin/gallery/:id` — Update image metadata (admin)
- `DELETE /api/admin/gallery/:id` — Delete image (admin)

## Troubleshooting

### npm command not found
- Ensure Node.js is installed: `node --version`
- Restart terminal after installing Node.js

### Port already in use
- Change port in `backend/index.js`: `const port = process.env.PORT || 4000`

### Image upload issues
- Ensure backend dependencies are installed: `cd backend && npm install`
- Check `/backend/uploads/` directory was created
- Verify images are less than 10MB
- Ensure files are valid image formats (JPEG, PNG, WebP, GIF)

## Documentation

- [Image Upload Quick Start](QUICK_START_IMAGES.md) - Get started in 5 minutes
- [Image Upload Guide](IMAGE_UPLOAD_GUIDE.md) - Complete documentation
- [Implementation Details](IMAGE_UPLOAD_IMPLEMENTATION.md) - Technical overview
- [Quick Reference](IMAGE_UPLOAD_REFERENCE.md) - API and feature reference
- Or set environment: `set PORT=5000` (cmd) or `$env:PORT=5000` (PowerShell)

### Frontend shows blank page
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure backend is running on port 4000

## Notes

- Uses **Tailwind CSS** via CDN for styling
- Backend is stateless (can be enhanced with database later)
- Vite hot-reloads on code changes
