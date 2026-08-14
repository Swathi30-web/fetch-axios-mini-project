import { Link } from 'react-router-dom'

const cards = [
  {
    to: '/users',
    icon: '👤',
    title: 'Users',
    tag: 'GET /users',
    desc: 'View all registered users.',
  },
  {
    to: '/products',
    icon: '🛒',
    title: 'Products',
    tag: 'GET /products',
    desc: 'Browse products, click one for details.',
  },
  {
    to: '/posts',
    icon: '📝',
    title: 'Posts',
    tag: 'GET /posts',
    desc: 'Read blog posts.',
  },
  {
    to: '/todos',
    icon: '✅',
    title: 'Todos',
    tag: 'GET /todos',
    desc: 'Track upcoming and completed tasks.',
  },
  {
    to: '/contacts',
    icon: '📇',
    title: 'Contacts',
    tag: 'GET / POST / PUT / DELETE',
    desc: 'Full CRUD — add, edit, delete contacts.',
  },
]

export default function Home() {
  return (
    <div className="home"><br></br><br></br>
      <h1>Fetch API / Axios Mini Project</h1>
<br></br><br></br>
      <div className="card-grid">
        {cards.map((c) => (
          <Link to={c.to} key={c.to} className="feature-card">
            <div className="feature-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p className="tag">{c.tag}</p>
            <p className="desc">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
