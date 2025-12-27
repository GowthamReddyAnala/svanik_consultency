import React from 'react'

export default function Header(){
  const navigate = (page) => {
    if(window.navigateTo) window.navigateTo(page)
  }

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

  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate('home')} className="flex items-center space-x-3 cursor-pointer hover:opacity-80">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">SC</div>
          <div className="font-semibold">Svanick Consultancy</div>
        </button>
        <nav className="space-x-4">
          <button onClick={() => navigate('home')} className="text-gray-600 hover:text-blue-600">Home</button>
          <button onClick={() => navigate('services')} className="text-gray-600 hover:text-blue-600">Services</button>
          <button onClick={() => navigate('about')} className="text-gray-600 hover:text-blue-600">About</button>
          <button onClick={() => navigate('testimonials')} className="text-gray-600 hover:text-blue-600">Testimonials</button>
          <button onClick={() => navigate('contact')} className="text-gray-600 hover:text-blue-600">Contact</button>
        </nav>
      </div>
    </header>
  )
}
