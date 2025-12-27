import React, { useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('consultations')
  const [consultations, setconsultations] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Fetch data on mount
  useEffect(() => {
    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const [consultRes, contactRes] = await Promise.all([
        fetch(`${apiUrl}/api/admin/consultations`),
        fetch(`${apiUrl}/api/admin/contacts`)
      ])

      const consultData = await consultRes.json()
      const contactData = await contactRes.json()

      setconsultations(Array.isArray(consultData) ? consultData : [])
      setContacts(Array.isArray(contactData) ? contactData : [])
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status, type) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const endpoint = type === 'consultation' 
        ? `${apiUrl}/api/admin/consultations/${id}`
        : `${apiUrl}/api/admin/contacts/${id}`
      
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({status})
      })
      if (res.ok) {
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const exportToCSV = (data, filename) => {
    if (data.length === 0) {
      alert('No data to export')
      return
    }

    const headers = Object.keys(data[0])
    const csv = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header]
          // Escape quotes and wrap in quotes if contains comma
          return typeof value === 'string' && value.includes(',') 
            ? `"${value.replace(/"/g, '""')}"` 
            : value
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csv], {type: 'text/csv'})
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Filter consultations
  const filteredconsultations = consultations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || c.type === filterType
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  // Filter contacts
  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage consultations and contact requests</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded shadow p-6">
            <div className="text-3xl font-bold text-blue-600">{consultations.length}</div>
            <p className="text-gray-600 text-sm mt-2">Total Consultations</p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <div className="text-3xl font-bold text-green-600">
              {consultations.filter(c => c.status === 'new').length}
            </div>
            <p className="text-gray-600 text-sm mt-2">New Consultations</p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <div className="text-3xl font-bold text-purple-600">{contacts.length}</div>
            <p className="text-gray-600 text-sm mt-2">Total Contact Messages</p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <div className="text-3xl font-bold text-orange-600">
              {contacts.filter(c => c.status === 'new').length}
            </div>
            <p className="text-gray-600 text-sm mt-2">New Messages</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('consultations')}
              className={`flex-1 py-4 px-6 font-medium text-center ${
                activeTab === 'consultations'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Consultations ({consultations.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-4 px-6 font-medium text-center ${
                activeTab === 'contacts'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact Messages ({contacts.length})
            </button>
          </div>

          {/* Controls */}
          <div className="p-6 border-b bg-gray-50">
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {activeTab === 'consultations' && (
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="Project Planning">Project Planning</option>
                  <option value="Cost Estimation">Cost Estimation</option>
                  <option value="Structural Design">Structural Design</option>
                  <option value="Permits and Regulations">Permits & Regulations</option>
                  <option value="Other">Other</option>
                </select>
              )}

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="viewed">Viewed</option>
                <option value="contacted">Contacted</option>
              </select>

              <button
                onClick={() => exportToCSV(
                  activeTab === 'consultations' ? filteredconsultations : filteredContacts,
                  `${activeTab}_${new Date().toISOString().split('T')[0]}.csv`
                )}
                className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700"
              >
                Export CSV
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : activeTab === 'consultations' ? (
              <div className="space-y-4">
                {filteredconsultations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No consultations found</div>
                ) : (
                  filteredconsultations.map(c => (
                    <div key={c.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{c.name}</h3>
                          <p className="text-sm text-gray-600">{c.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                            c.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                            c.status === 'viewed' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : 'New'}
                          </span>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-gray-600"><strong>Type:</strong> {c.type}</p>
                          <p className="text-gray-600"><strong>Phone:</strong> {c.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600"><strong>Date:</strong> {formatDate(c.created_at)}</p>
                          <p className="text-gray-600"><strong>Preferred Date:</strong> {c.preferred_date}</p>
                        </div>
                      </div>
                      {c.message && (
                        <div className="bg-gray-100 rounded p-3 mb-3">
                          <p className="text-sm text-gray-700">{c.message}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(c.id, 'viewed', 'consultation')}
                          className={`px-4 py-2 rounded text-sm font-medium ${
                            c.status === 'viewed'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Mark Viewed
                        </button>
                        <button
                          onClick={() => updateStatus(c.id, 'contacted', 'consultation')}
                          className={`px-4 py-2 rounded text-sm font-medium ${
                            c.status === 'contacted'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Mark Contacted
                        </button>
                        <a
                          href={`mailto:${c.email}`}
                          className="px-4 py-2 rounded text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No contact messages found</div>
                ) : (
                  filteredContacts.map(c => (
                    <div key={c.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{c.name}</h3>
                          <p className="text-sm text-gray-600">{c.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                            c.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                            c.status === 'viewed' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : 'New'}
                          </span>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-gray-600"><strong>Subject:</strong> {c.subject}</p>
                          <p className="text-gray-600"><strong>Phone:</strong> {c.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600"><strong>Date:</strong> {formatDate(c.created_at)}</p>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded p-3 mb-3">
                        <p className="text-sm text-gray-700">{c.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(c.id, 'viewed', 'contact')}
                          className={`px-4 py-2 rounded text-sm font-medium ${
                            c.status === 'viewed'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Mark Viewed
                        </button>
                        <button
                          onClick={() => updateStatus(c.id, 'contacted', 'contact')}
                          className={`px-4 py-2 rounded text-sm font-medium ${
                            c.status === 'contacted'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Mark Contacted
                        </button>
                        <a
                          href={`mailto:${c.email}`}
                          className="px-4 py-2 rounded text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center">
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700"
          >
            Refresh Data
          </button>
        </div>

      </main>
    </div>
  )
}

// Protect admin with simple password
function AdminLogin() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple password check (in production, use proper authentication)
    if (password === 'admin123') {
      setAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  if (authenticated) {
    return <AdminPanel />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">Admin Login</h1>
        <p className="text-gray-600 text-center mb-6">Enter password to access dashboard</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-gray-500 text-center">
            Demo password: <code className="bg-gray-100 px-2 py-1">admin123</code>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Admin(){
  const authenticated = localStorage.getItem('adminAuth') === 'true'
  
  if (!authenticated) {
    return <AdminLogin />
  }

  return <AdminPanel />
}
