import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 — refresh or logout
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const { data } = await axios.post('/api/v1/auth/refresh', {}, { withCredentials: true })
        useAuthStore.getState().setAuth(data.user, data.accessToken)
        original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch {
        useAuthStore.getState().clearAuth()
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api

// Auth endpoints
export const authApi = {
  signup: (data: { email: string; password: string; firstName: string; lastName: string; headline?: string | null; [k: string]: unknown }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
}

// Feed endpoints
export const feedApi = {
  getFeed: (cursor?: string, filter = 'all') =>
    api.get('/feed', { params: { cursor, filter } }),
  createPost: (data: { content: string; type?: string }) =>
    api.post('/posts', data),
  reactToPost: (postId: string, reaction: string) =>
    api.post(`/posts/${postId}/react`, { reaction }),
}

// Jobs endpoints
export const jobsApi = {
  getJobs: (params?: { search?: string, type?: string }) => api.get('/jobs', { params }),
  getJob: (id: string) => api.get(`/jobs/${id}`),
  applyToJob: (id: string) => api.post(`/jobs/${id}/apply`),
  getApplications: () => api.get('/jobs/my-applications'),
  saveJob: (id: string) => api.post(`/jobs/${id}/save`),
  getRecommended: () => api.get('/jobs/recommended'),
}

// User/profile endpoints
export const userApi = {
  getMe: () => api.get('/users/me'),
  updateMe: (data: Record<string, unknown>) => api.patch('/users/me', data),
  getProfile: (handle: string) => api.get(`/users/${handle}`),
  getConnections: () => api.get('/users/me/connections'),
  follow: (id: number) => api.post(`/users/${id}/follow`),
  connect: (id: number) => api.post(`/users/${id}/connect`),
}

// AI endpoints
export const aiApi = {
  getTemplates: () => api.get('/ai/templates'),
  parseResume: (formData: FormData) => api.post('/ai/parse-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  generateRoadmap: (targetRole: string) => api.post('/ai/generate-roadmap', { targetRole }),
}
