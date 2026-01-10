# Image Upload Feature - Quick Start Guide

## What's New

✨ **Admin users can now upload, manage, and display images securely!**

## Getting Started (5 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start the Application
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 3: Access Admin Panel
1. Go to `http://localhost:5173`
2. Click "Admin" in navigation
3. Enter password: `admin123`
4. Click on **"Gallery"** tab

### Step 4: Upload Your First Image
1. Click the upload area (or drag & drop)
2. Select up to 10 images at once
3. Choose a category (optional)
4. Click "Upload [X] Image(s)"
5. ✅ Done! Images appear on Home gallery

## Key Features

### 👤 For Users
- View gallery with category filters
- Click images for full-screen lightbox
- Navigate with arrow buttons
- See image details and descriptions

### 🛠️ For Admins
- Upload multiple images at once
- Edit alt text and descriptions
- Organize by categories
- Search and filter images
- Delete unwanted images

## Important Directories

```
backend/
└── uploads/                 ← Images stored here (auto-created)
    ├── images/              ← Full-size images
    └── thumbnails/          ← Optimized thumbnails
```

## File Specifications

| Feature | Value |
|---------|-------|
| Max file size | 10MB |
| Supported formats | JPEG, PNG, WebP, GIF |
| Max images per upload | 10 |
| Categories | General, Projects, Portfolio, Before/After, Team |

## API Endpoints

```
PUBLIC:
GET /api/gallery                          → Get all images

ADMIN ONLY:
POST /api/admin/gallery/upload            → Upload images
GET /api/admin/gallery/:id                → Get image details
PATCH /api/admin/gallery/:id              → Update image metadata
DELETE /api/admin/gallery/:id             → Delete image
```

## Troubleshooting

### Images not showing?
1. ✅ Refresh the page
2. ✅ Check backend is running
3. ✅ Verify images were uploaded successfully
4. ✅ Check browser console for errors

### Upload fails?
- File must be JPEG, PNG, WebP, or GIF
- File must be under 10MB
- Backend must be running
- Check backend console for errors

### Can't access admin?
- Password: `admin123`
- Check localStorage is enabled
- Try clearing cache (Ctrl+Shift+R)

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ImageGallery.jsx         ← User gallery view
│   │   └── ImageGalleryAdmin.jsx    ← Admin upload/manage
│   └── pages/
│       ├── Home.jsx                 ← Includes gallery
│       └── Admin.jsx                ← Includes Gallery tab

backend/
├── database.js                      ← Image database functions
├── index.js                         ← Image API endpoints
└── uploads/                         ← Auto-created on first upload
    ├── images/
    └── thumbnails/
```

## Database Schema

The `gallery_images` table is created automatically with:
- id, filename, original_name, file_path, thumbnail_path
- alt_text, category, description, display_order
- created_at, updated_at

## Security

✅ **What's Protected:**
- Only password-protected admins can upload/delete
- File type validation (images only)
- File size limits (10MB max)
- Unique filenames prevent conflicts
- Secure file storage outside public directory

⚠️ **Production Recommendations:**
- Use JWT tokens instead of password
- Add rate limiting
- Implement virus scanning
- Use CDN for image delivery
- Add watermarks
- Implement audit logging

## Common Tasks

### Upload Images
1. Go to Admin → Gallery tab
2. Click upload area
3. Select images
4. Click Upload

### View Gallery
1. Go to Home page
2. Scroll to Gallery section
3. Click category filters
4. Click image to enlarge

### Edit Image
1. Go to Admin → Gallery tab
2. Scroll to Manage Gallery
3. Click "Edit" on image
4. Update alt text/description
5. Click "Save"

### Delete Image
1. Go to Admin → Gallery tab
2. Scroll to Manage Gallery
3. Click "Delete" on image
4. Confirm deletion

## Next Steps

1. ✅ Upload your first images
2. ✅ Test category filtering
3. ✅ View gallery on Home page
4. ✅ Edit image descriptions
5. ✅ Customize categories (in code)

## Support

- 📖 See [IMAGE_UPLOAD_GUIDE.md](./IMAGE_UPLOAD_GUIDE.md) for full documentation
- 🐛 Check browser console for errors
- 🔧 Verify backend is running
- 📧 Check CORS configuration

---

**Ready to upload?** Go to Admin → Gallery tab and get started! 🚀
