import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../lib/auth';
import { z } from 'zod'

const updatePropertySchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  price: z.number().positive('Price must be positive').optional(),
  type: z.enum(['APARTMENT', 'HOUSE', 'CONDO', 'TOWNHOUSE', 'STUDIO']).optional(),
  status: z.enum(['AVAILABLE', 'RENTED', 'SOLD']).optional(),
  bedrooms: z.number().min(0, 'Bedrooms must be 0 or more').optional(),
  bathrooms: z.number().min(0, 'Bathrooms must be 0 or more').optional(),
  area: z.number().positive('Area must be positive').optional(),
  address: z.string().min(1, 'Address is required').optional(),
  city: z.string().min(1, 'City is required').optional(),
  state: z.string().min(1, 'State is required').optional(),
  zipCode: z.string().min(1, 'Zip code is required').optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  images: z.array(z.string()).min(1, 'At least one image is required').optional(),
  amenities: z.array(z.string()).optional(),
})

// GET /api/properties/[id] - Get single property
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
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

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      )
    }

    // Parse JSON fields
    const formattedProperty = {
      ...property,
      images: JSON.parse(property.images),
      amenities: property.amenities ? JSON.parse(property.amenities) : [],
    }

    return NextResponse.json({
      success: true,
      data: formattedProperty
    })
  } catch (error) {
    console.error('Get property error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/properties/[id] - Update property
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if property exists and user owns it
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id }
    })

    if (!existingProperty) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      )
    }

    if (existingProperty.ownerId !== payload.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = updatePropertySchema.parse(body)

    // Prepare update data
    const updateData: any = { ...validatedData }
    if (validatedData.images) {
      updateData.images = JSON.stringify(validatedData.images)
    }
    if (validatedData.amenities) {
      updateData.amenities = JSON.stringify(validatedData.amenities)
    }

    const property = await prisma.property.update({
      where: { id: params.id },
      data: updateData,
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
      message: 'Property updated successfully'
    })
  } catch (error) {
    console.error('Update property error:', error)
    
    if (error instanceof z.ZodError) {
  return NextResponse.json(
    { success: false, error: error.issues[0]?.message || 'Validation failed' },
    { status: 400 }
  )
}

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/properties/[id] - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if property exists and user owns it
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id }
    })

    if (!existingProperty) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      )
    }

    if (existingProperty.ownerId !== payload.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    await prisma.property.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully'
    })
  } catch (error) {
    console.error('Delete property error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}