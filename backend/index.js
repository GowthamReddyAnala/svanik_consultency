import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { saveconsultation, saveContactMessage, getAllconsultations, getAllContactMessages, updateconsultationStatus, updateContactMessageStatus, saveImage, getAllImages, getImageById, updateImage, deleteImage, getImageByFilename } from './database.js'
import { sendconsultationConfirmation, sendconsultationToAdmin, sendContactConfirmation, sendContactToAdmin } from './emailService.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads')
const imagesDir = path.join(uploadsDir, 'images')
const thumbnailsDir = path.join(uploadsDir, 'thumbnails')

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed (JPEG, PNG, WebP, GIF)'))
    }
  }
})

const app = express()
// Configure CORS to allow frontend host (set FRONTEND_URL in Render env)
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5174', // Allow Vite default alt port
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
]
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.options('*', cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded images as static files
app.use('/api/uploads', express.static(uploadsDir))

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.json({status: 'ok', message: 'Backend is running'})
})

// Get available consultation slots
app.get('/api/slots', (req, res) => {
  const now = Date.now()
  const slots = [
    { id: 1, time: new Date(now + 86400000).toISOString(), label: 'Tomorrow 10:00 AM' },
    { id: 2, time: new Date(now + 86400000 + 3600000).toISOString(), label: 'Tomorrow 11:00 AM' },
    { id: 3, time: new Date(now + 86400000 + 7200000).toISOString(), label: 'Tomorrow 12:00 PM' },
    { id: 4, time: new Date(now + 2*86400000).toISOString(), label: 'Day after tomorrow 09:00 AM' },
    { id: 5, time: new Date(now + 2*86400000 + 3600000).toISOString(), label: 'Day after tomorrow 10:00 AM' },
    { id: 6, time: new Date(now + 3*86400000).toISOString(), label: '3 days from now 02:00 PM' }
  ]
  res.json(slots)
})

// Receive consultation form submission
app.post('/api/consultation', async (req, res) => {
  try {
    const {name, email, phone, type, message, date} = req.body

    // Validate required fields
    if (!name || !email || !type || !date) {
      return res.status(400).json({error: 'Missing required fields: name, email, type, date'})
    }

    // Save to database
    const consultation = await saveconsultation({name, email, phone, type, message, date})

    // Send confirmation email to user
    await sendconsultationConfirmation(consultation)

    // Send notification to admin
    await sendconsultationToAdmin(consultation)

    res.status(201).json({
      success: true,
      message: 'Consultation request received. We will contact you within 24 hours.',
      id: consultation.id
    })
  } catch (error) {
    console.error('Error saving consultation:', error)
    res.status(500).json({error: 'Failed to save consultation request'})
  }
})

// Receive contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const {name, email, phone, subject, message} = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({error: 'Missing required fields: name, email, subject, message'})
    }

    // Save to database
    const contact = await saveContactMessage({name, email, phone, subject, message})

    // Send confirmation email to user
    await sendContactConfirmation(contact)

    // Send notification to admin
    await sendContactToAdmin(contact)

    res.status(201).json({
      success: true,
      message: 'Message received. We will get back to you within 24 hours.',
      id: contact.id
    })
  } catch (error) {
    console.error('Error saving contact message:', error)
    res.status(500).json({error: 'Failed to save contact message'})
  }
})

// Get all consultations (admin endpoint)
app.get('/api/admin/consultations', async (req, res) => {
  try {
    const consultations = await getAllconsultations()
    res.json(consultations)
  } catch (error) {
    console.error('Error fetching consultations:', error)
    res.status(500).json({error: 'Failed to fetch consultations'})
  }
})

// Get all contact messages (admin endpoint)
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const contacts = await getAllContactMessages()
    res.json(contacts)
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    res.status(500).json({error: 'Failed to fetch contact messages'})
  }
})

// Update consultation status (admin endpoint)
app.patch('/api/admin/consultations/:id', async (req, res) => {
  try {
    const {id} = req.params
    const {status} = req.body

    const updated = await updateconsultationStatus(id, status)
    res.json({success: true, ...updated})
  } catch (error) {
    console.error('Error updating consultation:', error)
    res.status(500).json({error: 'Failed to update consultation'})
  }
})

// Update contact message status (admin endpoint)
app.patch('/api/admin/contacts/:id', async (req, res) => {
  try {
    const {id} = req.params
    const {status} = req.body

    const updated = await updateContactMessageStatus(id, status)
    res.json({success: true, ...updated})
  } catch (error) {
    console.error('Error updating contact message:', error)
    res.status(500).json({error: 'Failed to update contact message'})
  }
})

// ==================== IMAGE GALLERY ENDPOINTS ====================

// Get all images (public endpoint)
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await getAllImages()
    res.json(images)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    res.status(500).json({error: 'Failed to fetch gallery images'})
  }
})

