import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0',
      title: 'Fresh from Local Farms',
      subtitle: 'Picked at peak ripeness'
    },
    {
      image: 'https://images.unsplash.com/photo-1596776572010-93e181f9fc07?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
      title: 'Seasonal Produce',
      subtitle: 'Nature\'s best every season'
    },
    {
      image: 'https://images.unsplash.com/photo-1604106717088-e9db7e5226aa?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0',
      title: 'Organic & Sustainable',
      subtitle: 'Environmentally conscious farming'
    },
    {
      image: 'https://images.unsplash.com/photo-1588519722329-51b46166ecbd?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0',
      title: 'Farm to Table',
      subtitle: 'Direct from farmers to you'
    },
    {
      image: 'https://images.unsplash.com/photo-1722962674387-cb63ea17fda4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
      title: 'Support Local Farmers',
      subtitle: 'Building stronger communities'
    }
  ]

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [isPaused, slides.length])

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)
  
  // Manual navigation
  const goToSlide = (index) => {
    setActiveSlide(index)
  }
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div 
      className="w-full h-full relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={index !== activeSlide}
        />
      ))}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
      
      {/* Slide content */}
      <div className="absolute inset-0 flex items-end justify-start p-8 md:p-16 pointer-events-none">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 max-w-md text-left"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{slides[activeSlide].title}</h2>
          <p className="text-white/80">{slides[activeSlide].subtitle}</p>
        </motion.div>
      </div>
      
      {/* Navigation controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            tabIndex={-1}
            className={`w-3 h-3 rounded-full transition-all ${
              activeSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            style={{ outline: 'none' }}
          />
        ))}
      </div>

      {/* Arrow navigation */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm transition-all z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm transition-all z-10"
        onClick={nextSlide}
        aria-label="Next slide"
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div 
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 5,
            ease: "linear"
          }}
          key={activeSlide}
        />
      </div>
    </div>
  )
}

export default HeroSlider