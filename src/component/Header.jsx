import React, { useRef } from 'react'
import '../style/header.css'
import { NavLink } from 'react-router-dom'

function Header() {
  let modal = useRef()

  function openModal() {
    modal.current.classList.add("openModal")
  }
  function closeModal() {
    modal.current.classList.remove("openModal")
  }
  return (
    <header className='header'>
      <div className="container">
        <div className='header_list'>
          <ul>
            <li>Главная</li>
            <li>Наши проекты</li>
            <li>Услуги</li>
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Register</NavLink>
            </li>
          </ul>
          <button onClick={openModal}>MENU</button>
        </div>
        <div ref={modal} className="modal">
          <div className="modal_wrapper">
            <button onClick={closeModal}>X</button>
            <ul>
              <li>Главная</li>
              <li>Наши проекты</li>
              <li>Услуги</li>
              <li>
                <NavLink to='/login'>Login</NavLink>
              </li>
              <li>
                <NavLink to='/register'>Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </header>
  )
}

export default Header
