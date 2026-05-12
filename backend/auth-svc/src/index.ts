import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '../prisma/generated/client'
import dotenv from 'dotenv'

dotenv.config()

// We use require for jsonwebtoken due to typings issue in some configurations
const jwtPkg = require('jsonwebtoken')

const app = express()
const prisma = new PrismaClient()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser() as any)

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret'

const generateTokens = (userId: number) => {
  const accessToken = jwtPkg.sign({ userId }, JWT_SECRET, { expiresIn: '15m' })
  const refreshToken = jwtPkg.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '30d' })
  return { accessToken, refreshToken }
}

app.post('/api/v1/auth/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, headline } = req.body
    
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        headline,
      }
    })

    const { accessToken, refreshToken } = generateTokens(user.id)
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })

    const { password: _, ...userWithoutPassword } = user
    res.status(201).json({ user: userWithoutPassword, accessToken })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const { accessToken, refreshToken } = generateTokens(user.id)
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })

    const { password: _, ...userWithoutPassword } = user
    res.json({ user: userWithoutPassword, accessToken })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/api/v1/auth/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token' })
    }

    const payload = jwtPkg.verify(refreshToken, JWT_REFRESH_SECRET) as any
    const user = await prisma.user.findUnique({ where: { id: payload.userId } })
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const tokens = generateTokens(user.id)
    
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    const { password: _, ...userWithoutPassword } = user
    res.json({ user: userWithoutPassword, accessToken: tokens.accessToken })
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
})

app.post('/api/v1/auth/logout', (req, res) => {
  res.clearCookie('refreshToken')
  res.json({ message: 'Logged out' })
})

async function seedDemoUser() {
  const bcrypt = require('bcryptjs')
  const hashedPassword = await bcrypt.hash('demo123', 10)
  const exists = await prisma.user.findUnique({ where: { email: 'demo@futurestick.com' } })
  if (!exists) {
    await prisma.user.create({
      data: {
        email: 'demo@futurestick.com',
        password: hashedPassword,
        handle: 'demo_user',
        firstName: 'Demo',
        lastName: 'User'
      }
    })
    console.log('Demo user seeded')
  }
}

seedDemoUser().then(() => {
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`)
  })
})
