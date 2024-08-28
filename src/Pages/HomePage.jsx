import React from 'react'

import Header from '../component/Header';


import Banner from '../component/Banner';
import BlueBanner from '../component/BlueBanner';
import Footer from '../component/Footer';
import Form from '../component/Form';
import Hero from '../component/Hero';
import Projects from '../component/Projects';
import Service from '../component/Services';
import Video from '../component/Video';

function HomePage() {
    return (
        <main>
            <Header />

            <Hero />
            <Service />
            <Banner />
            <BlueBanner />
            <Projects />
            <Video />
            <Form />
            <Footer />
        </main>
    )
}

export default HomePage
