import React from 'react'
import { motion } from 'framer-motion'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Verified Customer',
      avatar: 'SM',
      bgColor: 'bg-green-500',
      review: "The freshest vegetables I've ever ordered online! Delivered the same day and everything was perfect. Will definitely order again."
    },
    {
      name: 'Mike J.',
      role: 'Verified Customer', 
      avatar: 'MJ',
      bgColor: 'bg-blue-500',
      review: "Amazing quality and the farmers are so passionate about their work. You can really taste the difference in every bite!"
    },
    {
      name: 'Anna L.',
      role: 'Verified Customer',
      avatar: 'AL', 
      bgColor: 'bg-purple-500',
      review: "Love the convenience and quality. As a busy mom, this saves me so much time and my family loves the fresh taste!"
    }
  ]

  const StarRating = () => (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )

  return (
    <div className="mt-16">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
        <p className="text-gray-600">Real reviews from real customers</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-4">
              <StarRating />
            </div>
            <p className="text-gray-700 mb-4">"{testimonial.review}"</p>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                {testimonial.avatar}
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                <div className="text-gray-500 text-xs">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
