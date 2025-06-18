import React from 'react'
import { motion } from 'framer-motion'

const StatsSection = () => {
  const stats = [
    { number: '500+', label: 'Local Farms' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '2M+', label: 'Orders Delivered' },
    { number: '4.9★', label: 'Average Rating' }
  ]

  return (
    <motion.div 
      className="mt-16 bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default StatsSection
