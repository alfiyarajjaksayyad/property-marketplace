
'use client'

import { useState } from 'react'
import { Search, MapPin, Home, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (location) params.set('location', location)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Fixed SVG Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Find Your Perfect
            <span className="block text-primary-200">Dream Home</span>
          </h1>
          <p
            className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            Discover amazing properties for rent and sale. Connect directly with property owners and skip the middleman.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="max-w-4xl mx-auto mb-16 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Quick Stats */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex flex-col items-center">
            <div className="bg-white/10 rounded-full p-4 mb-4">
              <Home className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-primary-200">Properties Listed</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/10 rounded-full p-4 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold mb-2">50,000+</div>
            <div className="text-primary-200">Happy Customers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/10 rounded-full p-4 mb-4">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold mb-2">100+</div>
            <div className="text-primary-200">Cities Covered</div>
          </div>
        </div>
      </div>
    </div>
  )
}
