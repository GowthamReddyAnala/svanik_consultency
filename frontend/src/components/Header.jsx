import React from 'react'

export default function Header(){
  const navigate = (page) => {
    if(window.navigateTo) window.navigateTo(page)
  }

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // Hidden admin access (press 'a' twice quickly)
  const [adminKeyPresses, setAdminKeyPresses] = React.useState(0)
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'a' || e.key === 'A') {
        const newCount = adminKeyPresses + 1
        setAdminKeyPresses(newCount)
        if (newCount === 2) {
          navigate('admin')
          setAdminKeyPresses(0)
        }
        setTimeout(() => setAdminKeyPresses(0), 1000)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [adminKeyPresses])

  const handleNavClick = (page) => {
    navigate(page)
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('home')} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:opacity-80 flex-shrink-0">
            <div className="w-10 sm:w-12 h-8 sm:h-10 rounded flex items-center justify-center text-white font-bold text-sm sm:text-base overflow-hidden logo-gradient float-slow" style={{background: 'linear-gradient(135deg, var(--brand-1), var(--brand-2))'}}>
              <img src="/logo-full.svg" alt="Logo" className="w-10 sm:w-12 h-6 sm:h-8 object-contain"/>
            </div>
            <div className="font-semibold text-sm sm:text-base gradient-bg">svanik-consultant</div>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            <button onClick={() => navigate('home')} className="text-gray-600 hover:text-blue-600 text-sm">Home</button>
            <button onClick={() => navigate('services')} className="text-gray-600 hover:text-blue-600 text-sm">Services</button>
            <button onClick={() => navigate('about')} className="text-gray-600 hover:text-blue-600 text-sm">About</button>
            <button onClick={() => navigate('testimonials')} className="text-gray-600 hover:text-blue-600 text-sm">Testimonials</button>
            <button onClick={() => navigate('contact')} className="text-gray-600 hover:text-blue-600 text-sm">Contact</button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4">
            <button onClick={() => handleNavClick('home')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-600">Home</button>
            <button onClick={() => handleNavClick('services')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-600">Services</button>
            <button onClick={() => handleNavClick('about')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-600">About</button>
            <button onClick={() => handleNavClick('testimonials')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-600">Testimonials</button>
            <button onClick={() => handleNavClick('contact')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-600">Contact</button>
          </nav>
        )}
      </div>
    </header>
  )
}

