import { useState } from 'react'
import { Heart, MessageSquare, Share2, Send, Image as ImageIcon, Briefcase } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { feedApi } from '@/api/client'
import { useAuthStore } from '@/stores/auth.store'

export default function Feed() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const [newPost, setNewPost] = useState('')

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['feed'],
    queryFn: async () => {
      const res = await feedApi.getFeed()
      return res.data
    }
  })

  const postMutation = useMutation({
    mutationFn: (content: string) => feedApi.createPost({ content }),
    onSuccess: () => {
      setNewPost('')
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    }
  })

  const reactMutation = useMutation({
    mutationFn: ({ id, reaction }: { id: number, reaction: string }) => feedApi.reactToPost(id.toString(), reaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    }
  })

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return
    postMutation.mutate(newPost)
  }

  const toggleLike = (id: number) => {
    reactMutation.mutate({ id, reaction: 'like' })
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Create Post */}
      <div className="bg-[#0D1120] border border-white/10 rounded-xl p-4 mb-6 shadow-sm">
        <form onSubmit={handlePost}>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold shrink-0 shadow-lg">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Share an update or look for a job..."
              className="w-full bg-transparent border-none resize-none focus:ring-0 text-sm placeholder:text-slate-500 min-h-[60px] text-slate-200"
            />
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
            <div className="flex gap-2">
              <button type="button" className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors">
                <ImageIcon size={18} />
              </button>
              <button type="button" className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors">
                <Briefcase size={18} />
              </button>
            </div>
            <button
              type="submit"
              disabled={!newPost.trim() || postMutation.isPending}
              className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-md"
            >
              {postMutation.isPending ? 'Posting...' : 'Post'} <Send size={14} />
            </button>
          </div>
        </form>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {isLoading ? (
          // Skeleton Loader
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-[#0D1120] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 skeleton shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-white/5 skeleton rounded" />
                  <div className="h-3 w-24 bg-white/5 skeleton rounded" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 w-full bg-white/5 skeleton rounded" />
                <div className="h-3 w-4/5 bg-white/5 skeleton rounded" />
              </div>
            </div>
          ))
        ) : (
          posts.map((post: any) => (
            <div key={post.id} className="bg-[#0D1120] border border-white/10 rounded-xl p-4 shadow-sm hover:border-white/15 transition-colors">
              {/* Header */}
              <div className="flex gap-3 items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-sm font-bold shadow-sm">
                  {post.author.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-200">{post.author.name}</h3>
                  <p className="text-xs text-slate-500">{post.author.title} • {new Date(post.time).toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Body */}
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">
                {post.content}
              </p>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
                <span>{post.likes} Likes</span>
                <span>{post.comments} Comments</span>
              </div>
              
              {/* Actions */}
              <div className="flex border-t border-white/5 pt-2">
                <button
                  onClick={() => toggleLike(post.id)}
                  disabled={reactMutation.isPending}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors text-sm font-medium ${
                    post.isLiked ? 'text-purple-400 bg-purple-400/10' : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <Heart size={18} className={post.isLiked ? 'fill-purple-400' : ''} />
                  Like
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-slate-400 hover:bg-white/5 transition-colors text-sm font-medium">
                  <MessageSquare size={18} />
                  Comment
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-slate-400 hover:bg-white/5 transition-colors text-sm font-medium">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
