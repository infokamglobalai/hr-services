import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '../prisma/generated/client'
import dotenv from 'dotenv'
import multer from 'multer'
const pdfParse = require('pdf-parse')
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()
const jwtPkg = require('jsonwebtoken')

const app = express()
const prisma = new PrismaClient()
const upload = multer({ storage: multer.memoryStorage() })

// AI Config
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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

const RESUME_PARSER_PROMPT = `
Extract professional information from the following resume text. 
Return the data STRICTLY in the following JSON format:
{
  "fullName": "Name",
  "email": "Email",
  "phone": "Phone",
  "location": "City, Country",
  "summary": "Short 2-3 sentence summary",
  "skills": ["Skill1", "Skill2"],
  "experience": [{"role": "Role", "company": "Company", "duration": "Dates", "desc": "Achievements"}],
  "education": [{"school": "University", "degree": "Degree", "year": "Year"}]
}
If data is missing, use empty strings or empty arrays.

Resume Text:
`

// Routes
app.get('/api/v1/ai/templates', authenticate, (req: any, res: any) => {
  res.json([
    { id: 'classic', name: 'Classic Professional', tier: 'free', color: 'bg-slate-700' },
    { id: 'essential', name: 'Essential Minimal', tier: 'free', color: 'bg-blue-700' },
    { id: 'modern', name: 'Modern Creative', tier: 'premium', color: 'bg-purple-700' },
    { id: 'executive', name: 'Executive Slate', tier: 'premium', color: 'bg-emerald-700' },
    { id: 'tech', name: 'Tech Dynamic', tier: 'premium', color: 'bg-cyan-700' },
  ])
})

app.post('/api/v1/ai/parse-resume', authenticate, upload.single('resume'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    
    // Extract text from PDF
    const data = await pdfParse(req.file.buffer)
    const text = data.text

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY missing, using mock fallback')
      return res.json({
        fullName: 'Demo User (Mock)',
        email: 'demo@example.com',
        skills: ['React', 'Node.js'],
        experience: [{ role: 'Developer', company: 'Mock Corp', duration: '2020-2024', desc: 'Parsed from PDF via Mock Mode' }],
        education: [{ school: 'Mock Uni', degree: 'CS', year: '2020' }]
      })
    }

    const result = await model.generateContent([RESUME_PARSER_PROMPT + text])
    const response = await result.response
    const jsonText = response.text().replace(/```json|```/g, '').trim()
    
    res.json(JSON.parse(jsonText))
  } catch (error) {
    console.error('Gemini Error:', error)
    res.status(500).json({ message: 'Failed to parse resume with AI' })
  }
})

app.post('/api/v1/ai/generate-roadmap', authenticate, async (req: any, res: any) => {
  const { targetRole } = req.body
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY missing, using mock roadmap fallback')
      return res.json({
        role: targetRole,
        milestones: [
          { step: 1, title: 'Master Core Concepts', description: 'Focus on the fundamentals of ' + targetRole, skills: ['Foundations'], duration: '2 weeks' },
          { step: 2, title: 'Advanced Certification', description: 'Get certified in relevant technologies.', skills: ['Certification'], duration: '4 weeks' }
        ]
      })
    }

    const prompt = `
      You are an expert career coach. Generate a highly detailed, 5-step career roadmap for someone who wants to become a ${targetRole}.
      Each step must include a title, a detailed description, a list of 3 specific technical skills to learn, and an estimated duration.
      
      Return the data STRICTLY in this JSON format:
      {
        "role": "${targetRole}",
        "milestones": [
          {
            "step": 1,
            "title": "Title",
            "description": "Description",
            "skills": ["Skill1", "Skill2", "Skill3"],
            "duration": "Duration (e.g. 4 weeks)"
          }
        ]
      }
    `
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const jsonText = response.text().replace(/```json|```/g, '').trim()
    res.json(JSON.parse(jsonText))
  } catch (error) {
    console.error('Roadmap AI Error:', error)
    res.status(500).json({ message: 'Failed to generate roadmap' })
  }
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`AI service running on port ${PORT}`)
})
