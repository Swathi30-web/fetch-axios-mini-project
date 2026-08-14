import { useEffect, useState } from 'react'
import axios from 'axios'
import api from "../services/api";
import type { Post } from '../types/Employee'


export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPosts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get<Post[]>('/posts')
      setPosts(res.data)
    } catch (err) {
      setError(
        axios.isAxiosError(err) ? err.message : 'Failed to load posts.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])


  return (
    <div className="page">
      <h2>Posts List</h2>
      <p className="page-sub">Fetched from json-server · GET /posts</p>

      <div className="post-list">
        {posts.map((post) => (
          <div className="post-item" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
