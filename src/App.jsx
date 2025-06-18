import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProductGrid from './components/ProductGrid'
import VeggieDrawer from './components/VeggieDrawer'
import PromoBanner from './components/PromoBanner'
import StatsSection from './components/StatsSection'
import TestimonialsSection from './components/TestimonialsSection'
import Footer from './components/Footer'
import SignUpPage from './components/SignUpPage'
import CartPage from './components/CartPage'

function App() {
  const [isVeggieDrawerOpen, setIsVeggieDrawerOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleQuickOrderClick = () => {
    setIsVeggieDrawerOpen(true)
  }

  const handleCloseVeggieDrawer = () => {
    setIsVeggieDrawerOpen(false)
  }

  const handleSignUpClick = () => {
    setIsSignUpOpen(true)
  }

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false)
  }

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleCloseCart = () => {
    setIsCartOpen(false)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto">
            F
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">FarmFresh</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar 
          onQuickOrderClick={handleQuickOrderClick}
          onSignUpClick={handleSignUpClick}
          onCartClick={handleCartClick}
        />
        
        <main className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50/90 backdrop-blur-sm">
              <ProductGrid />
              <StatsSection />
              <PromoBanner />
              <TestimonialsSection />
            </div>
          </motion.div>
        </main>
        
        <VeggieDrawer 
          isOpen={isVeggieDrawerOpen} 
          onClose={handleCloseVeggieDrawer} 
        />
        
        {isSignUpOpen && (
          <SignUpPage onClose={handleCloseSignUp} />
        )}
        
        {isCartOpen && (
          <CartPage onClose={handleCloseCart} />
        )}
        
        <Footer />
      </motion.div>
    </div>
  )
}

export default App
