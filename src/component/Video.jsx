import React, { useEffect, useState } from 'react'
import '../style/video.css'
import { URL } from '../uilst/url'

function Video() {
    const [video, setVideo] = useState(null)
    useEffect(() => {
        async function gatVideo() {
            let fetchVideo = await fetch(`${URL}/videos`)
            let json = await fetchVideo.json()
            setVideo(json.data[0])
        }
        gatVideo()
    }, [])
    return (
        <section className='video' style={{ backgroundImage: `url(${video?.imageLink})` }}>
            <div className="container">
                <div className="video_wrapper">
                    <div className="video_list">
                        <h4>{video?.title}</h4>
                        <p>{video?.description}</p>
                    </div>
                    <div className="video_video">
                        <iframe src={video?.video}title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Video
