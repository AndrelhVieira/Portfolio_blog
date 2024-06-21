'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TechTitle = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const titleOptions = ['Frontend', 'React', 'Full Stack', 'Curious', 'Designer']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titleOptions.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.p
      className="font-jost text-4xl font-extrabold uppercase leading-snug sm:text-5xl md:text-7xl lg:text-9xl"
      key={currentTitleIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {titleOptions[currentTitleIndex]}
    </motion.p>
  )
}

export default TechTitle
