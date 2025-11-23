'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhotoDisplay from '../../components/PhotoDisplay'
import { createDateRequest } from '../../lib/supabase'

export default function DateQuestion() {
  const [showNoResponse, setShowNoResponse] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user came from the calendar page
    const meetingDate = localStorage.getItem('meetingDate')
    if (!meetingDate) {
      router.push('/')
    }
  }, [router])

  const handleYes = async () => {
    try {
      const meetingDate = localStorage.getItem('meetingDate')
      if (meetingDate) {
        await createDateRequest({
          meeting_date: meetingDate,
          wants_date: true
        })
      }
      localStorage.setItem('wantsDate', 'true')
      router.push('/food-choice')
    } catch (error) {
      console.error('Error saving response:', error)
      // Continue anyway - the app should work even without Supabase
      localStorage.setItem('wantsDate', 'true')
      router.push('/food-choice')
    }
  }

  const handleNo = () => {
    setShowNoResponse(true)
  }

  const handleBackToYes = () => {
    setShowNoResponse(false)
  }

  if (showNoResponse) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 space-y-8 text-center">
          {/* Photo Section */}
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              <div className="text-gray-500 text-sm">😢</div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Bueno... 💔
          </h1>

          <p className="text-gray-600">
            Yo no me rindo tan fácilmente y peor por ti.
          </p>

          <button
            onClick={handleBackToYes}
            className="w-full bg-white text-gray-800 py-4 px-8 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ¿Cambiaste de opinión? 😊
          </button>

          {/* Memory Photo */}
          <div className="flex justify-center pt-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-gray-500 text-xs text-center">Foto recuerdo</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 space-y-8">
        {/* Photo Section */}
        <div className="flex justify-center">
          <PhotoDisplay
            src="/foto-principal.jpg"
            alt="Tu foto principal"
            fallbackText="Tu foto aquí 💕"
          />
        </div>

        {/* Question */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">
            ¿Quieres salir conmigo? 💕
          </h1>
          <p className="text-gray-600">
            Este sábado 29 de noviembre
          </p>
          <p className="text-sm text-gray-500">
            Será una cita inolvidable ✨
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleYes}
            className="w-full bg-white text-gray-800 py-5 px-8 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ¡Sí! 😍
          </button>

          <button
            onClick={handleNo}
            className="w-full bg-white text-gray-800 py-5 px-8 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            No, gracias 🙁
          </button>
        </div>

        {/* Memory Photos */}
        <div className="flex justify-center space-x-2 pt-4">
          <PhotoDisplay
            src="/recuerdo-1.jpg"
            alt="Foto recuerdo 1"
            className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50"
            width={80}
            height={80}
            fallbackText="Recuerdo feliz"
          />
          <PhotoDisplay
            src="/juntos.jpg"
            alt="Foto juntos"
            className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50"
            width={80}
            height={80}
            fallbackText="Nosotros juntos"
          />
        </div>
      </div>
    </div>
  )
}