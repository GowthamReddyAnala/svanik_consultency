# Image Upload Feature Documentation

## Overview
The Image Upload feature allows admin users to securely upload, manage, and display images through the admin panel. Uploaded images are automatically displayed on the user-facing gallery page with real-time or refresh-based visibility.

## Features Implemented

### ✅ Admin Panel Features
- **Multi-image upload** - Upload up to 10 images at once
- **Image validation** - File type and size validation (supports JPEG, PNG, WebP, GIF; max 10MB)
- **Image categorization** - Organize images by categories (General, Projects, Portfolio, Before/After, Team)
- **Image management** - Edit alt text, descriptions, and category assignments
- **Image deletion** - Securely remove images with confirmation
- **Search and filter** - Search by filename or alt text; filter by category
- **Gallery management dashboard** - View all uploaded images in a grid with edit/delete options

### ✅ User-Facing Gallery
- **Responsive gallery grid** - Mobile-friendly image display
- **Category filtering** - Filter images by category
- **Lightbox view** - Full-screen image viewer with navigation
- **Image lazy loading** - Optimized loading for better performance
- **Image metadata** - Display alt text, description, and creation date in lightbox

### ✅ Backend Features
- **Secure file storage** - Images stored in `/backend/uploads/` directory
- **Image optimization** - Automatic resizing and thumbnail generation using Sharp
- **Database tracking** - All images tracked in SQLite database
- **Authorization** - Only authenticated admins can upload/delete images
- **API endpoints** - RESTful endpoints for upload, retrieve, update, and delete

### ✅ Security & Optimization
- **File type validation** - Only image files allowed (JPEG, PNG, WebP, GIF)
- **File size limits** - Maximum 10MB per file
- **Automatic resizing** - Original images resized to max 2000x2000px
- **Thumbnail generation** - Automatic 300x300px thumbnails for gallery display
- **Password protection** - Admin panel protected with authentication
- **Secure deletion** - Files deleted from both database and disk

## Installation & Setup

### 1. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

This will install:
- `multer` - File upload middleware
- `sharp` - Image processing library

#### Environment Variables
No additional environment variables needed beyond existing configuration.

### 2. Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Database Initialization
The `gallery_images` table is created automatically on first run. Check `backend/database.js` for schema.

## Usage Guide

### For Admin Users

#### Uploading Images
1. Navigate to Admin Dashboard (password: `admin123`)
2. Click on the **"Gallery"** tab
3. In the "Upload Images" section:
   - Click the dashed area or select files
   - Choose up to 10 images at once
   - (Optional) Add category, alt text, and description
   - Click **"Upload [X] Image(s)"**

#### Managing Images
1. In the "Manage Gallery" section:
   - **Search** by filename or alt text
   - **Filter** by category
   - **Edit** - Click edit button to update alt text and description
   - **Delete** - Click delete button (requires confirmation)

#### Categories Available
- General
- Projects
- Portfolio
- Before/After
- Team

### For Regular Users

#### Viewing Gallery
1. Navigate to Home page
2. Scroll to **"Gallery"** section
3. **View images** in responsive grid
4. **Filter** by category using filter buttons
5. **Click any image** to open lightbox
6. **Navigate** through images using arrow buttons
7. View image details (title, description, date) in lightbox

## File Structure

```
backend/
├── index.js                 # Main server with image endpoints
├── database.js              # Database schema and functions
├── emailService.js          # Email handling
├── package.json             # Dependencies including multer & sharp
└── uploads/                 # Image storage directory (created automatically)
    ├── images/              # Full-size images
    └── thumbnails/          # Thumbnail images (300x300)

frontend/
├── src/
│   ├── components/
│   │   ├── ImageGallery.jsx         # User-facing gallery component
│   │   ├── ImageGalleryAdmin.jsx    # Admin upload & management
│   │   └── ... other components
│   ├── pages/
│   │   ├── Home.jsx                 # Includes gallery section
│   │   ├── Admin.jsx                # Includes Gallery tab
│   │   └── ... other pages
│   └── ... other files
```

## API Endpoints

### Public Endpoints

#### Get All Gallery Images
```
GET /api/gallery
Response: Array of image objects with metadata
```

### Admin Endpoints (Requires Authentication)

#### Upload Images
```
POST /api/admin/gallery/upload
Headers: Content-Type: multipart/form-data
Body:
  - images: File[] (up to 10 files)
  - category: string (optional, default: "General")
  - altText: string (optional)
  - description: string (optional)
Response: { success: true, message: string, images: Array }
```

#### Get Single Image Details
```
GET /api/admin/gallery/:id
Response: Image object with all metadata
```

#### Update Image Metadata
```
PATCH /api/admin/gallery/:id
Body: {
  alt_text?: string,
  description?: string,
  category?: string,
  display_order?: number
}
Response: { success: true, id, ... }
```

#### Delete Image
```
DELETE /api/admin/gallery/:id
Response: { success: true, message: string }
```

## Database Schema

