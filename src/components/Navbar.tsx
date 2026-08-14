import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/users', label: 'Users' },
  { to: '/products', label: 'Products' },
  { to: '/posts', label: 'Posts' },
  { to: '/todos', label: 'Todos' },
  { to: '/contacts', label: 'Contacts' },
   { to: '/images', label: 'Images' },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="brand">Employee Project</span>
      <div className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
