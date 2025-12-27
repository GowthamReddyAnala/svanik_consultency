import React, { useState } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'
import Admin from './pages/Admin'

export default function App(){
  const [currentPage, setCurrentPage] = useState('home')

  // Simple routing
  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <About />
      case 'services':
        return <Services />
      case 'testimonials':
        return <Testimonials />
      case 'contact':
        return <Contact />
      case 'admin':
        return <Admin />
      default:
        return <Home />
    }
  }

  return (
    <div>
      {/* Store setCurrentPage in window for navigation */}
      {(() => { window.navigateTo = setCurrentPage; return null; })()}
      {renderPage()}
    </div>
  )
}
