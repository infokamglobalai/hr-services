import express from 'express'
import cors from 'cors'
import { PrismaClient } from '../prisma/generated/client'
import dotenv from 'dotenv'

dotenv.config()
const jwtPkg = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
const prisma = new PrismaClient()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser() as any)

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// Auth Middleware
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

// Routes
app.post('/api/v1/posts', authenticate, async (req: any, res: any) => {
  try {
    const { content, type } = req.body
    const post = await prisma.post.create({
      data: {
        userId: req.userId,
        content,
        type: type || 'text'
      }
    })
    // For demo purposes, we'll return the post with placeholder author details
    // In a real microservice architecture, we'd fetch these from a user cache/service
    const populatedPost = {
      ...post,
      author: { name: 'Current User', title: 'User Title', avatar: 'U' },
      _count: { likes: 0, comments: 0 },
      isLiked: false
    }
    res.status(201).json(populatedPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/v1/feed', authenticate, async (req: any, res: any) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        likes: { where: { userId: req.userId } },
        _count: { select: { likes: true, comments: true } }
      }
    })
    
    // Map to frontend expected format
    const formatted = posts.map((p: any) => ({
      id: p.id,
      content: p.content,
      type: p.type,
      time: p.createdAt,
      author: { name: `User ${p.userId}`, title: 'Member', avatar: 'U' },
      likes: p._count.likes,
      comments: p._count.comments,
      isLiked: p.likes.length > 0
    }))
    
    res.json(formatted)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/v1/posts/:id/react', authenticate, async (req: any, res: any) => {
  try {
    const postId = parseInt(req.params.id)
    const { reaction } = req.body || { reaction: 'like' }
    
    const existing = await prisma.reaction.findUnique({
      where: { userId_postId: { userId: req.userId, postId } }
    })
    
    if (existing) {
      await prisma.reaction.delete({ where: { id: existing.id } })
      return res.json({ message: 'Reaction removed', isLiked: false })
    } else {
      await prisma.reaction.create({
        data: { userId: req.userId, postId, type: reaction }
      })
      return res.json({ message: 'Reaction added', isLiked: true })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Social service running on port ${PORT}`)
})
