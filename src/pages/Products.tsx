import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import api from "../services/api";
import type { Product } from '../types/Employee'


export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get<Product[]>('/products')
      setProducts(res.data)
    } catch (err) {
      setError(
        axios.isAxiosError(err) ? err.message : 'Failed to load products.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

 
  return (
    <div className="page">
      <h2>Product List</h2>
      <p className="page-sub">GET /products — click a card for details</p>

      <div className="product-grid">
        {products.map((p) => (
          <Link to={`/products/${p.id}`} key={p.id} className="product-card">
            <img src={p.image} alt={p.name} loading="lazy" />
            <div className="product-info">
              <span className="category">{p.category}</span>
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
