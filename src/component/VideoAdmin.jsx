import React, { useRef } from 'react'
import { URL } from '../uilst/url'

function VideoAdmin() {

    let title = useRef()
    let description = useRef()
    let video = useRef()
    let imageLink = useRef()

    async function handleSubmit(e) {
        e.preventDefault()
        let ready = {
            title: title.current.value,
            description: description.current.value,
            video: video.current.value,
            imageLink: imageLink.current.value
        }
        await fetch(`${URL}/videos/666fe661a627cdbe6cae528d`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        })
    }
    return (
        <div>
            <form onSubmit={(e) => handleSubmit()} className='BannerForm'>
                <h1>Video Section</h1>
                <input ref={title} type="text" placeholder='title' />
                <input ref={description} type="text" placeholder='description' />
                <input ref={video} type="text" placeholder='video' />
                <input ref={imageLink} type="text" placeholder='imageLink' />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default VideoAdmin
