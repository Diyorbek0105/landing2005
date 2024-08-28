import React, { useEffect, useReducer, useRef, useState } from 'react'
import '../style/admin.css'
import { NavLink, useParams } from 'react-router-dom'
import BannerAdmin from '../component/BannerAdmin'
import { URL } from '../uilst/url'
import BlueBannerAdmin from '../component/BlueBannerAdmin'
import ProjectAdmin from '../component/ProjectAdmin'
import VideoAdmin from '../component/VideoAdmin'

function Admin() {
  const [allUsers, setallUsers] = useState(null)
  const [update, forceUpdate] = useReducer(x => x + 1, 0)
  let id = useParams()
  useEffect(() => {
    getUsers()
    getService()
  }, [update])
  async function getUsers() {
    let fetchUsers = await fetch(`${URL}/users`)
    let json = await fetchUsers.json()
    setallUsers(json.data)
  }
  let user = allUsers?.find((item) => item._id === id.userID)

  //Hero start
  let hero_title = useRef()
  let hero_description = useRef()
  let hero_img = useRef()

  function heroSubmit(e) {
    e.preventDefault()
    let ready = {

      title: hero_title.current.value,
      description: hero_description.current.value,
      imageLink: hero_img.current.value,
    };
    fetch(`${URL}/66877b7693ad4a3997e936b2`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ready)
    })
    forceUpdate()
  }
  //Hero end
  //service Start
  let service_title = useRef()
  let service_subtitle = useRef()
  function handleService(e) {
    e.preventDefault();
    let ready = {
      description: service_title.current.value,
      title: service_subtitle.current.value
    }

    fetch(`${URL}/services/666fdd54e522b23994263bd9`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ready)
    })
  }
  const [serID, setSerId] = useState(null)
  let editForm = useRef()
  function openEditForm(e) {
    editForm.current.classList.add("open")
    setSerId(e.target.id)
  }

  let create_ser_title = useRef()
  let create_ser_subtitle = useRef()
  let create_ser_img = useRef()
  function createSerCard(e) {
    e.preventDefault()
    let ready = {
      title: create_ser_title.current.value,
      description: create_ser_subtitle.current.value,
      imageLink: create_ser_img.current.value,
    }
    fetch(`${URL}/content-services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ready)
    })
    forceUpdate()
  }
  const [ser, setSer] = useState(null)
  async function getService() {
    let fetchSer = await fetch(`${URL}/content-services`)
    let json = await fetchSer.json()
    setSer(json.data)
    forceUpdate()
  }

  function delSerCard(e) {
    fetch(`${URL}/content-services/${e.target.id}`, {
      method: "DELETE"
    })
    forceUpdate()
  }

  let edit_ser_title = useRef()
  let edit_ser_subtitle = useRef()
  let edit_ser_img = useRef()

  function editSerCard(e) {
    e.preventDefault()
    let ready = {
      title: edit_ser_title.current.value,
      description: edit_ser_subtitle.current.value,
      imageLink: edit_ser_img.current.value,
    }
    fetch(`${URL}/content-services/${serID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ready)
    })
    forceUpdate()
    editForm.current.classList.remove("open")
  }
  //service End
  return (
    <div className='admin_wrapper'>
      <div>
        <NavLink to="/">Main Page</NavLink>
        <NavLink to="/users">USERS</NavLink>
        <h2> Welcome {user?.username}</h2>
        <h4>Email: {user?.email}</h4>
        <h4>Phone: {user?.phone_number}</h4>
        <h4>Passwod: {user?.password}</h4>
      </div>

      <form className='hero_form' onSubmit={(e) => heroSubmit(e)}>
        <h1>Hero</h1>
        <input ref={hero_title} type="text" placeholder='title' />
        <input ref={hero_description} type="text" placeholder='description' />
        <input ref={hero_img} type="text" />
        <button className='button' type="Submit">Submit</button>
      </form>

      <form className='hero_form service' onSubmit={(e) => handleService(e)}>
        <h1>Service</h1>
        <input type="text" placeholder='title' ref={service_title} />
        <input type="text" placeholder='subtitle' ref={service_subtitle} />
        <button type="submit" className='button'>Update</button>
      </form>

      <div className="service_content">
        <h1>Service Cards</h1>
        <div className="SC_Grid">
          <form onSubmit={(e) => createSerCard(e)} className='ser_card_create'>
            <h3>Service Cards Create</h3>
            <input ref={create_ser_title} type="text" placeholder='title' />
            <input ref={create_ser_subtitle} type="text" placeholder='subtitle' />
            <input ref={create_ser_img} type="text" placeholder='img' />
            <button type="submit">Create</button>
          </form>
          <div>
            <form onSubmit={(e) => editSerCard(e)} ref={editForm} className='ser_card_upDate '>
              <h3>Service Cards UpDate</h3>
              <input ref={edit_ser_title} type="text" placeholder='title' />
              <input ref={edit_ser_subtitle} type="text" placeholder='subtitle' />
              <input ref={edit_ser_img} type="text" placeholder='img' />
              <button type="submit">UpDate</button>
            </form>
          </div>
          <div className="xyz">
            {ser?.map((item) => {
              return (
                <div className="ser_Cards" key={item?._id}>
                  <h3>{item?.title}</h3>
                  <button id={item?._id} onClick={(e) => delSerCard(e)}>delete</button>
                  <button id={item?._id} onClick={(e) => openEditForm(e)}>UpDate</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <BannerAdmin />
      <BlueBannerAdmin />
      <ProjectAdmin />
      <VideoAdmin />
    </div>
  )
}

export default Admin
