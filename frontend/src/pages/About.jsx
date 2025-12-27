import React from 'react'
import PageWrapper from '../components/PageWrapper'

export default function About(){
  return (
    <PageWrapper>
      <div className="space-y-12">
        
        {/* Page Header */}
        <section>
          <h1 className="text-4xl font-bold text-slate-900">About Civil Consulting</h1>
          <p className="mt-4 text-lg text-gray-600">Delivering expert civil engineering solutions with integrity and expertise.</p>
        </section>

        {/* Company Overview */}
        <section className="bg-white rounded shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2004, Civil Consulting has been at the forefront of providing comprehensive engineering expertise to contractors, developers, and property owners across the region. What started as a small firm with three engineers has grown into a trusted advisory partner for hundreds of successful projects.
          </p>
          <p className="text-gray-700 mb-4">
            Our reputation is built on a foundation of technical excellence, transparent communication, and a commitment to helping our clients succeed. Whether you're planning your first project or managing a complex multi-phase development, we bring the expertise and dedication to guide you through every step.
          </p>
          <p className="text-gray-700">
            We pride ourselves on staying current with industry best practices, regulatory changes, and emerging technologies—ensuring our clients always benefit from cutting-edge solutions.
          </p>
        </section>

        {/* Mission & Values */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded shadow p-6">
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-700">
              To provide professional, cost-effective civil engineering consulting that helps projects succeed on time, within budget, and in full compliance with applicable regulations and industry standards.
            </p>
          </div>
          <div className="bg-green-50 rounded shadow p-6">
            <h3 className="text-2xl font-semibold mb-3">Our Values</h3>
            <ul className="text-gray-700 space-y-2">
              <li>✓ <strong>Integrity:</strong> Honest, transparent, ethical conduct</li>
              <li>✓ <strong>Excellence:</strong> Highest quality work and attention to detail</li>
              <li>✓ <strong>Collaboration:</strong> Partnering effectively with clients and teams</li>
              <li>✓ <strong>Innovation:</strong> Embracing new technologies and methods</li>
            </ul>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {name: 'Dr. Robert Chen', title: 'Principal Engineer', creds: 'PE, 25+ years'},
              {name: 'Sarah Johnson', title: 'Senior Project Manager', creds: 'PMP, 18 years'},
              {name: 'Michael Garcia', title: 'Structural Engineer', creds: 'PE, 15 years'},
              {name: 'Emily Rodriguez', title: 'Cost Estimator', creds: 'CCE, 12 years'},
              {name: 'David Park', title: 'Permitting Specialist', creds: '20+ years'},
              {name: 'Lisa Thompson', title: 'CAD Manager', creds: 'REVIT certified, 10 years'}
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded shadow p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{member.title}</p>
                <p className="text-sm text-gray-600">{member.creds}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Expertise & Experience */}
        <section className="bg-white rounded shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">Our Expertise</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3">Project Types</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• Commercial & office buildings</li>
                <li>• Residential developments</li>
                <li>• Industrial facilities</li>
                <li>• Public infrastructure</li>
                <li>• Transportation projects</li>
                <li>• Water & utilities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3">Services</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• Project planning & feasibility</li>
                <li>• Structural design & analysis</li>
                <li>• Cost estimation & budgeting</li>
                <li>• Permitting & regulatory</li>
                <li>• Construction management</li>
                <li>• Quality assurance & testing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid sm:grid-cols-3 gap-6">
          <div className="bg-blue-600 text-white rounded shadow-lg p-8 text-center">
            <div className="text-4xl font-bold">500+</div>
            <p className="mt-2">Successful Projects</p>
          </div>
          <div className="bg-green-600 text-white rounded shadow-lg p-8 text-center">
            <div className="text-4xl font-bold">20+</div>
            <p className="mt-2">Years of Experience</p>
          </div>
          <div className="bg-purple-600 text-white rounded shadow-lg p-8 text-center">
            <div className="text-4xl font-bold">98%</div>
            <p className="mt-2">Client Satisfaction</p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-50 rounded shadow p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Ready to Work Together?</h2>
          <p className="text-gray-700 mb-6">Let's discuss your project and how we can help you succeed.</p>
          <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 inline-block">
            Get in Touch
          </a>
        </section>

      </div>
    </PageWrapper>
  )
}
