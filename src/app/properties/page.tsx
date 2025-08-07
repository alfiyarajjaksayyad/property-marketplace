
'use client'

import { useEffect, useState } from 'react'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/properties')
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch properties')
        }

        setProperties(data.data.properties)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Properties</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
              <p className="text-gray-600">{property.city}, {property.state}</p>
              <p className="font-bold text-primary-600 mt-2">₹{property.price}</p>
              <p className="text-sm text-gray-500">{property.bedrooms} Beds • {property.bathrooms} Baths • {property.area} sqft</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
