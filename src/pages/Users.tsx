import { useEffect, useState } from 'react'
import axios from 'axios'
import api from "../services/api";
import type { User } from '../types/Employee'


export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get<User[]>('/users')
      setUsers(res.data)
    } catch (err) {
      setError(
        axios.isAxiosError(err) ? err.message : 'Failed to load users.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  
  return (
    <div className="page">
      <h2>User List</h2>
      <p className="page-sub">Fetched from json-server · GET /users</p>

      <div className="user-grid">
        {users.map((user) => {
          const avatar = `https://i.pravatar.cc/150?img=${(user.id % 70) + 1}`
          return (
            <div className="user-card" key={user.id}>
              <img className="avatar" src={avatar} alt={user.name} loading="lazy" />
              <div className="user-info">
                <h3>{user.name}</h3>
                <ul>
                  <li>✉️ {user.email}</li>
                  <li>📞 {user.phone}</li>
                  <li>📍 {user.city}</li>
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
