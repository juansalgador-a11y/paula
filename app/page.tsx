'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import PhotoDisplay from '../components/PhotoDisplay'

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toISOString().split('T')[0] // YYYY-MM-DD format
      const requiredDate = '2025-06-27' // 27/06/2025 in YYYY-MM-DD format

      if (selectedDateString === requiredDate) {
        // Store the meeting date and navigate to next step
        localStorage.setItem('meetingDate', selectedDateString)
        router.push('/memories')
      } else {
        alert('💝 Fecha incorrecta. Recuerda cuando nos conocimos... intenta de nuevo 💕')
      }
    }
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/30 p-12 space-y-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-200/20 to-gray-200/20 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-200/20 to-slate-200/20 rounded-full translate-y-12 -translate-x-12 blur-2xl"></div>
        {/* Photo Section */}
        <div className="flex justify-center">
          <PhotoDisplay
            src="/tu-foto.jpeg"
            alt="Tu foto principal"
            fallbackText="Tu foto aquí 💕"
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Hola princesa  💕
          </h1>

          {/* Hint Button */}
          <button
            onClick={() => alert('💡 Pista: Fue en junio de 2025, y era un día muy especial... 😊')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 bg-white/70 hover:bg-gray-50/70 rounded-full transition-all duration-300 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/50"
          >
            <span className="text-lg">💡</span>
            ¿Necesitas una pista?
            <span className="text-lg">✨</span>
          </button>

          {/* Explanation */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto border border-gray-200/50 shadow-sm">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Esta página es especial, solo tú puedes acceder.
              Para continuar, necesito que me recuerdes <strong className="text-gray-900">exactamente</strong> el día que nos conocimos...
            </p>
          </div>
        </div>

        {/* Date Picker */}
        <div className="space-y-8 mt-8">
          <label className="block text-lg font-semibold text-gray-800 text-center bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
            ¿Cuándo nos conocimos? 📅
          </label>
          <div className="flex justify-center px-4 py-6">
            <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="relative z-10 w-full px-6 py-4 text-lg text-center bg-white/70 backdrop-blur-md border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-gray-300 focus:border-gray-400 hover:border-gray-300 transition-all duration-300 placeholder:text-gray-400 shadow-lg hover:shadow-xl"
              placeholderText="Selecciona la fecha"
              popperClassName="z-[10000]"
              calendarClassName="z-[10000] rounded-2xl bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-2xl"
            />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedDate}
          className="w-full bg-white text-gray-800 py-3 px-6 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
        >
          Continuar ✨
        </button>
      </div>
    </div>
  )
}