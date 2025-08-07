import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma';
import { prisma } from '../../../lib/prisma';

import { verifyToken } from '../../../lib/auth';
import { z } from 'zod'

const createPropertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  type: z.enum(['APARTMENT', 'HOUSE', 'CONDO', 'TOWNHOUSE', 'STUDIO']),
  bedrooms: z.number().min(0, 'Bedrooms must be 0 or more'),
  bathrooms: z.number().min(0, 'Bathrooms must be 0 or more'),
  area: z.number().positive('Area must be positive'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  amenities: z.array(z.string()).optional(),
})

// GET /api/properties - Get all properties with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('q') || ''
    const location = searchParams.get('location') || ''
    const type = searchParams.get('type') || ''
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')
    const bathrooms = searchParams.get('bathrooms')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: 'AVAILABLE',
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (location) {
      where.OR = [
        ...(where.OR || []),
        { city: { contains: location, mode: 'insensitive' } },
        { state: { contains: location, mode: 'insensitive' } },
        { address: { contains: location, mode: 'insensitive' } },
      ]
    }

    if (type) {
      where.type = type
    }

    if (minPrice) {
      where.price = { ...where.price, gte: parseFloat(minPrice) }
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: parseFloat(maxPrice) }
    }

    if (bedrooms) {
      where.bedrooms = parseInt(bedrooms)
    }

    if (bathrooms) {
      where.bathrooms = parseInt(bathrooms)
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.property.count({ where })
    ])

    // Parse JSON fields
    const formattedProperties = properties.map(property => ({
      ...property,
      images: JSON.parse(property.images),
      amenities: property.amenities ? JSON.parse(property.amenities) : [],
    }))

    return NextResponse.json({
      success: true,
      data: {
        properties: formattedProperties,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        }
      }
    })
  } catch (error) {
    console.error('Get properties error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/properties - Create new property
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createPropertySchema.parse(body)

    const property = await prisma.property.create({
      data: {
        ...validatedData,
        images: JSON.stringify(validatedData.images),
        amenities: validatedData.amenities ? JSON.stringify(validatedData.amenities) : null,
        ownerId: payload.userId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          }
        }
      }
    })

    // Parse JSON fields for response
    const formattedProperty = {
      ...property,
      images: JSON.parse(property.images),
      amenities: property.amenities ? JSON.parse(property.amenities) : [],
    }

    return NextResponse.json({
      success: true,
      data: formattedProperty,
      message: 'Property created successfully'
    })
  } catch (error) {
    console.error('Create property error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}