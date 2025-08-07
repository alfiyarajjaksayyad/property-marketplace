import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { verifyToken } from '../../../lib/auth'
import { z, ZodError } from 'zod'

// Zod schema for message creation
const createMessageSchema = z.object({
  content: z.string().min(1, 'Message content is required'),
  propertyId: z.string().min(1, 'Property ID is required'),
})

// GET /api/messages - Fetch messages for a property
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get('propertyId')
    if (!propertyId) {
      return NextResponse.json({ success: false, error: 'Property ID is required' }, { status: 400 })
    }

    const property = await prisma.property.findUnique({ where: { id: propertyId } })
    if (!property) {
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 })
    }

    // Only owner or message sender can see messages
    const userMessages = await prisma.message.findFirst({
      where: { propertyId, senderId: payload.userId }
    })

    if (property.ownerId !== payload.userId && !userMessages) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 })
    }

    const messages = await prisma.message.findMany({
      where: { propertyId },
      include: {
        sender: { select: { id: true, name: true, avatar: true } }
      },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/messages - Create/send a new message
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createMessageSchema.parse(body)

    const property = await prisma.property.findUnique({
      where: { id: validatedData.propertyId }
    })

    if (!property) {
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 })
    }

    const message = await prisma.message.create({
      data: {
        content: validatedData.content,
        propertyId: validatedData.propertyId,
        senderId: payload.userId,
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        property: { select: { id: true, title: true } }
      }
    })

    return NextResponse.json({
      success: true,
      data: message,
      message: 'Message sent successfully'
    })
  } catch (error) {
    console.error('Send message error:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
