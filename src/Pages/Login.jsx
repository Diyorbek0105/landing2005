import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../style/login.css'
import { URL } from '../uilst/url'

function Login() {
  let password_input = useRef()
  let email_input = useRef()
  let navigate = useNavigate()
  const [allUsers, setallUsers] = useState(null)
  const [xabar, setXabar] = useState(false)
  useEffect(() => {
    getUsers()
  }, [])
  async function getUsers() {
    let fetchUsers = await fetch(`${URL}/users`)
    let json = await fetchUsers.json()
    setallUsers(json.data)
  }
  function handleSubmit(e) {
    e.preventDefault()
    let user = allUsers.find((item) => item.email === email_input.current.value)
    console.log(user)

    if (user?.password === password_input.current.value && user?.email === email_input.current.value) {
      navigate(`/admin/${user._id}`)
    }
    else {
      navigate("/login")
      setXabar(true)
    }
  }
  return (
    <div className='login'>
      <h1>Login</h1>
      {xabar && <h2>Login yoki Parol xato !!!</h2>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" placeholder='email' ref={email_input} />
        <input type="text" placeholder='password' ref={password_input} />
        <button type="submit" className='button'>Login</button>
      </form>
      <NavLink className='gooo' to='/'>Go Back</NavLink>
    </div>
  )
}

export default Login
