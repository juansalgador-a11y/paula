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
    <div className="min-h-screen animated-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/30 p-12 space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full -translate-y-14 -translate-x-14 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-200/20 to-indigo-200/20 rounded-full translate-y-16 translate-x-16 blur-2xl"></div>
        {/* Photo Section */}
        <div className="flex justify-center">
          <PhotoDisplay
            src="/foto-principal.jpg"
            alt="Tu foto principal"
            fallbackText="Tu foto aquí 💕"
          />
        </div>

        {/* Question */}
        <div className="text-center space-y-6 relative z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            ¿Quieres salir conmigo? 💕
          </h1>
          <div className="space-y-3">
            <p className="text-lg text-gray-700 font-medium bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/40">
              Este sábado 29 de noviembre
            </p>
            <p className="text-sm text-gray-600 bg-gradient-to-r from-pink-50/50 to-purple-50/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
              (Antes de la fiesta del Carrera) ✨
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-5 relative z-10">
          <button
            onClick={handleYes}
            className="group relative w-full bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 py-6 px-10 rounded-3xl font-bold text-xl border-2 border-emerald-200/60 hover:border-emerald-400 hover:from-emerald-100 hover:to-green-100 transform hover:scale-[1.03] active:scale-[0.97] transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              ¡Sí! <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">😍</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-green-400/10 to-emerald-400/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>

          <button
            onClick={handleNo}
            className="group relative w-full bg-gradient-to-r from-rose-50 to-red-50 text-rose-800 py-6 px-10 rounded-3xl font-bold text-xl border-2 border-rose-200/60 hover:border-rose-400 hover:from-rose-100 hover:to-red-100 transform hover:scale-[1.03] active:scale-[0.97] transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              No, gracias <span className="text-2xl group-hover:-rotate-12 transition-transform duration-300">🙁</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-red-400/10 to-rose-400/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
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