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

  // Gallery images table
  db.run(`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL UNIQUE,
      original_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      thumbnail_path TEXT,
      alt_text TEXT,
      category TEXT DEFAULT 'General',
      description TEXT,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

// Image gallery functions
const saveImage = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO gallery_images (filename, original_name, file_path, thumbnail_path, alt_text, category, description, display_order) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.filename, data.original_name, data.file_path, data.thumbnail_path || null, data.alt_text || '', data.category || 'General', data.description || '', data.display_order || 0],
      function(err) {
        if (err) reject(err)
        else resolve({id: this.lastID, ...data})
      }
    )
  })
}

const getAllImages = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM gallery_images ORDER BY display_order ASC, created_at DESC`,
      (err, rows) => {
        if (err) reject(err)
        else resolve(rows || [])
      }
    )
  })
}

const getImageById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM gallery_images WHERE id = ?`,
      [id],
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      }
    )
  })
}

const updateImage = (id, data) => {
  return new Promise((resolve, reject) => {
    const updates = []
    const values = []
    
    if (data.alt_text !== undefined) {
      updates.push('alt_text = ?')
      values.push(data.alt_text)
    }
    if (data.description !== undefined) {
      updates.push('description = ?')
      values.push(data.description)
    }
    if (data.category !== undefined) {
      updates.push('category = ?')
      values.push(data.category)
    }
    if (data.display_order !== undefined) {
      updates.push('display_order = ?')
      values.push(data.display_order)
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP')
    values.push(id)
    
    const query = `UPDATE gallery_images SET ${updates.join(', ')} WHERE id = ?`
    
    db.run(query, values, function(err) {
      if (err) reject(err)
      else resolve({id, ...data})
    })
  })
}

const deleteImage = (id) => {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM gallery_images WHERE id = ?`,
      [id],
      function(err) {
        if (err) reject(err)
        else resolve({id})
      }
    )
  })
}

const getImageByFilename = (filename) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM gallery_images WHERE filename = ?`,
      [filename],
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
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
  updateContactMessageStatus,
  saveImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
  getImageByFilename
}
