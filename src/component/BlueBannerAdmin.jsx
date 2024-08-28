import React, { useEffect, useReducer, useRef, useState } from 'react'
import { URL } from '../uilst/url'

function BlueBannerAdmin() {
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0)
    const [card, setcard] = useState(null)
    const [id, setID] = useState(null)
    useEffect(() => {
        getCard()
    }, [ignore])
    let title = useRef()


    let create_title = useRef()
    let create_desc = useRef()
    let create_ref = useRef()
    let create_img = useRef()



    let update_title = useRef()
    let update_desc = useRef()
    let update_ref = useRef()
    let update_img = useRef()


    let openForm = useRef()



    async function getCard(){
        let fetchCard = await fetch(`${URL}/cards`)
        let json = await fetchCard.json()
        setcard(json.data)
        forceUpdate()
    }
    async function handleSubmit(e) {
        e.preventDefault()
        let ready = {
            title: title.current.value,
            card_ref_id: []
        }

        await fetch(`${URL}/all-services/666fe1d1691f82de3667076e`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        })
        forceUpdate()
        title.current.value = ""
    }

    //card start

    async function createBluecard(e) {
        e.preventDefault();
        let ready = {
            title: create_title.current.value,
            description: create_desc.current.value,
            referal: create_ref.current.value,
            imageLink: create_img.current.value
        }

        await fetch(`${URL}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        })
        forceUpdate()
        create_title.current.value =""
        create_desc.current.value =""
        create_ref.current.value =""
        create_img.current.value =""
    }
    async function updateBluecard(e) {
        e.preventDefault();
        let ready = {
            title: update_title.current.value,
            description: update_desc.current.value,
            referal: update_ref.current.value,
            imageLink: update_img.current.value
        }

        await fetch(`${URL}/cards/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        })
        openForm.current.classList.remove("open")
        forceUpdate()
        update_title.current.value =""
        update_desc.current.value =""
        update_ref.current.value =""
        update_img.current.value =""
    }

    function openCard(e) {
        setID(e.target.id)
        openForm.current.classList.add("open")
        forceUpdate()
    }

    async function deleteCard(e) {
        await fetch(`${URL}/cards/${e.target.id}`,{
            method: "DELETE"
        })
        forceUpdate()
    }
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className='BannerForm'>
                <h1>Blue Banner Section</h1>
                <input ref={title} type="text" placeholder='title' />
                <button type="submit">Update</button>
            </form>
            <h2>BlueBanner Cards</h2>
            <div className="Number_grid">
                <form onSubmit={(e) => createBluecard(e)} className='careateNumber'>
                    <input ref={create_title} type="text" placeholder='title' />
                    <input ref={create_desc} type="text" placeholder='desc' />
                    <input ref={create_ref} type="text" placeholder='referal' />
                    <input ref={create_img} type="text" placeholder='img' />
                    <button type="submit">Create</button>
                </form>
                <div>
                    <form ref={openForm} onSubmit={(e)=>updateBluecard(e)} className='updateNumber'>
                        <input ref={update_title} type="text" placeholder='title' />
                        <input ref={update_desc} type="text" placeholder='desc' />
                        <input ref={update_ref} type="text" placeholder='referal' />
                        <input ref={update_img} type="text" placeholder='img' />
                        <button type="submit">Update</button>
                    </form>
                </div>

                <div className="num_delete">
                    {card?.map((item) => {
                        return (
                            <div className="num_delete_card" key={item?._id}>
                                <h3>{item?.title}</h3>
                                <button onClick={(e)=>openCard(e)} id={item?._id} >Update</button>
                                <button onClick={(e)=> deleteCard(e)} id={item?._id}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BlueBannerAdmin
