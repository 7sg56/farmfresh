import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VeggieDrawer = ({ isOpen, onClose }) => {
  const [selectedItems, setSelectedItems] = useState([])

  const categories = [
    { icon: '🥬', name: 'Leafy Greens', category: 'leafy' },
    { icon: '🥕', name: 'Root Veggies', category: 'root' },
    { icon: '🍅', name: 'Tomatoes', category: 'nightshade' },
    { icon: '🌶️', name: 'Peppers', category: 'peppers' },
    { icon: '🥒', name: 'Squash', category: 'squash' }
  ]

  const quickAddItems = [
    { icon: '🍅', name: 'Tomatoes', price: '$3.00/lb', id: 'tomatoes' },
    { icon: '🥕', name: 'Carrots', price: '$1.50/lb', id: 'carrots' },
    { icon: '🥬', name: 'Spinach', price: '$2.00/bunch', id: 'spinach' },
    { icon: '🥦', name: 'Broccoli', price: '$2.50/head', id: 'broccoli' },
    { icon: '🧅', name: 'Onions', price: '$1.10/lb', id: 'onions' },
    { icon: '🫑', name: 'Bell Peppers', price: '$2.20/lb', id: 'peppers' },
    { icon: '🥒', name: 'Cucumber', price: '$1.30/each', id: 'cucumber' },
    { icon: '🥗', name: 'Lettuce', price: '$1.70/head', id: 'lettuce' }
  ]

  const toggleItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Vegetables</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Veggie Categories */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="veggie-category text-center p-3 rounded-lg hover:bg-green-50 cursor-pointer transition-colors duration-200"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick Add Items */}
            <div className="grid grid-cols-3 md:grid-cols-7 lg:grid-cols-8 gap-3">
              {quickAddItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className={`quick-add-item bg-gray-50 rounded-lg p-3 text-center hover:bg-green-50 cursor-pointer transition-colors duration-200 ${
                    selectedItems.includes(item.id) ? 'selected ring-2 ring-emerald-500' : ''
                  }`}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-green-600">{item.price}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick Checkout */}
            <motion.div 
              className="mt-6 pt-4 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedItems.length === 0}
              >
                Add {selectedItems.length} Items to Cart • Deliver Today
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VeggieDrawer
