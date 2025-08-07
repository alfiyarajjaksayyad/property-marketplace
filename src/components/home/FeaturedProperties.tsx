'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react'
// import { formatPrice } from '@/lib/utils'
import { formatPrice } from '../../lib/utils';
import type { Property } from '@/types'

// Mock data for demonstration
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful modern apartment in the heart of downtown with stunning city views.',
    price: 2500,
    type: 'APARTMENT',
    status: 'AVAILABLE',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    amenities: ['Gym', 'Pool', 'Parking'],
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'OWNER',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ownerId: '1',
  },
  {
    id: '2',
    title: 'Cozy Suburban House',
    description: 'Perfect family home with a large backyard and quiet neighborhood.',
    price: 3200,
    type: 'HOUSE',
    status: 'AVAILABLE',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    address: '456 Oak Ave',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
    amenities: ['Garden', 'Garage', 'Fireplace'],
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'OWNER',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ownerId: '2',
  },
  {
    id: '3',
    title: 'Luxury Condo with Ocean View',
    description: 'Stunning oceanfront condo with premium amenities and breathtaking views.',
    price: 4500,
    type: 'CONDO',
    status: 'AVAILABLE',
    bedrooms: 2,
    bathrooms: 3,
    area: 1500,
    address: '789 Beach Blvd',
    city: 'Miami',
    state: 'FL',
    zipCode: '33139',
    images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'],
    amenities: ['Ocean View', 'Concierge', 'Spa'],
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@example.com',
      role: 'OWNER',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ownerId: '3',
  },
]

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    // In a real app, this would fetch from your API
    setProperties(mockProperties)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties available for rent and sale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.type.toLowerCase().replace('_', ' ')}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-primary-600 px-3 py-1 rounded-full text-sm font-bold">
                    {formatPrice(property.price)}/mo
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.city}, {property.state}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>

                <Link
                  href={`/properties/${property.id}`}
                  className="w-full btn btn-primary flex items-center justify-center"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/properties" className="btn btn-outline btn-lg">
            View All Properties
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}