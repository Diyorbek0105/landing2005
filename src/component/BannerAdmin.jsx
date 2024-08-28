import React, { useEffect, useReducer, useRef, useState } from 'react'
import { URL } from '../uilst/url'

function BannerAdmin() {
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0)
    const [id, setID] = useState(null)
    const [num, setNum] = useState(null)
    useEffect(() => {
        getNum()
    }, [ignore])
    //Banner Start

    let title = useRef()
    let desc = useRef()
    let hyperlink = useRef()
    let img = useRef()

    let create_title = useRef()
    let create_num = useRef()
    let create_img = useRef()


    let Update_title = useRef()
    let Update_num = useRef()
    let Update_img = useRef()


    let openForm = useRef()

    async function getNum() {
        let fetchNum = await fetch(`${URL}/about-us_number`)
        let json = await fetchNum.json()
        setNum(json.data)
    }

    async function bannerSubmit(e) {
        e.preventDefault()
        let ready = {
            title: title.current.value,
            description: desc.current.value,
            hyperlink: hyperlink.current.value,
            imageLink: img.current.value
        }
        await fetch(`${URL}/about-us/666fdeda8363a53ccab0b940`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        })
        forceUpdate()
    }

    async function createNumber(e) {
        e.preventDefault()
        let tayyor = {
            title: create_title.current.value,
            numbers: create_num.current.value,
            imageLink: create_img.current.value
        }
        await fetch(`${URL}/about-us_number`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tayyor)
        })
        forceUpdate()
        create_title.current.value = ""
        create_num.current.value = ""
        create_img.current.value = ""
    }

    async function updateNumber(e) {
        e.preventDefault();
        let tayyor = {
            title: Update_title.current.value,
            numbers: Update_num.current.value,
            imageLink: Update_img.current.value
        }
        await fetch(`${URL}/about-us_number/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tayyor)
        })
        forceUpdate()
        Update_title.current.value = ""
        Update_num.current.value = ""
        Update_img.current.value = ""
        openForm.current.classList.remove("open")
    }

    function openNUmber(e) {
        setID(e.target.id)
        openForm.current.classList.add("open")
        forceUpdate()
    }


    async function delNumber(e) {
        await fetch(`${URL}/about-us_number/${e.target.id}`, {
            method: "DELETE"
        })
        forceUpdate()
    }

    //Banner end

    return (
        <div>
            <form onSubmit={(e) => bannerSubmit(e)} className='BannerForm'>
                <h1>Banner Section</h1>
                <input ref={title} type="text" placeholder='title' />
                <input ref={desc} type="text" placeholder='desc' />
                <input ref={hyperlink} type="text" placeholder='hyperlink' />
                <input ref={img} type="text" placeholder='img' />
                <button type='submit'>Submit</button>
            </form>
            <h2>Banner Number</h2>
            <div className="Number_grid">
                <form onSubmit={(e) => createNumber(e)} className='careateNumber'>
                    <input ref={create_title} type="text" placeholder='title' />
                    <input ref={create_num} type="number" placeholder='numbers' />
                    <input ref={create_img} type="text" placeholder='img' />
                    <button type="submit">Create</button>
                </form>
                <div>
                    <form ref={openForm} onSubmit={(e) => updateNumber(e)} className='updateNumber'>
                        <input ref={Update_title} type="text" placeholder='title' />
                        <input ref={Update_num} type="text" placeholder='numbers' />
                        <input ref={Update_img} type="text" placeholder='img' />
                        <button type="submit">Update</button>
                    </form>
                </div>
                <div className="num_delete">
                    {num?.map((item) => {
                        return (
                            <div className="num_delete_card" key={item?._id}>
                                <h3>{item?.title}</h3>
                                <button id={item?._id} onClick={(e) => openNUmber(e)}>Update</button>
                                <button onClick={(e) => delNumber(e)} id={item?._id}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BannerAdmin
