import React, { useState } from 'react'
import Header from '../components/Header'

function PageWrapper({children}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-12">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function Footer() {
  const navigate = (page) => {
    if(window.navigateTo) window.navigateTo(page)
  }

  return (
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
              <li><button onClick={() => navigate('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-white">Services</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-white">About</button></li>
              <li><button onClick={() => navigate('testimonials')} className="hover:text-white">Testimonials</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-white">Contact</button></li>
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
  )
}

export default PageWrapper
