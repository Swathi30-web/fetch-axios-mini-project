import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import api from "../services/api";
import type { Product } from '../types/Employee'


export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProduct = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get<Product>(`/products/${id}`)
      setProduct(res.data)
    } catch (err) {
      setError(
        axios.isAxiosError(err) ? err.message : 'Failed to load product.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="page">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

     
      {!loading && !error && product && (
        <div className="product-detail">
          <img src={product.image} alt={product.name} />
          <div className="product-detail-info">
            <span className="category">{product.category}</span>
            <h2>{product.name}</h2>
            <p className="price">₹{product.price}</p>
            <p className="desc">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
