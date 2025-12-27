# Testing & Launch Checklist

## Pre-Launch Testing Checklist

### 1. Frontend Testing

#### UI/UX Functionality
- [ ] Landing page loads without errors
- [ ] Header navigation works (Home, About, Testimonials, Contact)
- [ ] All page transitions work smoothly
- [ ] Forms display correctly on desktop, tablet, and mobile
- [ ] Responsive design works at breakpoints: 320px, 768px, 1024px
- [ ] Images and icons load properly
- [ ] Footer links are functional
- [ ] CTA buttons are clickable and styled correctly

#### Form Testing
- [ ] Consultation form validation works (required fields)
- [ ] Email validation works
- [ ] Form submission displays success message
- [ ] Form data clears after submission
- [ ] Phone field accepts valid phone formats
- [ ] Date picker works and shows proper dates
- [ ] Message textarea accepts long text without issues

#### Page-Specific Testing
- **Home Page:**
  - [ ] Hero section displays correctly
  - [ ] Services section shows all 6 services
  - [ ] Service expand/collapse works
  - [ ] Testimonials carousel/grid displays
  - [ ] Form submits to backend

- **About Page:**
  - [ ] Team member cards display
  - [ ] Stats section shows correct numbers
  - [ ] Mission and values sections render
  - [ ] CTA button links to contact page

- **Testimonials Page:**
  - [ ] Client testimonials display with ratings
  - [ ] Case study cards expand/collapse
  - [ ] Industry recognition badges show
  - [ ] All 6 case studies visible

- **Contact Page:**
  - [ ] Contact form displays all fields
  - [ ] Form validation works
  - [ ] Success message shows after submission
  - [ ] Contact info displays (email, phone, address)
  - [ ] Office hours section visible

#### Accessibility Testing
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Color contrast meets WCAG AA standards
- [ ] Form labels are associated with inputs
- [ ] Images have alt text
- [ ] Focus states are visible
- [ ] Page structure uses semantic HTML (h1, h2, etc.)

#### Browser Compatibility
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] Mobile browsers (Chrome, Safari iOS)

### 2. Backend Testing

#### API Endpoints
- [ ] `GET /` healthcheck returns `{status: 'ok'}`
- [ ] `GET /api/slots` returns array of available slots
- [ ] `POST /api/consultation` accepts form data and returns success
- [ ] `POST /api/contact` accepts contact form and returns success (add endpoint if missing)
- [ ] CORS headers are correctly set
- [ ] Requests without required fields return 400 error
- [ ] Invalid email returns validation error
- [ ] Server handles 1000+ requests without crashing

#### Error Handling
- [ ] Server returns appropriate HTTP status codes
- [ ] Error messages are helpful (not exposing sensitive info)
- [ ] Malformed JSON returns 400
- [ ] Missing required fields return 400
- [ ] Server doesn't crash on invalid input
- [ ] Rate limiting is in place (optional but recommended)

#### Data Validation
- [ ] Email validation works correctly
- [ ] Phone number validation (if required)
- [ ] Message length limits (if any) are enforced
- [ ] Date format is correct
- [ ] Consultation type dropdown matches available options

#### Performance
- [ ] API response time < 200ms
- [ ] No memory leaks (test with concurrent requests)
- [ ] Database queries are optimized (N+1 problems)
- [ ] Response payloads are appropriately sized

### 3. Integration Testing

- [ ] Frontend successfully connects to backend on localhost:4000
- [ ] Form submission sends data to POST endpoint
- [ ] Consultation slots load from API on page load
- [ ] Error handling works when backend is down
- [ ] CORS allows frontend to communicate with backend

### 4. Security Testing

#### Frontend Security
- [ ] No sensitive data (passwords, tokens) stored in localStorage
- [ ] No console errors revealing system info
- [ ] Form inputs are sanitized (no XSS vulnerabilities)
- [ ] Dependencies are up to date (check `npm audit`)

#### Backend Security
- [ ] CORS is properly configured (not allowing all origins in production)
- [ ] Input validation prevents injection attacks
- [ ] Rate limiting prevents abuse
- [ ] No console logs exposing sensitive data
- [ ] Environment variables are used for secrets (not hardcoded)
- [ ] Dependencies are up to date (`npm audit --prefix backend`)

#### Data Privacy
- [ ] Privacy Policy page exists (link in footer)
- [ ] Terms of Service page exists (link in footer)
- [ ] Form submission data is not logged to console
- [ ] No tracking pixels or analytics without consent notice

### 5. Performance Testing