// Upload images (admin endpoint)
app.post('/api/admin/gallery/upload', (req, res, next) => {
  // Use multer with error handling
  upload.array('images', 10)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'FILE_TOO_LARGE') {
        return res.status(400).json({error: 'File too large. Maximum size is 10MB'})
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({error: 'Too many files. Maximum 10 files allowed'})
      }
      return res.status(400).json({error: `Upload error: ${err.message}`})
    } else if (err) {
      return res.status(400).json({error: err.message || 'Upload failed'})
    }
    
    // If no error, proceed with processing
    processUpload(req, res)
  })
})

// Separate function to handle the upload processing
async function processUpload(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({error: 'No files provided'})
    }

    const {category = 'General', altText = '', description = ''} = req.body
    const uploadedImages = []
    const errors = []

    for (const file of req.files) {
      try {
        // Generate unique filename
        const timestamp = Date.now()
        const randomStr = Math.random().toString(36).substring(2, 8)
        const ext = path.extname(file.originalname)
        const filename = `img_${timestamp}_${randomStr}${ext}`

        const filepath = path.join(imagesDir, filename)
        const thumbnailPath = path.join(thumbnailsDir, `thumb_${filename}`)

        console.log(`Processing file: ${file.originalname}`)
        console.log(`Saving to: ${filepath}`)

        // Process and save original image
        await sharp(file.buffer)
          .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
          .toFile(filepath)

        // Create thumbnail
        await sharp(file.buffer)
          .resize(300, 300, { fit: 'cover' })
          .toFile(thumbnailPath)

        console.log(`Successfully processed: ${filename}`)

        // Save to database
        const imageData = {
          filename: filename,
          original_name: file.originalname,
          file_path: `/api/uploads/images/${filename}`,
          thumbnail_path: `/api/uploads/thumbnails/thumb_${filename}`,
          alt_text: altText || file.originalname,
          category: category,
          description: description,
          display_order: 0
        }

        const savedImage = await saveImage(imageData)
        uploadedImages.push(savedImage)
      } catch (error) {
        console.error(`Error processing file ${file.originalname}:`, error)
        errors.push({file: file.originalname, error: error.message})
      }
    }

    if (uploadedImages.length === 0) {
      console.error('No images uploaded:', errors)
      return res.status(400).json({error: 'Failed to upload any images', details: errors})
    }

    res.status(201).json({
      success: true,
      message: `${uploadedImages.length} image(s) uploaded successfully`,
      images: uploadedImages,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error) {
    console.error('Error in upload processing:', error)
    res.status(500).json({error: 'Failed to upload images', details: error.message})
  }
}

// Get single image details (admin endpoint)
app.get('/api/admin/gallery/:id', async (req, res) => {
  try {
    const {id} = req.params
    const image = await getImageById(id)
    
    if (!image) {
      return res.status(404).json({error: 'Image not found'})
    }
    
    res.json(image)
  } catch (error) {
    console.error('Error fetching image:', error)
    res.status(500).json({error: 'Failed to fetch image'})
  }
})

// Update image details (admin endpoint)
app.patch('/api/admin/gallery/:id', async (req, res) => {
  try {
    const {id} = req.params
    const {alt_text, description, category, display_order} = req.body

    const updated = await updateImage(id, {
      alt_text,
      description,
      category,
      display_order
    })
    
    res.json({success: true, ...updated})
  } catch (error) {
    console.error('Error updating image:', error)
    res.status(500).json({error: 'Failed to update image'})
  }
})

// Delete image (admin endpoint)
app.delete('/api/admin/gallery/:id', async (req, res) => {
  try {
    const {id} = req.params
    const image = await getImageById(id)
    
    if (!image) {
      return res.status(404).json({error: 'Image not found'})
    }

    // Delete files from disk
    const filepath = path.join(__dirname, 'uploads', image.file_path.replace('/api/uploads/', ''))
    const thumbnailPath = path.join(__dirname, 'uploads', image.thumbnail_path.replace('/api/uploads/', ''))

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }
    if (fs.existsSync(thumbnailPath)) {
      fs.unlinkSync(thumbnailPath)
    }

    // Delete from database
    await deleteImage(id)

    res.json({success: true, message: 'Image deleted successfully'})
  } catch (error) {
    console.error('Error deleting image:', error)
    res.status(500).json({error: 'Failed to delete image'})
  }
})

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error('Error:', err)
  
  // Don't send 500 for client errors that were already handled
  if (res.headersSent) {
    return next(err)
  }
  
  res.status(500).json({error: 'Internal server error', message: process.env.NODE_ENV === 'development' ? err.message : ''})
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`🚀 Backend server listening on http://localhost:${port}`)
  console.log(`📧 Email: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`)
  console.log(`💾 Database: SQLite (data.db)`)
  console.log(`Frontend will be running on http://localhost:5173`)
})
