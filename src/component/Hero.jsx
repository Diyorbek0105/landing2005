import React, { useEffect, useState } from 'react'
import '../style/hero.css'
import { URL } from '../uilst/url'

function Hero() {

    const [hero, setHero] = useState(null)

    useEffect(() => {
        getHero()
    }, [])

    async function getHero() {
        let fetchHero = await fetch(`${URL}/headers`)
        let json = await fetchHero.json()
        setHero(json.data[0])
    }

    return (
        <section className='hero' style={{ backgroundImage: `url(${hero?.imageLink})` }}>
            <div className="container">
                <div className="hero_wrapper">
                    <h4>{hero?.title}</h4>
                    <h1>{hero?.description}</h1>
                    <button className='button'>Наши проекты</button>
                </div>
            </div>
        </section>
    )
}

export default Hero
