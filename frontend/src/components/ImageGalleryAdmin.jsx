import React, { useState, useEffect } from 'react'

function ImageGalleryAdmin() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [category, setCategory] = useState('General')
  const [altText, setAltText] = useState('')
  const [description, setDescription] = useState('')
  const [editingImage, setEditingImage] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'

  // Helper function to construct full image URL
  const getImageUrl = (path) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `${apiUrl}${path}`
  }
  const fetchImages = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${apiUrl}/api/gallery`)
      const data = await res.json()
      setImages(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching images:', err)
      setError('Failed to load images')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(f => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      const validSize = f.size <= 10 * 1024 * 1024 // 10MB

      if (!validTypes.includes(f.type)) {
        setError(`${f.name} has invalid type. Only JPEG, PNG, WebP, GIF allowed.`)
        return false
      }
      if (!validSize) {
        setError(`${f.name} exceeds 10MB size limit`)
        return false
      }
      return true
    })
    setSelectedFiles(validFiles)
    setError('')
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (selectedFiles.length === 0) {
      setError('Please select at least one image')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      const formData = new FormData()
      selectedFiles.forEach((file, idx) => {
        console.log(`Adding file ${idx + 1}: ${file.name} (${file.size} bytes, ${file.type})`)
        formData.append('images', file)
      })
      formData.append('category', category)
      formData.append('altText', altText)
      formData.append('description', description)

      console.log(`Uploading ${selectedFiles.length} file(s) to ${apiUrl}/api/admin/gallery/upload`)
      const res = await fetch(`${apiUrl}/api/admin/gallery/upload`, {
        method: 'POST',
        body: formData
      })

      console.log(`Upload response status: ${res.status}`)

      if (res.ok) {
        const data = await res.json()
        console.log('Upload successful:', data)
        setSuccess(`Successfully uploaded ${data.images.length} image(s)`)
        setSelectedFiles([])
        setCategory('General')
        setAltText('')
        setDescription('')
        setUploadProgress(0)
        fetchImages()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const errData = await res.json().catch(() => ({error: `HTTP ${res.status}`}))
        console.error('Upload failed - Status:', res.status, 'Error:', errData)
        setError(errData.error || errData.message || `Upload failed: HTTP ${res.status}`)
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload images: ' + (err.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return

    try {
      const res = await fetch(`${apiUrl}/api/admin/gallery/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setSuccess('Image deleted successfully')
        fetchImages()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to delete image')
      }
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete image')
    }
  }

  const handleUpdateImage = async (id, data) => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/gallery/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setSuccess('Image updated successfully')
        setEditingImage(null)
        fetchImages()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to update image')
      }
    } catch (err) {
      console.error('Update error:', err)
      setError('Failed to update image')
    }
  }

  const filteredImages = images.filter(img => {
    const matchesSearch = img.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.alt_text?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || img.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const uniqueCategories = [...new Set(images.map(img => img.category))]

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Upload Images</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          {/* File Input */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition cursor-pointer"
               onClick={() => document.getElementById('fileInput').click()}>
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-8l-3.172-3.172a4 4 0 00-5.656 0L28 28M9 20l3.172-3.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900">
                Click to select images or drag and drop
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, WebP, GIF up to 10MB
              </p>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="font-medium text-blue-900 mb-2">Selected Files:</p>
              <div className="space-y-1">
                {selectedFiles.map((file, idx) => (
                  <p key={idx} className="text-sm text-blue-700">✓ {file.name}</p>
                ))}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="General">General</option>
                <option value="Projects">Projects</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Before/After">Before/After</option>
                <option value="Team">Team</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Image description"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{width: `${uploadProgress}%`}}
              ></div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || selectedFiles.length === 0}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
              loading || selectedFiles.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Uploading...' : `Upload ${selectedFiles.length} Image(s)`}
          </button>
        </form>
      </div>

      {/* Gallery Management Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Manage Gallery</h2>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
            {filteredImages.length} images
          </span>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Images Grid */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No images found</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map(img => (
              <div key={img.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                {/* Thumbnail */}
                <div className="relative bg-gray-100 h-48 overflow-hidden">
                  <img
                    src={getImageUrl(img.thumbnail_path)}
                    alt={img.alt_text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium text-gray-700">
                    {img.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="font-medium text-sm text-gray-900 truncate">{img.original_name}</p>
                  <p className="text-xs text-gray-500 mt-1">{img.alt_text}</p>
                  
                  {editingImage === img.id ? (
                    // Edit Mode
                    <div className="mt-4 space-y-3 py-3 border-t">
                      <input
                        type="text"
                        defaultValue={img.alt_text}
                        placeholder="Alt text"
                        className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          // Update will be handled in handleSaveEdit
                        }}
                        id={`alt-${img.id}`}
                      />
                      <textarea
                        defaultValue={img.description}
                        placeholder="Description"
                        className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="2"
                        id={`desc-${img.id}`}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const altInput = document.getElementById(`alt-${img.id}`)
                            const descInput = document.getElementById(`desc-${img.id}`)
                            handleUpdateImage(img.id, {
                              alt_text: altInput.value,
                              description: descInput.value
                            })
                          }}
                          className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingImage(null)}
                          className="flex-1 bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => setEditingImage(img.id)}
                        className="flex-1 bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGalleryAdmin
