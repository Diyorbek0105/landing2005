import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import '../style/registerForm.css'
import { URL } from '../uilst/url'

function Register() {
    let name_input = useRef()
    let phone_input = useRef()
    let email_input = useRef()
    let password_input = useRef()


    function handeSubmit(e) {
        e.preventDefault()
        let ready = {
            username: name_input.current.value,
            phone_number: phone_input.current.value,
            email: email_input.current.value,
            password: password_input.current.value,
            imageLink: "https://picsum.photos/100/100",
        };
        fetch(`${URL}/users/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(ready)
        })
        console.log(ready);
    }
    return (
        <div className='registerForm_wrapper'>
            <h1>Register</h1>
            <form onSubmit={(e) => handeSubmit(e)}>
                <input ref={name_input} type="text" placeholder='name' />
                <input ref={phone_input} type="number" placeholder='phone' />
                <input ref={email_input} type="email" placeholder='email' />
                <input ref={password_input} type="text" placeholder='password' />
                <button className='button' type="submit">Register</button>
            </form>
            <NavLink className='gooo' to='/'>Go Back</NavLink>
        </div>
    )
}

export default Register
