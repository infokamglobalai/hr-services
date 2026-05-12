import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '../prisma/generated/client'
import dotenv from 'dotenv'

dotenv.config()
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

// Seed Data
const MOCK_JOBS = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'TechNova', location: 'Remote', salary: '₹35 - 50 LPA', type: 'Full-time', description: 'Looking for a React expert to lead our dashboard team.', tags: ['React', 'TypeScript', 'Tailwind'], requirements: ['5+ years experience', 'Strong Architecture skills'] },
  { id: 2, title: 'Backend Developer', company: 'CloudScale', location: 'Bangalore, KA', salary: '₹25 - 40 LPA', type: 'Full-time', description: 'Node.js and Distributed systems expert needed.', tags: ['Node.js', 'PostgreSQL', 'Redis'], requirements: ['3+ years experience', 'System design knowledge'] },
  { id: 3, title: 'UI/UX Designer', company: 'DesignFlow', location: 'Mumbai, MH', salary: '₹15 - 25 LPA', type: 'Remote', description: 'Create stunning user experiences for our next-gen app.', tags: ['Figma', 'Prototyping', 'Design Systems'], requirements: ['Portfolio required', 'Adobe Suite proficiency'] },
  { id: 4, title: 'DevOps Engineer', company: 'ScaleUp', location: 'Hyderabad, TS', salary: '₹30 - 45 LPA', type: 'Full-time', description: 'Manage our Kubernetes clusters and CI/CD pipelines.', tags: ['Kubernetes', 'AWS', 'Docker'], requirements: ['Terraform experience', 'Cloud security knowledge'] },
]

// Routes
app.get('/api/v1/jobs', authenticate, async (req: any, res: any) => {
  try {
    const { search, type } = req.query
    // For now, return mock jobs filtered by search
    let jobs = MOCK_JOBS
    if (search) {
      jobs = jobs.filter(j => 
        j.title.toLowerCase().includes(search.toLowerCase()) || 
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      )
    }
    if (type && type !== 'All') {
      jobs = jobs.filter(j => j.type === type)
    }
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/v1/jobs/:id', authenticate, async (req: any, res: any) => {
  const job = MOCK_JOBS.find(j => j.id === parseInt(req.params.id))
  if (!job) return res.status(404).json({ message: 'Job not found' })
  res.json(job)
})

app.post('/api/v1/jobs/:id/apply', authenticate, async (req: any, res: any) => {
  // In a real app, save to database
  res.json({ message: 'Application submitted successfully!', status: 'Pending' })
})

app.get('/api/v1/jobs/my-applications', authenticate, async (req: any, res: any) => {
  res.json([
    { id: 101, job: MOCK_JOBS[0], status: 'Reviewed', appliedAt: new Date() }
  ])
})

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
  console.log(`Job service running on port ${PORT}`)
})
