import { useEffect, useState } from 'react'
import axios from 'axios'
import api from "../services/api";
import type { Todo } from '../types/Employee'


export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTodos = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get<Todo[]>('/todos')
      setTodos(res.data)
    } catch (err) {
      setError(
        axios.isAxiosError(err) ? err.message : 'Failed to load todos.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const toggleTodo = async (todo: Todo) => {
    const updated = { ...todo, done: !todo.done }
    // Optimistic update so the checkbox feels instant
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)))
    try {
      await api.patch(`/todos/${todo.id}`, { done: updated.done })
    } catch (err) {
      // Roll back on failure
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)))
      alert('Could not update the todo. Please try again.')
    }
  }

 
  return (
    <div className="page">
      <h2>Todo List</h2>
      <p className="page-sub">GET /todos to load, PATCH /todos/:id when you check a box</p>

      <div className="todo-list">
        {todos.map((todo) => (
          <label className="todo-item" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.task}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
