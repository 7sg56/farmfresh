import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ProductGrid = () => {
  const [visibleProducts, setVisibleProducts] = useState(20) // Changed from 10 to 20 (4 rows × 5 cards)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [toast, setToast] = useState(null)

  const handleAddToCart = (product, e) => {
    e.preventDefault() // Prevent form submission or button default
    setToast(`${product.name} added to cart!`)
    setTimeout(() => setToast(null), 1800)
    
    // Enhanced feedback with button animation
    const button = e.currentTarget
    button.style.transform = 'scale(0.95)'
    setTimeout(() => {
      button.style.transform = 'scale(1)'
    }, 150)
  }

  const allProducts = [
    { name: 'Organic Tomatoes', description: 'Vine ripened, locally grown', price: 3.99, category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=400', badge: 'Bestseller', badgeColor: 'bg-emerald-500' },
    { name: 'Fresh Carrots', description: 'Sweet & crunchy', price: 2.49, category: 'vegetables', image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?q=80&w=400' },
    { name: 'Honeycrisp Apples', description: 'Crispy & sweet', price: 4.99, category: 'fruits', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400', badge: 'Organic', badgeColor: 'bg-green-500' },
    { name: 'Baby Spinach', description: 'Fresh leafy greens', price: 3.49, category: 'leafy', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400' },
    { name: 'Ripe Avocados', description: 'Perfect for toast', price: 2.99, category: 'fruits', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400', badge: 'Limited', badgeColor: 'bg-amber-500' },
    { name: 'Bell Peppers', description: 'Colorful & crisp', price: 3.99, category: 'vegetables', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=400' },
    { name: 'Red Apples', description: 'Fresh & Crispy', price: 2.00, category: 'fruits', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Organic Carrots', description: 'Organic & Sweet', price: 1.50, category: 'vegetables', image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Cherry Tomatoes', description: 'Vine Ripened', price: 3.00, category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Bananas', description: 'Ripe & Sweet', price: 1.20, category: 'fruits', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Fresh Broccoli', description: 'Fresh & Green', price: 2.50, category: 'vegetables', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Naval Oranges', description: 'Juicy & Citrusy', price: 2.80, category: 'fruits', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Fresh Spinach', description: 'Leafy & Fresh', price: 1.80, category: 'leafy', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Mixed Bell Peppers', description: 'Colorful & Crisp', price: 2.20, category: 'vegetables', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Hass Avocado', description: 'Creamy & Ripe', price: 1.50, category: 'fruits', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'English Cucumber', description: 'Cool & Hydrating', price: 1.30, category: 'vegetables', image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Fresh Strawberries', description: 'Sweet & Juicy', price: 4.50, category: 'fruits', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Russet Potatoes', description: 'Versatile & Fresh', price: 0.80, category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Yellow Onions', description: 'Sharp & Flavorful', price: 1.10, category: 'vegetables', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Fresh Lemons', description: 'Tangy & Zesty', price: 0.50, category: 'fruits', image: 'https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Romaine Lettuce', description: 'Crisp & Green', price: 1.70, category: 'leafy', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Red Grapes', description: 'Sweet & Plump', price: 3.20, category: 'fruits', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Sweet Corn', description: 'Sweet & Fresh', price: 0.75, category: 'vegetables', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Fresh Cauliflower', description: 'White & Nutritious', price: 2.30, category: 'vegetables', image: 'https://images.unsplash.com/photo-1510627498534-cf7e9002facc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Green Zucchini', description: 'Garden Fresh', price: 1.90, category: 'vegetables', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Purple Eggplant', description: 'Purple & Fresh', price: 2.10, category: 'vegetables', image: 'https://images.unsplash.com/photo-1607305254515-bc400dea5e8a?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Fresh Asparagus', description: 'Spring Fresh', price: 3.50, category: 'vegetables', image: 'https://images.unsplash.com/photo-1590658806376-d90aeca9fe70?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Organic Kale', description: 'Superfood Green', price: 2.20, category: 'leafy', image: 'https://images.unsplash.com/photo-1608969090867-1b7cd94e2862?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Fresh Celery', description: 'Crisp & Healthy', price: 1.60, category: 'vegetables', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Button Mushrooms', description: 'Fresh & Earthy', price: 2.80, category: 'vegetables', image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Orange Sweet Potato', description: 'Orange & Sweet', price: 1.40, category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { name: 'Fresh Beets', description: 'Deep Red', price: 2.30, category: 'vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory)

  const ProductCard = ({ product, index }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.03 }}
      className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
      whileHover={{ y: -4 }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-semibold px-2 py-1 rounded-full shadow`}>
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 mb-1 text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <motion.button
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 flex items-center space-x-1 hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={e => handleAddToCart(product, e)}
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <section id="product-grid" className="py-8 bg-gradient-to-b from-emerald-50 via-white to-green-50 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-left">All Products</h2>
        
        {/* Grid with max 5 columns */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProducts.slice(0, visibleProducts).map((product, index) => (
              <ProductCard key={`${selectedCategory}-${product.name}`} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Load More */}
        {visibleProducts < filteredProducts.length && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setVisibleProducts(prev => Math.min(prev + 10, filteredProducts.length))}
              className="text-lg px-10 py-4 bg-white border-2 border-emerald-200 rounded-xl shadow-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all text-emerald-700 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              Load More Products
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              Showing {visibleProducts} of {filteredProducts.length} products
            </p>
          </motion.div>
        )}
      </div>
      
      {/* Enhanced Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center space-x-3 border-2 border-emerald-400"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <span className="font-medium">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProductGrid