import React, { useState } from 'react'
import PageWrapper from '../components/PageWrapper'

export default function Contact(){
  const [formData, setFormData] = useState({name: '', email: '', phone: '', subject: '', message: ''})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      if(res.ok){
        setSubmitted(true)
        setFormData({name: '', email: '', phone: '', subject: '', message: ''})
        setTimeout(() => setSubmitted(false), 4000)
      }
    } catch(err) {
      console.error('Form error:', err)
    }
  }

  return (
    <PageWrapper>
      <div className="space-y-12">
        
        {/* Page Header */}
        <section>
          <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Get in touch with our team.</p>
        </section>

        {/* Contact Info Cards */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-6 hover:shadow-lg transition text-center">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-blue-600 font-medium">info@civilconsult.com</p>
            <p className="text-sm text-gray-600 mt-2">Response within 24 hours</p>
          </div>
          <div className="bg-white rounded shadow p-6 hover:shadow-lg transition text-center">
            <div className="text-4xl mb-3">📞</div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
            <p className="text-sm text-gray-600 mt-2">Mon–Fri, 9 AM – 6 PM</p>
          </div>
          <div className="bg-white rounded shadow p-6 hover:shadow-lg transition text-center">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="font-semibold mb-2">Office</h3>
            <p className="text-gray-700">123 Engineering Drive<br/>Suite 100, Tech City, ST 12345</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white rounded shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          
          {submitted && (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-6 flex items-center">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <p className="font-semibold">Message Sent!</p>
                <p className="text-sm">Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject *</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Project Inquiry"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message *</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                required
                rows="6"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about your project, questions, or concerns..."
              ></textarea>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700">
              Send Message
            </button>
          </form>
        </section>

        {/* Office Hours & Additional Info */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded shadow p-6">
            <h3 className="font-semibold text-lg mb-4">Office Hours</h3>
            <ul className="text-gray-700 space-y-2">
              <li><strong>Monday – Friday:</strong> 9:00 AM – 6:00 PM</li>
              <li><strong>Saturday:</strong> 10:00 AM – 2:00 PM</li>
              <li><strong>Sunday:</strong> Closed</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">We respond to emails within 24 hours, even on weekends.</p>
          </div>
          <div className="bg-green-50 rounded shadow p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Response</h3>
            <ul className="text-gray-700 space-y-2">
              <li>📧 <strong>Email Response:</strong> Within 24 hours</li>
              <li>📞 <strong>Phone Calls:</strong> Same business day</li>
              <li>⏰ <strong>Emergency:</strong> Call our hotline</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">Emergency consultation available for urgent project needs.</p>
          </div>
        </section>

        {/* Social Media */}
        <section className="bg-white rounded shadow p-6 text-center">
          <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">LinkedIn</a>
            <a href="#" className="text-blue-400 hover:text-blue-500 font-medium">Twitter</a>
            <a href="#" className="text-blue-700 hover:text-blue-800 font-medium">Facebook</a>
          </div>
        </section>

      </div>
    </PageWrapper>
  )
}
