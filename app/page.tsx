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
        router.push('/date-question')
      } else {
        alert('💝 Fecha incorrecta. Recuerda cuando nos conocimos... intenta de nuevo 💕')
      }
    }
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

        {/* Welcome Text */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Hola princesa  💕
          </h1>

          {/* Explanation */}
          <div className="bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto border border-white/30 shadow-sm">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Esta página es especial, solo tú puedes acceder.
              Para continuar, necesito que me recuerdes <strong>exactamente</strong> el día que nos conocimos...
            </p>
          </div>

          {/* Hint Button */}
          <button
            onClick={() => alert('💡 Pista: Fue en junio de 2025, y era un día muy especial... 😊')}
            className="text-sm text-gray-500 hover:text-gray-700 underline decoration-dotted underline-offset-2 transition-colors"
          >
            ¿Necesitas una pista? ✨
          </button>

          <p className="text-gray-600 text-sm">
            Selecciona la fecha en el calendario
          </p>
        </div>

        {/* Date Picker */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 text-center">
            ¿Cuándo nos conocimos? 📅
          </label>
          <div className="flex justify-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 text-center text-lg bg-gray-50/50 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400"
              placeholderText="Selecciona la fecha"
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedDate}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
        >
          Continuar ✨
        </button>

        {/* Memory Photos */}
        <div className="flex justify-center space-x-2 pt-4">
          <PhotoDisplay
            src="/recuerdo-1.jpg"
            alt="Foto recuerdo 1"
            className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50"
            width={80}
            height={80}
            fallbackText="Recuerdo especial"
          />
          <PhotoDisplay
            src="/recuerdo-2.jpg"
            alt="Foto recuerdo 2"
            className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50"
            width={80}
            height={80}
            fallbackText="Otro recuerdo"
          />
        </div>
      </div>
    </div>
  )
}