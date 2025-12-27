# Admin Panel Data Not Showing - Troubleshooting

## Quick Checklist

### 1. ✅ Backend Server Running?
```bash
# Make sure backend is running
npm run dev
# Look for: "🚀 Backend server listening on http://localhost:4000"
```

### 2. ✅ Database File Exists?
```
Check if file exists: backend/data.db
If NOT, it will be created automatically on first form submission
```

### 3. ✅ Form Submission Successful?
- Submit a **test consultation form** or **contact form** from the frontend
- Check browser console (F12) for any errors
- Look for success message: "Your request has been received"

### 4. ✅ Admin API Endpoints Working?
Test in browser or with curl:

```bash
# Test consultation endpoint
curl http://localhost:4000/api/admin/consultations

# Test contact endpoint
curl http://localhost:4000/api/admin/contacts

# Should return JSON array (empty [] if no data yet)
```

### 5. ✅ Admin Panel Refresh
- Login to admin panel (press 'a' twice, password: `admin123`)
- Click **"Refresh Data"** button
- Check browser console (F12) for errors

## Common Issues & Solutions

### Issue: Empty Array `[]` Returned
**Cause:** No forms have been submitted yet
**Solution:** Submit a test consultation or contact form first

### Issue: CORS Error in Console
**Cause:** Frontend can't connect to backend
**Solution:** 
- Verify backend running on localhost:4000
- Check CORS middleware in backend/index.js (it's there ✅)

### Issue: 404 Error
**Cause:** API endpoint not found
**Solution:** Verify backend/index.js has these routes:
- `GET /api/admin/consultations` ✅
- `GET /api/admin/contacts` ✅

### Issue: Database Query Error
**Cause:** SQLite database corrupted or locked
**Solution:**
```bash
# Delete the old database and let it regenerate
cd backend
rm data.db  # Windows: del data.db
# Run backend again - new database will be created
```

## Step-by-Step Fix

1. **Open two terminals:**
   ```
   Terminal 1: npm run dev  (runs both frontend + backend)
   Terminal 2: Ready for testing commands
   ```

2. **Check backend is running:**
   ```bash
   curl http://localhost:4000/
   # Should return: {"status":"ok","message":"Backend is running"}
   ```

3. **Submit a test form:**
   - Go to http://localhost:5173
   - Fill out consultation form with test data
   - Submit and verify "success" message

4. **Test API directly:**
   ```bash
   curl http://localhost:4000/api/admin/consultations
   # Should now return your test entry
   ```

5. **Login to admin:**
   - Press 'a' twice
   - Password: `admin123`
   - Should see your test entry in Consultations tab

## Check Browser Console

Press **F12** and go to **Console** tab to see any errors:

```javascript
// Common errors to watch for:
GET http://localhost:4000/api/admin/consultations 404
// ^ Backend not running or wrong port

Access to XMLHttpRequest blocked by CORS
// ^ Should not happen, CORS is enabled in backend

Expected response body to be JSON
// ^ Backend returned HTML error page instead of JSON
```

## Check Network Tab

Press **F12** → **Network** tab:
1. Login to admin
2. Look for requests to:
   - `http://localhost:4000/api/admin/consultations` (should be 200)
   - `http://localhost:4000/api/admin/contacts` (should be 200)
3. Click each request and check **Response** tab for JSON data

## Database File Location

If you need to manually inspect the database:
```
d:\Gowtham\Learning\backend\data.db
```

You can use SQLite viewer to inspect tables:
- Windows: DB Browser for SQLite (free download)
- Or use VS Code extension: "SQLite" by alexcvzz

## Reset Admin Panel Cache

If stuck on login screen:
```javascript
// Open browser console (F12) and paste:
localStorage.removeItem('adminAuth')
localStorage.removeItem('adminPassword')
location.reload()
```

## Still Not Working?

Check backend logs for these patterns:
- `Error saving consultation:`
- `Error fetching consultations:`
- `Error updating consultation:`

If you see database errors, try deleting and recreating:
```bash
cd backend
del data.db
# Restart backend with: npm run dev
```
