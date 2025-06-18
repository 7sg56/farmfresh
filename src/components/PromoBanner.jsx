import React, { useState } from 'react'
import { motion } from 'framer-motion'

const PromoBanner = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
    setEmail('')
  }

  return (
    <motion.div 
      className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold mb-2">Get $10 off your first order!</h3>
      <p className="text-green-100 mb-4">Free same-day delivery on orders over $25</p>
      <form
        className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-3"
        onSubmit={handleSubmit}
      >
        <input 
          type="email" 
          placeholder="Enter your email for the discount"
          className="px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-green-300"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
        >
          Get Discount
        </button>
      </form>
      <p className="text-xs text-green-100 mt-2">*Valid for new customers only. Minimum order $25.</p>
      {submitted && (
        <motion.div
          className="mt-3 text-green-100 bg-green-700/80 px-4 py-2 rounded-lg inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          🎉 Discount code sent to your email!
        </motion.div>
      )}
    </motion.div>
  )
}

export default PromoBanner
