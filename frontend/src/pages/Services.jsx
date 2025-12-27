import React, { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import servicesData from '../data/services.json'

function ServiceCard({service, isExpanded, onToggle}) {
  return (
    <div className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{service.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.shortDesc}</p>
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-gray-700 text-sm leading-relaxed">{service.fullDesc}</p>
            <div className="mt-4 flex gap-2">
              <a href="/" onClick={(e) => { e.preventDefault(); if(window.navigateTo) window.navigateTo('home') }} className="text-blue-600 text-sm font-medium hover:underline">
                Request Consultation
              </a>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => onToggle(service.id)}
          className="mt-4 text-blue-600 font-medium hover:underline text-sm"
        >
          {isExpanded ? 'Hide Details' : 'Learn More'}
        </button>
      </div>
    </div>
  )
}

export default function Services(){
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <PageWrapper>
      <div className="space-y-12">
        
        {/* Page Header */}
        <section>
          <h1 className="text-4xl font-bold text-slate-900">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive civil engineering and construction consulting solutions for projects of all sizes.
          </p>
        </section>

        {/* Services Grid */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                isExpanded={expandedId === service.id}
                onToggle={toggleExpand}
              />
            ))}
          </div>
        </section>

        {/* Service Categories */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-8">Service Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded p-6 shadow">
              <h3 className="font-semibold text-lg mb-3">Planning & Design</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Project Planning</li>
                <li>✓ Structural Design</li>
                <li>✓ Site Assessment</li>
                <li>✓ Cost Estimation</li>
              </ul>
            </div>
            <div className="bg-white rounded p-6 shadow">
              <h3 className="font-semibold text-lg mb-3">Regulatory & Compliance</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Permits & Regulations</li>
                <li>✓ Code Compliance</li>
                <li>✓ Environmental Assessment</li>
                <li>✓ Zoning & Land Use</li>
              </ul>
            </div>
            <div className="bg-white rounded p-6 shadow">
              <h3 className="font-semibold text-lg mb-3">Execution & Oversight</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Project Management</li>
                <li>✓ Construction Admin</li>
                <li>✓ Quality Assurance</li>
                <li>✓ Bid Management</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Industry Experience */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">Industries We Serve</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {icon: '🏢', title: 'Commercial'},
              {icon: '🏘️', title: 'Residential'},
              {icon: '🏭', title: 'Industrial'},
              {icon: '🏛️', title: 'Public'},
              {icon: '🚗', title: 'Transportation'},
              {icon: '💧', title: 'Water/Utilities'},
              {icon: '⚡', title: 'Energy'},
              {icon: '🌳', title: 'Infrastructure'}
            ].map((industry, idx) => (
              <div key={idx} className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
                <div className="text-3xl mb-2">{industry.icon}</div>
                <p className="font-semibold text-sm">{industry.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Project Size Range */}
        <section className="bg-white rounded shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-8">Project Scale</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$100K–$500K</div>
              <p className="text-gray-600 mt-2">Small Projects</p>
              <p className="text-sm text-gray-500 mt-1">Renovations, site work, small facilities</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$500K–$5M</div>
              <p className="text-gray-600 mt-2">Mid-Size Projects</p>
              <p className="text-sm text-gray-500 mt-1">Commercial buildings, residential communities</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">$5M–$50M</div>
              <p className="text-gray-600 mt-2">Large Projects</p>
              <p className="text-sm text-gray-500 mt-1">Complex industrial, mixed-use developments</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">$50M+</div>
              <p className="text-gray-600 mt-2">Major Programs</p>
              <p className="text-sm text-gray-500 mt-1">Infrastructure, multi-phase programs</p>
            </div>
          </div>
        </section>

        {/* Service Delivery Methods */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">How We Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded p-6 border-l-4 border-blue-600">
              <h3 className="font-semibold text-lg mb-3">Dedicated Team</h3>
              <p className="text-gray-700">
                You get a dedicated team of experts who know your project inside and out, ensuring continuity and deep understanding of your goals.
              </p>
            </div>
            <div className="bg-green-50 rounded p-6 border-l-4 border-green-600">
              <h3 className="font-semibold text-lg mb-3">Transparent Communication</h3>
              <p className="text-gray-700">
                Regular updates, clear documentation, and open dialogue keep all stakeholders informed and aligned throughout the project lifecycle.
              </p>
            </div>
            <div className="bg-purple-50 rounded p-6 border-l-4 border-purple-600">
              <h3 className="font-semibold text-lg mb-3">Proactive Problem Solving</h3>
              <p className="text-gray-700">
                We anticipate challenges, develop contingency plans, and resolve issues quickly to keep your project moving forward smoothly.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Note */}
        <section className="bg-gray-50 rounded p-8 border border-gray-200">
          <h3 className="font-semibold text-lg mb-3">Service Pricing</h3>
          <p className="text-gray-700 mb-4">
            Our consulting services are priced based on project scope, complexity, and duration. We offer flexible engagement models including:
          </p>
          <ul className="text-gray-700 space-y-2 ml-4">
            <li>✓ <strong>Hourly Rates:</strong> For limited scope work and quick assessments</li>
            <li>✓ <strong>Fixed Price:</strong> For well-defined services with clear deliverables</li>
            <li>✓ <strong>Retainer:</strong> For ongoing advisory relationships</li>
            <li>✓ <strong>Time & Materials:</strong> For flexible, open-ended engagements</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Contact us for a customized quote based on your specific needs.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-blue-50 rounded shadow p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Ready to Get Started?</h2>
          <p className="text-gray-700 mb-6">Let's discuss which services are right for your project.</p>
          <button 
            onClick={() => { if(window.navigateTo) window.navigateTo('home') }}
            className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 inline-block"
          >
            Request a Consultation
          </button>
        </section>

      </div>
    </PageWrapper>
  )
}
