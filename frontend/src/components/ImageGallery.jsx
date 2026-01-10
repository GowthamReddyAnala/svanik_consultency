import React, { useState, useEffect } from 'react'

function ImageGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [categories, setCategories] = useState([])

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'

  // Helper function to construct full image URL
  const getImageUrl = (path) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `${apiUrl}${path}`
  }
  const fetchGallery = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${apiUrl}/api/gallery`)
      const data = await res.json()
      if (Array.isArray(data)) {
        setImages(data)
        // Extract unique categories
        const uniqueCats = [...new Set(data.map(img => img.category))]
        setCategories(uniqueCats)
      }
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  // Filter images by category
  const filteredImages = filterCategory === 'all' 
    ? images 
    : images.filter(img => img.category === filterCategory)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Gallery</h2>
        <p className="text-gray-600">Explore our work and projects</p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full font-medium transition ${
              filterCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredImages.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No images in this category yet</p>
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && filteredImages.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map(img => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105 card-animate animate-fade-in will-change-transform"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-64 overflow-hidden bg-gray-100 shimmer">
                <img
                  src={getImageUrl(img.thumbnail_path)}
                  alt={img.alt_text}
                  className="w-full h-full object-cover gallery-thumb"
                  loading="lazy"
                  onLoad={(e)=> e.currentTarget.parentElement.classList.remove('shimmer')}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end justify-start p-4">
                <div className="opacity-0 group-hover:opacity-100 transition text-white">
                  <p className="font-medium text-sm">{img.alt_text}</p>
                  {img.description && (
                    <p className="text-xs mt-1 line-clamp-2">{img.description}</p>
                  )}
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {img.category}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
            >
              ✕
            </button>

            {/* Image Container */}
            <div className="flex flex-col items-center justify-center max-h-[90vh]">
              <img
                src={getImageUrl(selectedImage.file_path)}
                alt={selectedImage.alt_text}
                className="max-w-full max-h-[calc(90vh-120px)] object-contain"
              />

              {/* Info */}
              <div className="w-full bg-white p-6 border-t">
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {selectedImage.alt_text}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedImage.category}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {new Date(selectedImage.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {selectedImage.description && (
                    <p className="text-gray-700 text-sm mt-3">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
              <button
                onClick={() => {
                  const currentIdx = filteredImages.findIndex(img => img.id === selectedImage.id)
                  const prevIdx = currentIdx === 0 ? filteredImages.length - 1 : currentIdx - 1
                  setSelectedImage(filteredImages[prevIdx])
                }}
                className="bg-white/80 hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center transition text-xl"
              >
                ‹
              </button>
            </div>

            <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
              <button
                onClick={() => {
                  const currentIdx = filteredImages.findIndex(img => img.id === selectedImage.id)
                  const nextIdx = currentIdx === filteredImages.length - 1 ? 0 : currentIdx + 1
                  setSelectedImage(filteredImages[nextIdx])
                }}
                className="bg-white/80 hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center transition text-xl"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
