# Admin Panel Setup & Usage

## Accessing the Admin Panel

### Method 1: Keyboard Shortcut (Recommended)
1. Press the letter **'a'** twice quickly from any page
2. You'll be prompted for an admin password
3. **Default password:** `admin123`

### Method 2: Direct URL
If keyboard shortcut doesn't work, you can navigate programmatically by calling:
```javascript
window.navigateTo('admin')
```

## Features

### Dashboard Overview
- **Stats Cards** showing:
  - Total consultations and new count
  - Total contact messages and new count

### Consultations Tab
- View all consultation requests
- Filter by:
  - Search (name/email)
  - Type (Project Planning, Cost Estimation, etc.)
  - Status (New, Viewed, Contacted)
- **Actions:**
  - Mark as Viewed
  - Mark as Contacted
  - Send Email (opens email client)
- **Export:** Download all consultations as CSV

### Contacts Tab
- View all contact form submissions
- Filter by:
  - Search (name/email/subject)
  - Status (New, Viewed, Contacted)
- **Actions:**
  - Mark as Viewed
  - Mark as Contacted
  - Send Email
- **Export:** Download all contacts as CSV

## Data Management

### Status Tracking
- **New:** Recently submitted, not yet reviewed
- **Viewed:** Admin has reviewed the request
- **Contacted:** Admin has replied to the client

### CSV Export
- Click **"Export CSV"** to download filtered data
- Filename includes export date: `consultations_2025-12-27.csv`
- Use in Excel, Google Sheets, or data analysis tools

### Auto-Refresh
- Dashboard refreshes every 30 seconds automatically
- Click **"Refresh Data"** button for immediate refresh

## Data Storage

All data is stored in SQLite database:
```
backend/data.db
```

Tables:
- `consultations` — Consultation requests
- `contact_messages` — Contact form submissions
- `email_logs` — Email send history

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

The current setup uses a simple password (`admin123`). Before deploying to production:

1. **Change the password** in `Frontend/src/pages/Admin.jsx`:
   ```javascript
   if (password === 'YOUR_SECURE_PASSWORD') {
   ```

2. **Implement proper authentication:**
   - Use JWT tokens
   - Add backend authentication middleware
   - Remove password from localStorage
   - Use HTTPS only
   - Implement rate limiting on admin endpoints

3. **Protect admin endpoints:**
   ```javascript
   // Add authentication middleware to backend
   app.patch('/api/admin/:route', authenticateAdmin, (req, res) => { ... })
   ```

## Email Integration

When email is configured (set `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`):
- Clicking "Send Email" opens your default email client
- Customize email templates in `backend/emailService.js`
- Email logs are tracked in database

## Troubleshooting

### Can't access admin panel
- Make sure backend server is running on `http://localhost:4000`
- Check browser console for errors (F12)
- Try refreshing the page

### Can't see consultations/contacts
- Ensure backend API is responding:
  ```bash
  curl http://localhost:4000/api/admin/consultations
  ```
- Check if any form submissions were made
- Verify database file exists: `backend/data.db`

### Export CSV is empty
- Check if there are any filtered results
- Try removing all filters
- Click "Refresh Data" first

## Future Enhancements

Suggested improvements:
- Add proper user authentication (JWT)
- Add pagination for large data sets
- Add advanced filtering/sorting
- Add data analytics dashboard
- Add automated follow-up reminders
- Add bulk email sending
- Add calendar integration for scheduling follow-ups
