import nodemailer from 'nodemailer'
import { logEmail } from './database.js'

// Create email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

// Verify transporter connection
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter.verify((error, success) => {
    if (error) {
      console.warn('⚠️ Email service not available:', error.message)
    } else {
      console.log('✓ Email service ready')
    }
  })
}

// Send consultation confirmation to user
const sendconsultationConfirmation = async (consultation) => {
  if (!process.env.EMAIL_USER) {
    console.log('⚠️ Email not configured. Skipping email send.')
    return false
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: consultation.email,
      subject: 'Consultation Request Received',
      html: `
        <h2>Thank You for Your Consultation Request</h2>
        <p>Dear ${consultation.name},</p>
        <p>We have received your consultation request and will contact you shortly.</p>
        <h3>Your Request Details:</h3>
        <ul>
          <li><strong>Type:</strong> ${consultation.type}</li>
          <li><strong>Preferred Date:</strong> ${consultation.date}</li>
          <li><strong>Contact:</strong> ${consultation.email}</li>
          ${consultation.phone ? `<li><strong>Phone:</strong> ${consultation.phone}</li>` : ''}
        </ul>
        <p>We typically respond within 24 hours during business hours.</p>
        <p>Best regards,<br/>Civil Consulting Team</p>
      `
    }

    await transporter.sendMail(mailOptions)
    await logEmail(consultation.email, 'Consultation Confirmation', 'consultation', 'sent')
    console.log(`✓ Consultation confirmation sent to ${consultation.email}`)
    return true
  } catch (error) {
    console.error('✗ Error sending consultation email:', error.message)
    await logEmail(consultation.email, 'Consultation Confirmation', 'consultation', 'failed', error.message)
    return false
  }
}

// Send consultation notification to admin
const sendconsultationToAdmin = async (consultation) => {
  if (!process.env.EMAIL_USER || !process.env.ADMIN_EMAIL) {
    console.log('⚠️ Admin email not configured. Skipping notification.')
    return false
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Consultation Request: ${consultation.type}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Client:</strong> ${consultation.name}</p>
        <p><strong>Email:</strong> ${consultation.email}</p>
        ${consultation.phone ? `<p><strong>Phone:</strong> ${consultation.phone}</p>` : ''}
        <p><strong>Type:</strong> ${consultation.type}</p>
        <p><strong>Preferred Date:</strong> ${consultation.date}</p>
        <p><strong>Message:</strong></p>
        <p>${consultation.message || 'No message provided'}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      `
    }

    await transporter.sendMail(mailOptions)
    console.log(`✓ Admin notification sent`)
    return true
  } catch (error) {
    console.error('✗ Error sending admin notification:', error.message)
    return false
  }
}

// Send contact form confirmation to user
const sendContactConfirmation = async (contact) => {
  if (!process.env.EMAIL_USER) {
    console.log('⚠️ Email not configured. Skipping email send.')
    return false
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contact.email,
      subject: 'We Received Your Message',
      html: `
        <h2>Message Received</h2>
        <p>Dear ${contact.name},</p>
        <p>Thank you for contacting Civil Consulting. We have received your message and will get back to you within 24 hours.</p>
        <h3>Your Message:</h3>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p>${contact.message}</p>
        <p>Best regards,<br/>Civil Consulting Team</p>
      `
    }

    await transporter.sendMail(mailOptions)
    await logEmail(contact.email, 'Contact Confirmation', 'contact', 'sent')
    console.log(`✓ Contact confirmation sent to ${contact.email}`)
    return true
  } catch (error) {
    console.error('✗ Error sending contact email:', error.message)
    await logEmail(contact.email, 'Contact Confirmation', 'contact', 'failed', error.message)
    return false
  }
}

// Send contact form to admin
const sendContactToAdmin = async (contact) => {
  if (!process.env.EMAIL_USER || !process.env.ADMIN_EMAIL) {
    console.log('⚠️ Admin email not configured. Skipping notification.')
    return false
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message: ${contact.subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <h3>Message:</h3>
        <p>${contact.message}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      `
    }

    await transporter.sendMail(mailOptions)
    console.log(`✓ Admin contact notification sent`)
    return true
  } catch (error) {
    console.error('✗ Error sending admin contact notification:', error.message)
    return false
  }
}

export {
  sendconsultationConfirmation,
  sendconsultationToAdmin,
  sendContactConfirmation,
  sendContactToAdmin
}
