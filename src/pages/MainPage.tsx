import React from 'react'
import { Hero } from '../components/hero/Hero'
import { Services } from '../components/services/Services'
import { AboutUs } from '../components/about-us/AboutUs'
import { ContactUs } from '../components/contact-us/ContactUs'

const MainPage = () => {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <ContactUs />
    </>
  )
}

export default MainPage
