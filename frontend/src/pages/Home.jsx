import React, { useState } from 'react'
import Header from '../components/Header'

function ServiceCard({title, desc}){
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-white shadow rounded p-4 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{desc}</p>
      <button 
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-blue-600 font-medium hover:underline"
      >
        {expanded ? 'Hide' : 'Learn more'}
      </button>
      {expanded && (
        <div className="mt-3 pt-3 border-t text-sm text-gray-700">
          <p>Get expert guidance from our experienced consultants. We provide detailed analysis, comprehensive solutions, strategic planning, and reliable support.</p>
        </div>
      )}
    </div>
  )
}

function TestimonialCard({quote, author}){
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <p className="italic text-gray-700">"{quote}"</p>
      <p className="mt-2 font-semibold text-sm">— {author}</p>
    </div>
  )
}

export default function Home(){
  const [formData, setFormData] = useState({name: '', email: '', phone: '', type: 'Project Planning', message: '', date: ''})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:4000/api/consultation', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      if(res.ok){
        setSubmitted(true)
        setFormData({name: '', email: '', phone: '', type: 'Project Planning', message: '', date: ''})
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch(err) {
      console.error('Form error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Svanick Consultancy - Expert Guidance</h1>
            <p className="mt-4 text-gray-700">We provide project planning, cost estimation, structural design, permitting guidance, and regulatory compliance to help your projects succeed on time and within budget.</p>
            <div className="mt-6 flex gap-3">
              <a href="#consult" className="bg-blue-600 text-white px-5 py-3 rounded font-medium hover:bg-blue-700">Get a Consultation</a>
              <button onClick={() => { if(window.navigateTo) window.navigateTo('about') }} className="border border-blue-600 text-blue-600 px-5 py-3 rounded font-medium hover:bg-blue-50">Learn More</button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg shadow-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🏗️</div>
              <p className="text-lg font-semibold text-slate-700">Professional Consultancy Solutions</p>
            </div>
          </div>
        </section>

        {/* Consultation Form Section */}
        <section id="consult" className="bg-white rounded shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Quick Consultation Request</h2>
          <p className="text-gray-600 mb-6">Tell us about your project and preferred consultation times.</p>
          
          {submitted && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">✓ Consultation request received! We'll contact you soon.</div>}
          
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
                <label className="block text-sm font-medium text-gray-700">Consultation Type *</label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Project Planning</option>
                  <option>Cost Estimation</option>
                  <option>Structural Design</option>
                  <option>Permits and Regulations</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Date *</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Details / Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                rows="4"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Describe your project, requirements, and any specific concerns..."
              ></textarea>
            </div>

            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded font-medium hover:bg-green-700">
              Submit Consultation Request
            </button>
          </form>
        </section>

        {/* Services Section */}
        <section id="services" className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              title="📋 Project Planning" 
              desc="Comprehensive feasibility studies, scheduling, milestone planning, and resource allocation."
            />
            <ServiceCard 
              title="💰 Cost Estimation" 
              desc="Detailed cost breakdowns, budget forecasting, and value engineering to control expenses."
            />
            <ServiceCard 
              title="🏢 Structural Design" 
              desc="Expert structural analysis, design drawings, and compliance with building codes."
            />
            <ServiceCard 
              title="📜 Permits & Regulations" 
              desc="Guidance on permitting, zoning laws, environmental compliance, and regulatory requirements."
            />
            <ServiceCard 
              title="🔍 Site Assessment" 
              desc="Geotechnical surveys, site analysis, and foundation recommendations."
            />
            <ServiceCard 
              title="👥 Project Management" 
              desc="Oversight, quality control, timeline management, and stakeholder coordination."
            />
          </div>
          <div className="mt-8 text-center">
            <button 
              onClick={() => { if(window.navigateTo) window.navigateTo('services') }}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded font-medium hover:bg-blue-50"
            >
              View All Services
            </button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Testimonials & Case Studies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              quote="Excellent service and clear deliverables. They saved us months on permitting alone." 
              author="Sarah Johnson, Project Manager"
            />
            <TestimonialCard 
              quote="Helped us save 15% on project costs with smart value engineering." 
              author="Mike Chen, Contractor"
            />
            <TestimonialCard 
              quote="Professional team with deep expertise. We finished ahead of schedule." 
              author="Lisa Rodriguez, Developer"
            />
            <TestimonialCard 
              quote="Fantastic structural designs that exceeded our expectations." 
              author="David Park, Architect"
            />
            <TestimonialCard 
              quote="Regulatory guidance was invaluable for our complex multi-phase project." 
              author="Emma Thompson, Consultant"
            />
            <TestimonialCard 
              quote="Highly recommend for any serious construction project." 
              author="James Wilson, Client"
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded shadow p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-700 mb-3">
            With over 20 years of combined experience in professional consultancy, our team brings practical expertise and a client-first approach to every engagement.
          </p>
          <p className="text-gray-700 mb-3">
            We specialize in helping contractors, developers, and property owners navigate complex projects with confidence. From initial planning through final inspection, we provide clear, actionable guidance.
          </p>
          <p className="text-gray-700">
            Our mission: deliver professional, cost-effective consulting that drives your success with strategic guidance and comprehensive support.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-blue-50 rounded p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium">Email:</p>
              <p className="text-blue-600">info@civilconsult.com</p>
            </div>
            <div>
              <p className="font-medium">Phone:</p>
              <p className="text-blue-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="font-medium">Office:</p>
              <p className="text-gray-700">123 Engineering Drive, Suite 100<br/>Tech City, ST 12345</p>
            </div>
            <div>
              <p className="font-medium">Hours:</p>
              <p className="text-gray-700">Mon–Fri: 9:00 AM – 6:00 PM<br/>Sat: 10:00 AM – 2:00 PM</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Civil Consulting</h3>
              <p className="text-sm text-gray-300">Expert guidance for construction projects.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm">Quick Links</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm">Legal</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between items-center text-sm">
            <p>© {new Date().getFullYear()} Civil Consulting. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">LinkedIn</a>
              <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
