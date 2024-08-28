import React, { useEffect, useState } from 'react'
import { URL } from '../uilst/url'

function Numbers() {
  const [number, setNumber] = useState(null)
  useEffect(() => {
    async function getNumber() {
      let fetchNumber = await fetch(`${URL}/about-us_number`)
      let json = await fetchNumber.json()
      setNumber(json.data)
    }
    getNumber()
  }, [])
  return (
    <div className='numbers numbersss'>
      {number?.map((item) => {
        return (
          <div className="number_card" key={item?._id}>
            <div>
              <img width={100} src={item?.imageLink} alt="" />
              <h4>{item?.numbers}</h4>
            </div>
            <span>{item?.title}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Numbers
