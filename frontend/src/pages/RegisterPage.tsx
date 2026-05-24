import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../lib/api'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const response = await api.post('/auth/register', {
      email,
      username,
      password,
    })

    localStorage.setItem('token', response.data.data.accessToken)

    navigate('/')
  }

  return (
    <div className='container'>
      <div className='card'>
        <h1 className='title'>Register</h1>

        <form className='form' onSubmit={handleSubmit}>
          <input
            className='input'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className='input'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className='input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='button'>Register</button>
        </form>

        <p style={{ marginTop: 24 }}>
          Already have account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  )
}