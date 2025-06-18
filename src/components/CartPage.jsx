import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CartPage = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      description: 'Vine ripened, locally grown',
      price: 3.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
      unit: 'lb'
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      description: 'Organic & sweet',
      price: 1.50,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
      unit: 'lb'
    },
    {
      id: 3,
      name: 'Spinach Bundle',
      description: 'Fresh leafy greens',
      price: 2.00,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0',
      unit: 'bunch'
    }
  ])

  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [deliveryOption, setDeliveryOption] = useState('standard')

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const applyPromoCode = () => {
    const validCodes = {
      'FRESH10': { discount: 0.10, type: 'percentage', description: '$10 off your order' },
      'SAVE5': { discount: 5, type: 'fixed', description: '$5 off' },
      'NEWBIE': { discount: 0.15, type: 'percentage', description: '15% off for new customers' }
    }

    const promo = validCodes[promoCode.toUpperCase()]
    if (promo) {
      setAppliedPromo({ code: promoCode.toUpperCase(), ...promo })
      setPromoCode('')
    } else {
      alert('Invalid promo code')
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
  }

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const promoDiscount = appliedPromo 
    ? appliedPromo.type === 'percentage' 
      ? subtotal * appliedPromo.discount 
      : appliedPromo.discount
    : 0
  const deliveryFee = deliveryOption === 'express' ? 5.99 : deliveryOption === 'standard' ? 2.99 : 0
  const tax = (subtotal - promoDiscount) * 0.08 // 8% tax
  const total = subtotal - promoDiscount + deliveryFee + tax

  const CartItem = ({ item }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200"
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
        <p className="text-sm font-medium text-green-600">${item.price.toFixed(2)}/{item.unit}</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>
          <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        
        <div className="text-right">
          <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        
        <button
          onClick={() => removeItem(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </motion.div>
  )

  if (cartItems.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some fresh produce to get started!</p>
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              <p className="text-gray-600">{cartItems.length} items</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Items List */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              <AnimatePresence>
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>

            {/* Delivery Options */}
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Delivery Options</h3>
              <div className="space-y-2">
                {[
                  { id: 'express', name: 'Express (1-2 hours)', price: 5.99, icon: '⚡' },
                  { id: 'standard', name: 'Standard (Same day)', price: 2.99, icon: '🚚' },
                  { id: 'pickup', name: 'Store Pickup', price: 0, icon: '🏪' }
                ].map(option => (
                  <label key={option.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={deliveryOption === option.id}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-gray-500">
                        {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-80 p-6 bg-white border-l border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
            
            {/* Promo Code */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <div className="font-medium text-green-800">{appliedPromo.code}</div>
                    <div className="text-sm text-green-600">{appliedPromo.description}</div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-green-600 hover:text-green-800"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={!promoCode.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Buttons */}
            <div className="space-y-3">
              <motion.button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
              </motion.button>
              
              <button
                onClick={onClose}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>

            {/* Security Badge */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CartPage
