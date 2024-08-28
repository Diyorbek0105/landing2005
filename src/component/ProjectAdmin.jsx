import React, { useEffect, useReducer, useRef, useState } from 'react'
import { URL } from '../uilst/url';

function ProjectAdmin() {
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0)
    const [pro, setPro] = useState(null)
    const [id, setPID] = useState(null)
    let title = useRef()
    let desc = useRef()

    let create_title = useRef()
    let create_img = useRef()


    let update_title = useRef()
    let update_img = useRef()

    let openForm = useRef()

    useEffect(() => {
        getPro()
    }, [ignore])

    async function getPro() {
        let fetchProduct = await fetch(`${URL}/projects`)
        let json = await fetchProduct.json()
        setPro(json.data)
        forceUpdate()
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let ready = {
            title: title.current.value,
            description: desc.current.value,
            project_ref_id: []
        }
        await fetch(`${URL}/all-projects/666fe207faf59070189b5dc5`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        })
        forceUpdate()
        title.current.value = ""
        desc.current.value = ""
    }


    //pro start

    async function createPro(e) {
        e.preventDefault();
        let ready = {
            title: create_title.current.value,
            imageLink: create_img.current.value
        }
        await fetch(`${URL}/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        })
        forceUpdate()
        create_title.current.value = ""
        create_img.current.value = ""
    }

    function openPro(e) {
        setPID(e.target.id)
        openForm.current.classList.add("open")
    }
    async function updatePro(e) {
        e.preventDefault()
        let ready = {
            title: update_title.current.value,
            imageLink: update_img.current.value
        }
        await fetch(`${URL}/projects/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        })
        forceUpdate()
        update_title.current.value = ""
        update_img.current.value = ""
        openForm.current.classList.remove("open")
    }


    async function deletePro(e) {
        await fetch(`${URL}/projects/${e.target.id}`, {
            method: "DELETE"
        })
        forceUpdate()
    }
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className='BannerForm'>
                <h1>Project Section</h1>
                <input ref={title} type="text" placeholder='title' />
                <input ref={desc} type="text" placeholder='description' />
                <button type="submit">Update</button>
            </form>
            <h2>Project Cards</h2>
            <div className="Number_grid">
                <form onSubmit={(e) => createPro(e)} className='careateNumber'>
                    <input ref={create_title} type="text" placeholder='title' />
                    <input ref={create_img} type="text" placeholder='imageLink' />
                    <button type="submit">Create</button>
                </form>
                <div>
                    <form ref={openForm} onSubmit={(e) => updatePro(e)} className='updateNumber'>
                        <input ref={update_title} type="text" placeholder='title' />
                        <input ref={update_img} type="text" placeholder='imageLink' />
                        <button type="submit">Update</button>
                    </form>
                </div>
                <div className="num_delete">
                    {pro?.map((item) => {
                        return (
                            <div className="num_delete_card" key={item?._id}>
                                <h3>{item?.title}</h3>
                                <button onClick={(e) => openPro(e)} id={item?._id}>Update</button>
                                <button onClick={(e) => deletePro(e)} id={item?._id}>Delete</button>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default ProjectAdmin
