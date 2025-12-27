import React, { useState } from 'react'
import PageWrapper from '../components/PageWrapper'

function CaseStudyCard({title, client, challenge, result, image}) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-4xl">
        {image}
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-blue-600 font-medium">{client}</p>
        <p className="text-sm text-gray-600 mt-2">{challenge}</p>
        {expanded && (
          <div className="mt-4 pt-4 border-t">
            <p className="font-medium text-green-600">Result:</p>
            <p className="text-sm text-gray-700 mt-1">{result}</p>
          </div>
        )}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-blue-600 font-medium hover:underline"
        >
          {expanded ? 'Hide Details' : 'Read Case Study'}
        </button>
      </div>
    </div>
  )
}

function TestimonialCard({quote, author, role, company, rating}) {
  return (
    <div className="bg-white rounded shadow-lg p-6">
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>
      <p className="italic text-gray-700 mb-4">"{quote}"</p>
      <div className="border-t pt-4">
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-600">{role} at {company}</p>
      </div>
    </div>
  )
}

export default function Testimonials(){
  return (
    <PageWrapper>
      <div className="space-y-12">
        
        {/* Page Header */}
        <section>
          <h1 className="text-4xl font-bold text-slate-900">Testimonials & Case Studies</h1>
          <p className="mt-4 text-lg text-gray-600">See what our clients say and learn from real-world projects.</p>
        </section>

        {/* Client Testimonials */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">Client Feedback</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              quote="Their expertise saved us $200K on our commercial tower. Exceptional value engineering." 
              author="Sarah Johnson"
              role="Project Director"
              company="Global Developments Inc."
              rating={5}
            />
            <TestimonialCard 
              quote="Finished our residential project 2 months ahead of schedule with zero regulatory delays." 
              author="Michael Chen"
              role="Construction Manager"
              company="Premier Contractors"
              rating={5}
            />
            <TestimonialCard 
              quote="The structural designs exceeded expectations. Professional and thorough approach." 
              author="Lisa Rodriguez"
              role="Lead Architect"
              company="Design Studios Group"
              rating={5}
            />
            <TestimonialCard 
              quote="Navigated complex permitting in record time. Their regulatory knowledge is outstanding." 
              author="David Park"
              role="Project Manager"
              company="Urban Development Corp"
              rating={5}
            />
            <TestimonialCard 
              quote="Cost estimation was incredibly accurate. Helped us win the bid and deliver profitably." 
              author="Emma Thompson"
              role="Finance Manager"
              company="BuildRight LLC"
              rating={5}
            />
            <TestimonialCard 
              quote="Honest feedback and practical solutions. They genuinely care about project success." 
              author="James Wilson"
              role="Founder"
              company="Heritage Properties"
              rating={5}
            />
          </div>
        </section>

        {/* Case Studies */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">Case Studies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CaseStudyCard 
              title="Downtown Office Complex"
              client="Global Developments"
              challenge="Design a 15-story mixed-use building with complex structural requirements and aggressive timeline."
              result="Completed structural design 6 weeks ahead of schedule. Final construction cost came in 8% under budget due to innovative design strategies."
              image="🏢"
            />
            <CaseStudyCard 
              title="Residential Community"
              client="Premier Contractors"
              challenge="Manage permits and environmental compliance for 200-unit residential development."
              result="All permits approved within 4 months (industry average: 8-12 months). Saved $150K in potential delays and fines."
              image="🏘️"
            />
            <CaseStudyCard 
              title="Industrial Facility Expansion"
              client="Manufacturing Partners"
              challenge="Design foundation and structural upgrades for existing heavy machinery facility."
              result="Zero production downtime during construction. Foundation redesign improved load capacity by 30% for future expansion."
              image="🏭"
            />
            <CaseStudyCard 
              title="Highway Infrastructure"
              client="Department of Transportation"
              challenge="Engineering and planning for 5-mile highway expansion with 4 major bridges."
              result="Designed innovative bridge solutions saving 12% on materials. Project completed 3 months early with perfect safety record."
              image="🌉"
            />
            <CaseStudyCard 
              title="University Campus Building"
              client="State University"
              challenge="Design sustainable research facility meeting LEED requirements and seismic standards."
              result="Achieved LEED Platinum certification. Design innovations reduced energy costs by 35% annually."
              image="🎓"
            />
            <CaseStudyCard 
              title="Water Treatment Plant"
              client="Municipal Utilities"
              challenge="Upgrade aging water treatment infrastructure to handle 40% population growth."
              result="Designed scalable system capable of doubling capacity. On budget and on schedule with minimal service interruption."
              image="💧"
            />
          </div>
        </section>

        {/* Stats & Impact */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded shadow-lg p-8">
          <h2 className="text-3xl font-semibold mb-8">Our Impact by Numbers</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold">500+</div>
              <p className="mt-2">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold">$2B+</div>
              <p className="mt-2">Project Value Managed</p>
            </div>
            <div>
              <div className="text-4xl font-bold">98%</div>
              <p className="mt-2">Client Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold">20+</div>
              <p className="mt-2">Years of Excellence</p>
            </div>
          </div>
        </section>

        {/* Industry Recognition */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">Industry Recognition</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {title: 'Best Engineering Firm 2023', org: 'State Engineering Council'},
              {title: 'Excellence in Project Delivery', org: 'Construction Excellence Awards'},
              {title: 'Innovation in Design', org: 'American Society of Civil Engineers'},
              {title: 'Sustainable Development Award', org: 'Green Building Institute'}
            ].map((award, idx) => (
              <div key={idx} className="bg-white rounded shadow p-6 text-center">
                <div className="text-3xl mb-3">🏆</div>
                <p className="font-semibold text-sm">{award.title}</p>
                <p className="text-xs text-gray-600 mt-2">{award.org}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-50 rounded shadow p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Let's Work on Your Project</h2>
          <p className="text-gray-700 mb-6">Join hundreds of satisfied clients. Schedule a consultation today.</p>
          <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 inline-block">
            Get Started
          </a>
        </section>

      </div>
    </PageWrapper>
  )
}
