import React, { useEffect, useState } from 'react'
import '../style/blueBanner.css'
import { URL } from '../uilst/url'

function BlueBanner() {
  const [blue, setBlue] = useState(null)
  const [card, setCard] = useState(null)
  useEffect(() => {
    gatBlue()
    gatCard()
  }, [])
  async function gatBlue() {
    let fetchBlue = await fetch(`${URL}/all-services`)
    let json = await fetchBlue.json()
    setBlue(json.data[1])
  }
  async function gatCard() {
    let fetchCard = await fetch(`${URL}/cards`)
    let json = await fetchCard.json()
    setCard(json.data)
  }
  return (
    <section className='blueBanner'>
      <div className="container">
        <div className="blueBanner_Wrapper">
          <h2>{blue?.title}</h2>
          <button>Все услуги</button>
        </div>
        <div className="blueBanner_grid">
          {card?.map((item) => {
            return (
              <div className="blueBanner_card" key={item._id}>
                <img src={item?.imageLink} alt="" />
                <h4>{item?.title}</h4>
                <p>{item?.description}</p>
                <a href="bhbh">{item?.referal}</a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BlueBanner
