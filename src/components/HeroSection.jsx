import React from 'react'
import { motion } from 'framer-motion'
import HeroSlider from './HeroSlider'

const HeroSection = () => {
  const scrollToProducts = () => {
    const productGrid = document.getElementById('product-grid')
    if (productGrid) {
      productGrid.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="relative min-h-[55vh] overflow-hidden pb-4"> {/* Reduced bottom margin */}
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-400/20 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", delay: 2 }}
      />

      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <HeroSlider />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[55vh] px-4">
        <div className="max-w-3xl w-full text-center mx-auto"> {/* Slightly smaller max width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs font-medium mb-4 border border-white/20 shadow mx-auto">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              Same-day delivery • Farm verified • 100% fresh
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
              <span className="block">Farm-fresh produce,</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text text-transparent drop-shadow-lg">
                delivered <span className="underline decoration-emerald-400 decoration-4 underline-offset-4">today</span>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-white/90 mb-6 max-w-xl mx-auto">
              Connect directly with local farmers for the freshest, highest quality produce 
              delivered straight to your door in hours, not days.
            </p>
            
            <motion.button 
              onClick={scrollToProducts}
              className="group bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-2xl text-base transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 flex items-center mx-auto"
              whileHover={{ scale: 1.04, y: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center space-x-3">
                <span className="text-xl">🛒</span>
                <span>Shop Fresh Produce</span>
                <motion.svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={false}
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </span>
            </motion.button>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center space-x-4 text-white/90 mt-6 mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Live inventory</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">⭐ 4.9 rating</span>
              </div>
              <div className="w-px h-4 bg-white/30 hidden sm:block"></div>
              <div className="flex items-center space-x-2 hidden sm:flex">
                <span className="text-xs font-medium">🚚 Fast delivery</span>
              </div>
            </div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap items-center gap-4 text-white/80 mt-2 justify-center"
            >
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20 shadow">
                <span className="text-xl">👨‍🌾</span>
                <div>
                  <div className="text-base font-bold text-white">500+</div>
                  <div className="text-xs">Local Farms</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20 shadow">
                <span className="text-xl">😊</span>
                <div>
                  <div className="text-base font-bold text-white">50K+</div>
                  <div className="text-xs">Happy Customers</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20 shadow">
                <span className="text-xl">🚚</span>
                <div>
                  <div className="text-base font-bold text-white">1-2hrs</div>
                  <div className="text-xs">Delivery Time</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection