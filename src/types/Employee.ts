export interface User {
  id: number
  name: string
  email: string
  phone: string
  city: string
}

export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

export interface Post {
  id: number
  title: string
  body: string
}

export interface Todo {
  id: number
  task: string
  done: boolean
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  role: string;
}