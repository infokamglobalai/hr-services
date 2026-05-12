import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '../prisma/generated/client'
import dotenv from 'dotenv'

dotenv.config()
const jwtPkg = require('jsonwebtoken')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
})
const prisma = new PrismaClient()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser() as any)

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

type SocketAuthNext = (err?: Error) => void
type SendMessagePayload = { conversationId: number; content: string; receiverId: number }

// Auth Middleware for HTTP
const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'No token provided' })
  
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwtPkg.verify(token, JWT_SECRET)
    req.userId = payload.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Socket.io Auth
io.use((socket: any, next: SocketAuthNext) => {
  const token = socket.handshake.auth?.token as string | undefined
  if (!token) return next(new Error('Auth error'))
  
  try {
    const payload = jwtPkg.verify(token, JWT_SECRET)
    socket.data.userId = payload.userId
    next()
  } catch (err) {
    next(new Error('Auth error'))
  }
})

// Real-time Logic
io.on('connection', (socket: any) => {
  const userId = socket.data.userId
  console.log(`User connected: ${userId}`)
  
  socket.join(`user_${userId}`)

  socket.on('send_message', async (data: SendMessagePayload) => {
    const { conversationId, content, receiverId } = data
    
    try {
      // Save to Prisma
      const message = await prisma.message.create({
        data: {
          conversationId: parseInt(conversationId as any),
          senderId: userId,
          content
        }
      })
      
      // Emit to both
      io.to(`user_${userId}`).emit('new_message', message)
      io.to(`user_${receiverId}`).emit('new_message', message)
      
      // Notify receiver to update their sidebar
      io.to(`user_${receiverId}`).emit('sidebar_update', {
        conversationId,
        lastMessage: content,
        senderId: userId
      })
    } catch (err) {
      console.error('Error saving message:', err)
    }
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${userId}`)
  })
})

// HTTP Routes
app.get('/api/v1/chat/conversations', authenticate, async (req: any, res: any) => {
  try {
    const userId = req.userId
    // Fetch conversations where user is a participant
    const conversations = await prisma.conversation.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })
    
    // Filter by user ID (robust check for comma-separated string)
    const filtered = conversations.filter(c => {
      const ids = c.users.split(',')
      return ids.includes(userId.toString())
    })
    
    // Format response
    const formatted = filtered.map(c => {
      const otherUserId = c.users.split(',').find(id => id !== userId.toString()) || '10'
      return {
        id: c.id,
        lastMessage: c.messages[0]?.content || 'No messages yet',
        updatedAt: c.updatedAt,
        user: { id: parseInt(otherUserId), firstName: 'Peer', lastName: 'User', avatar: null } // In production, fetch from social-svc
      }
    })
    
    res.json(formatted)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/v1/chat/conversations/:id/messages', authenticate, async (req: any, res: any) => {
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId: parseInt(req.params.id) },
      orderBy: { createdAt: 'asc' }
    })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/v1/chat/conversations/start', authenticate, async (req: any, res: any) => {
  try {
    const { receiverId } = req.body
    const userId = req.userId
    
    // Sort IDs to ensure consistent '1,10' format
    const participants = [userId, receiverId].sort((a, b) => a - b).join(',')
    
    let conversation = await prisma.conversation.findFirst({
      where: { users: participants }
    })
    
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { users: participants }
      })
    }
    
    res.json(conversation)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

async function seedConversations() {
  const c1 = await prisma.conversation.findFirst({ where: { users: '1,10' } })
  if (!c1) {
    await prisma.conversation.create({
      data: {
        users: '1,10',
        messages: {
          create: [
            { senderId: 10, content: 'Hey, I saw your roadmap!' },
            { senderId: 1, content: 'Thanks! AI generated it for me.' }
          ]
        }
      }
    })
  }

  const c2 = await prisma.conversation.findFirst({ where: { users: '1,20' } })
  if (!c2) {
    await prisma.conversation.create({
      data: {
        users: '1,20',
        messages: {
          create: [
            { senderId: 20, content: 'The mock interview was great.' }
          ]
        }
      }
    })
  }
}

seedConversations().then(() => {
  const PORT = process.env.PORT || 3005
  server.listen(PORT, () => {
    console.log(`Chat service running on port ${PORT}`)
  })
})