- [ ] Lighthouse score for frontend > 80
  - [ ] Performance > 80
  - [ ] Accessibility > 90
  - [ ] Best Practices > 85
  - [ ] SEO > 90
  
- [ ] Page load time < 3 seconds on 3G connection
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Bundle size is reasonable (< 100KB gzipped for initial load)

### 6. Mobile Testing

- [ ] Touch targets are minimum 44x44 pixels
- [ ] Form fields are easy to tap
- [ ] Scrolling is smooth and responsive
- [ ] Images scale appropriately
- [ ] No horizontal scrolling issues
- [ ] Viewport meta tag is set correctly
- [ ] Mobile menu/navigation works (if applicable)

## Pre-Production Deployment Checklist

### 1. Environment Setup

- [ ] Production `.env` file created with correct values
- [ ] Database connection string points to production database
- [ ] API URLs point to production backend
- [ ] Frontend build optimized for production
- [ ] Secrets are not committed to git
- [ ] `.gitignore` includes `.env` and `node_modules/`

### 2. Backend Configuration

- [ ] Server runs on correct port (configurable via env var)
- [ ] CORS is configured for production domain only
- [ ] Error handling doesn't leak sensitive info
- [ ] Logging is configured (optional: use proper logger like Winston)
- [ ] Database backups are automated
- [ ] SSL/TLS certificates are valid (if deployed to server)

### 3. Frontend Configuration

- [ ] Production build is created successfully
- [ ] Asset files are minified and optimized
- [ ] Environment variables for API endpoints are correct
- [ ] Service Worker is configured (if using PWA features)
- [ ] Manifest.json is set up
- [ ] Favicon is present

### 4. Documentation

- [ ] README.md is complete with setup, run, and deployment instructions
- [ ] API documentation is created (endpoints, request/response examples)
- [ ] Deployment steps are documented
- [ ] Emergency procedures are documented
- [ ] Team knows how to handle errors and issues

### 5. Monitoring & Logging

- [ ] Error tracking is set up (e.g., Sentry, LogRocket)
- [ ] Application logging is configured
- [ ] Server health checks are in place
- [ ] Uptime monitoring is configured
- [ ] Alert system is set up for critical errors

### 6. DNS & Domain

- [ ] Domain is registered and active
- [ ] DNS records point to production server
- [ ] SSL certificate is installed
- [ ] HTTPS redirects HTTP traffic

## Post-Launch Monitoring

### Week 1
- [ ] Monitor error logs daily
- [ ] Check API response times
- [ ] Verify form submissions are being received
- [ ] Monitor server resources (CPU, memory, disk)
- [ ] Check user feedback and support tickets

### Ongoing
- [ ] Weekly security patches
- [ ] Monthly performance review
- [ ] Quarterly dependency updates
- [ ] Bi-annual security audits
- [ ] Regular database backups and recovery tests

## Deployment Platforms (Optional)

### Recommended Options

**Frontend Deployment:**
- Vercel (free tier available)
- Netlify (free tier available)
- GitHub Pages (free, static only)
- AWS Amplify (free tier available)

**Backend Deployment:**
- Heroku (paid, but easy to start)
- AWS EC2 (pay-as-you-go)
- DigitalOcean (affordable, $4-6/month)
- Railway.app (free tier available)
- Render (free tier available)

## Test Cases Examples

### Consultation Form - Happy Path
```
1. User navigates to Home page
2. User fills in consultation form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "+1 (555) 123-4567"
   - Type: "Structural Design"
   - Date: 2025-01-15
   - Message: "Need help with my building design"
3. User clicks "Submit"
4. Success message appears
5. Form is cleared
6. Backend receives POST request with correct data
```

### Contact Form Validation
```
1. User navigates to Contact page
2. User tries to submit empty form
3. Browser shows validation errors for required fields
4. User fills in Name, Email, Subject only
5. User tries to submit (missing Message)
6. Browser shows validation error
7. User fills in all fields
8. Form submits successfully
9. Success message displays
```

### Navigation Flow
```
1. User starts on Home page
2. User clicks "About" in header
3. About page loads
4. User clicks "Testimonials" in header
5. Testimonials page loads
6. User clicks "Contact" in footer
7. Contact page loads
8. User clicks logo to return home
9. Home page loads
```

## Sign-Off

- [ ] QA Lead: _____________________ Date: _______
- [ ] Product Manager: _____________________ Date: _______
- [ ] Tech Lead: _____________________ Date: _______
- [ ] Client Approval: _____________________ Date: _______

