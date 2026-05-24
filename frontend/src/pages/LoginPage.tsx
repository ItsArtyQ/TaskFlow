import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../lib/api'

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const response = await api.post('/auth/login', {
      email,
      password,
    })

    localStorage.setItem('token', response.data.data.accessToken)

    navigate('/')
  }

  return (
    <div className='container'>
      <div className='card'>
        <h1 className='title'>Login</h1>

        <form className='form' onSubmit={handleSubmit}>
          <input
            className='input'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className='input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='button'>Login</button>
        </form>

        <p style={{ marginTop: 24 }}>
          No account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}