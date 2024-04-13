import React from 'react'
import HeroSection from './components/HeroSection'
import { useProductContext } from './contextapi/productcontext'
 
const About = () => {

  const {myname} = useProductContext()
  const data = {
    names: "Tech Ecommerce" 
  }
  return (
    <>
    {myname}
 <HeroSection mydata = {data}/> 
    </>
  )
}

export default About
