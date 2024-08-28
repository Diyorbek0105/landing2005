import React, { useEffect, useState } from 'react'
import '../style/banner.css'
import Numbers from './Numbers'
import { URL } from '../uilst/url'

function Banner() {
  const [banner, setBanner] = useState(null)

  useEffect(() => {
    async function getBanner() {
      let fetchBanner = await fetch(`${URL}/about-us`)
      let json = await fetchBanner.json()
      setBanner(json.data[1])
    }
    getBanner()
  }, [])
  return (
    <section className='banner'>
      <div className="container">
        <div className="banner_wrapper">
          <div className="banner_contant">
            <h2>{banner?.title}</h2>
            <p>{banner?.description}</p>
            <a href='fsefwe'>{banner?.hyperlink}</a>
          </div>
          <div className="banner_img">
            <img src={banner?.imageLink} alt="" />
          </div>
        </div>
        <Numbers />
      </div>
    </section>
  )
}

export default Banner
