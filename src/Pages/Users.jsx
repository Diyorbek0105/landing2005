import React, { useEffect,useState} from 'react'
import '../style/users.css'
import { NavLink } from 'react-router-dom'
import { URL } from '../uilst/url'

function Users() {
  const [users, setUsers] = useState(null)
  useEffect(() => {
    getUsers()
  }, [])
  async function getUsers() {
    let fetchUsers = await fetch(`${URL}/users`)
    let json = await fetchUsers.json()
    setUsers(json?.data);
  }
  function deleteUser(e) {
    console.log(e.target.id);
    fetch(`${URL}/users/${e.target.id}`,{
      method:"DELETE"
    })
    window.location.reload()
  }
  return (
    <div className='users'>
      <NavLink to='/'>Main Page</NavLink>
      {users?.map((item) => {
        return (
          <div className="users_card" key={item?._id}>
            <h4>username: {item?.username}</h4>
            <h5>email: {item?.email}</h5>
            <button id={item._id} onClick={(e) => deleteUser(e)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Users
