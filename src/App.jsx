import React from 'react'
import Hero from './components/layout/Hero'
import About from './components/sections/About'
import Navbar from './components/layout/Navbar'
import Features from './components/sections/Features'
import Story from './components/sections/Story'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

function App() {
  return (
   <main className=' relative min-h-screen w-screen
    overflow-x-hidden '>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer /> 
     
   </main>
  )
}

export default App