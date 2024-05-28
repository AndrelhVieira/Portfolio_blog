'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AboutPage = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to my personal about page
    router.replace('/about/andrevieira')
  }, [])

  return null
}

export default AboutPage
