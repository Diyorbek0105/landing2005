import React, { useEffect, useState } from 'react'
import '../style/services.css'
import { URL } from '../uilst/url'

function Services() {
  const [service, setService] = useState(null)
  const [serCard, setSerCard] = useState(null)

  useEffect(() => {
    async function getService() {
      let fetchService = await fetch(`${URL}/services`)
      let json = await fetchService.json()
      setService(json.data[0])
    }
    async function getSerCard(){
      let fetchSerCard = await fetch(`${URL}/content-services`)
      let json = await fetchSerCard.json()
      setSerCard(json.data)
    }
    getService()
    getSerCard()
  }, [])
 
  return (
    <section className='services'>
      <div className="container">
        <h2>{service?.title}</h2>
        <p className='description'>{service?.description}</p>
        <div className="service_wrapper">
          {serCard?.map((item) => {
            return (
              <div className="service_card" key={item?._id}>
                <img src={item?.imageLink} alt="" />
                <div>
                  <h4>{item?.title}</h4>
                  <p>{item?.description}</p>
                </div>
              </div>
            )
          })}
        </div>
        <button className='button'>Все услуги</button>
      </div>
    </section>
  )
}

export default Services
