import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'data.db')
const db = new sqlite3.Database(dbPath)

// Initialize database tables
db.serialize(() => {
  // Consultations table
  db.run(`
    CREATE TABLE IF NOT EXISTS consultations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      type TEXT NOT NULL,
      message TEXT,
      preferred_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'new'
    )
  `)

  // Contact messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'new'
    )
  `)

  // Email logs table (for debugging/auditing)
  db.run(`
    CREATE TABLE IF NOT EXISTS email_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipient TEXT NOT NULL,
      subject TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      error_message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
})

// Helper functions
const saveconsultation = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO consultations (name, email, phone, type, message, preferred_date) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.name, data.email, data.phone || null, data.type, data.message || null, data.date],
      function(err) {
        if (err) reject(err)
        else resolve({id: this.lastID, ...data})
      }
    )
  })
}

const saveContactMessage = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO contact_messages (name, email, phone, subject, message) 
       VALUES (?, ?, ?, ?, ?)`,
      [data.name, data.email, data.phone || null, data.subject, data.message],
      function(err) {
        if (err) reject(err)
        else resolve({id: this.lastID, ...data})
      }
    )
  })
}

const logEmail = (recipient, subject, type, status, errorMessage = null) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO email_logs (recipient, subject, type, status, error_message) 
       VALUES (?, ?, ?, ?, ?)`,
      [recipient, subject, type, status, errorMessage],
      function(err) {
        if (err) reject(err)
        else resolve({id: this.lastID})
      }
    )
  })
}

const getAllconsultations = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM consultations ORDER BY created_at DESC`,
      (err, rows) => {
        if (err) reject(err)
        else resolve(rows || [])
      }
    )
  })
}

const getAllContactMessages = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM contact_messages ORDER BY created_at DESC`,
      (err, rows) => {
        if (err) reject(err)
        else resolve(rows || [])
      }
    )
  })
}

const getconsultationById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM consultations WHERE id = ?`,
      [id],
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      }
    )
  })
}

const updateconsultationStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE consultations SET status = ? WHERE id = ?`,
      [status, id],
      function(err) {
        if (err) reject(err)
        else resolve({id, status})
      }
    )
  })
}

const updateContactMessageStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE contact_messages SET status = ? WHERE id = ?`,
      [status, id],
      function(err) {
        if (err) reject(err)
        else resolve({id, status})
      }
    )
  })
}

export {
  db,
  saveconsultation,
  saveContactMessage,
  logEmail,
  getAllconsultations,
  getAllContactMessages,
  getconsultationById,
  updateconsultationStatus,
  updateContactMessageStatus
}
