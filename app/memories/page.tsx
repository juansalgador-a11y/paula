'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import PhotoDisplay from '../../components/PhotoDisplay'

const memories = [
  { src: '/nosotros1.jpeg', alt: 'Recuerdo 1' },
  { src: '/nosotros2.jpeg', alt: 'Recuerdo 2' }
]

export default function Memories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [showContinue, setShowContinue] = useState(false)
  const router = useRouter()
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const meetingDate = localStorage.getItem('meetingDate')
    if (!meetingDate) {
      router.push('/')
      return
    }

    // Auto-advance every 4 seconds
    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [currentIndex, router])

  useEffect(() => {
    if (currentIndex === memories.length - 1) {
      setShowContinue(true)
    } else {
      setShowContinue(false)
    }
  }, [currentIndex])

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length)
  }

  const handleContinue = () => {
    router.push('/date-question')
  }

  const slideStyle = {
    transform: `translateX(-${currentIndex * 100}%)`,
    transition: 'transform 0.5s ease-in-out'
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Slider Container */}
      <div
        className="flex h-screen w-full"
        style={slideStyle as React.CSSProperties}
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {memories.map((memory, index) => (
          <div key={index} className="flex-shrink-0 w-full h-screen relative">
            <PhotoDisplay
              src={memory.src}
              alt={memory.alt}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              fallbackText="Recuerdo especial 💕"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white text-center drop-shadow-lg max-w-4xl">
                Unos recuerdos 💕
              </h1>
            </div>
            {/* Indicators */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {memories.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      {showContinue && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={handleContinue}
            className="bg-white/90 text-black px-8 py-4 rounded-full font-bold text-xl backdrop-blur-sm shadow-2xl hover:bg-white transition-all duration-300"
          >
            Continuar ✨
          </button>
        </div>
      )}
    </div>
  )
}
