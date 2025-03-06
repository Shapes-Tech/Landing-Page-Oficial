import React from 'react'
import { Hero } from '../components/hero/Hero'
import { Services } from '../components/services/Services'
import { AboutUs } from '../components/about-us/AboutUs'
import { ContactUs } from '../components/contact-us/ContactUs'
import Shapes from '../components/shapes/Shapes'
import Footer from '../components/footer/Footer'

const MainPage = () => {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <ContactUs />
      <Shapes />
      <Footer />
    </>
  )
}

export default MainPage
