import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { saveconsultation, saveContactMessage, getAllconsultations, getAllContactMessages, updateconsultationStatus, updateContactMessageStatus } from './database.js'
import { sendconsultationConfirmation, sendconsultationToAdmin, sendContactConfirmation, sendContactToAdmin } from './emailService.js'

dotenv.config()

const app = express()
// Configure CORS to allow frontend host (set FRONTEND_URL in Render env)
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173']
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.options('*', cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({error: 'Internal server error'})
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`🚀 Backend server listening on http://localhost:${port}`)
  console.log(`📧 Email: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`)
  console.log(`💾 Database: SQLite (data.db)`)
  console.log(`Frontend will be running on http://localhost:5173`)
})
