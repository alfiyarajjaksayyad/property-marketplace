export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'OWNER' | 'SEEKER'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: 'APARTMENT' | 'HOUSE' | 'CONDO' | 'TOWNHOUSE' | 'STUDIO'
  status: 'AVAILABLE' | 'RENTED' | 'SOLD'
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  city: string
  state: string
  zipCode: string
  latitude?: number
  longitude?: number
  images: string[]
  amenities?: string[]
  createdAt: Date
  updatedAt: Date
  owner: User
  ownerId: string
}

export interface Message {
  id: string
  content: string
  createdAt: Date
  sender: User
  senderId: string
  property: Property
  propertyId: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}