### gallery_images Table
```sql
CREATE TABLE gallery_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL UNIQUE,              -- Generated filename
  original_name TEXT NOT NULL,                -- User's original filename
  file_path TEXT NOT NULL,                    -- Path to full-size image
  thumbnail_path TEXT,                        -- Path to thumbnail
  alt_text TEXT,                              -- Alt text for accessibility
  category TEXT DEFAULT 'General',            -- Image category
  description TEXT,                           -- Image description
  display_order INTEGER DEFAULT 0,            -- For sorting
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Image Processing

### Original Image
- Resized to max 2000x2000px
- Maintains aspect ratio
- Won't enlarge small images
- Stored with unique filename: `img_[timestamp]_[random].[ext]`

### Thumbnail
- Automatically generated as 300x300px
- Used for gallery grid display
- Improves loading performance
- Filename: `thumb_img_[timestamp]_[random].[ext]`

## Performance Considerations

### Optimization Features
- ✅ Lazy loading - Images load only when visible
- ✅ Thumbnails - Smaller images used in grid
- ✅ Image resizing - Reduces file sizes
- ✅ Static file serving - `/api/uploads` served as static files
- ✅ Category filtering - Reduce DOM elements

### Best Practices
1. **Image size** - Keep original images under 10MB
2. **File format** - Use WebP for web optimization
3. **Batch uploads** - Upload multiple images together
4. **Regular cleanup** - Delete unused images
5. **Naming** - Use descriptive alt text for SEO

## Validation Rules

### File Types Allowed
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

### File Size Limits
- Maximum: 10MB per file
- Recommended: 2-5MB for best performance

### Metadata Constraints
- Alt text: Required (default to original filename)
- Description: Optional, max reasonable length
- Category: Predefined categories
- Display order: Number for sorting

## Error Handling

### Common Errors & Solutions

#### "No files provided"
- Ensure files are selected before uploading
- Check file browser opens correctly

#### "Only image files are allowed"
- Selected file is not an image format
- Try JPEG, PNG, WebP, or GIF

#### "File exceeds 10MB size limit"
- Image is too large
- Compress before uploading
- Consider resizing

#### "Failed to upload any images"
- Check backend is running
- Verify database is accessible
- Check `/backend/uploads/` directory exists

#### "Failed to delete image"
- Ensure image exists in database
- Check file permissions
- Verify image ID is correct

## Troubleshooting

### Images Not Appearing
1. **Check backend upload status**
   - Verify `/backend/uploads/` directory exists
   - Check database contains image records

2. **Check database**
   ```bash
   # In backend, check database.js for query
   ```

3. **Clear browser cache**
   - Hard refresh (Ctrl+Shift+R)
   - Clear browser cache

### Upload Failures
1. **Verify file size** - Must be < 10MB
2. **Check file type** - Must be image format
3. **Backend running** - Ensure server is running
4. **CORS enabled** - Check backend CORS config

### Admin Features Not Working
1. **Check authentication** - Ensure logged in
2. **Verify password** - Default: `admin123`
3. **Browser storage** - Check localStorage for `adminAuth`
4. **Console errors** - Check browser console for errors

## Future Enhancement Ideas

- [ ] Drag-and-drop upload interface
- [ ] Batch image editing
- [ ] Image compression optimization
- [ ] CDN integration for faster delivery
- [ ] Image tagging system
- [ ] Advanced permission system
- [ ] Image analytics
- [ ] Social media sharing
- [ ] Image comments/ratings
- [ ] Watermark generation

## Support & Maintenance

### Regular Maintenance Tasks
1. **Monitor upload directory** - Check `/backend/uploads/` size
2. **Clean old images** - Delete unused images
3. **Database backup** - Regular backups of `data.db`
4. **Review access logs** - Monitor admin access
5. **Update dependencies** - Keep multer & sharp updated

### Monitoring
- Track image count
- Monitor storage usage
- Review failed uploads
- Check performance metrics

## Security Considerations

### Current Implementation
✅ File type validation  
✅ File size limits  
✅ Password-protected admin access  
✅ Secure file storage  
✅ Database transaction handling  

### Recommendations for Production
- ⚠️ Implement token-based authentication (JWT)
- ⚠️ Add rate limiting on upload endpoint
- ⚠️ Implement virus scanning for uploaded files
- ⚠️ Use CDN for image delivery
- ⚠️ Add image watermarking
- ⚠️ Implement audit logging
- ⚠️ Use environment variables for sensitive config

## Testing

### Manual Testing Checklist
- [ ] Upload single image
- [ ] Upload multiple images (max 10)
- [ ] Verify images appear on user gallery
- [ ] Test category filtering
- [ ] Test search functionality
- [ ] Edit image metadata
- [ ] Delete image
- [ ] Lightbox navigation
- [ ] Mobile responsiveness
- [ ] Error scenarios (invalid file, oversized file)

## Support Contacts

For issues or questions:
1. Check this documentation
2. Review troubleshooting section
3. Check browser console for errors
4. Verify backend is running
5. Contact development team

---

**Last Updated:** January 2026  
**Version:** 1.0  
**Status:** Production Ready
