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
    <div className="min-h-screen animated-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/30 p-12 space-y-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full translate-y-12 -translate-x-12 blur-2xl"></div>
        {/* Photo Section */}
        <div className="flex justify-center">
          <PhotoDisplay
            src="/foto-principal.jpg"
            alt="Tu foto principal"
            fallbackText="Tu foto aquí 💕"
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center space-y-6 relative z-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Hola princesa  💕
          </h1>

          {/* Explanation */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-md rounded-3xl p-8 max-w-sm mx-auto border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Esta página es especial, solo tú puedes acceder.
              Para continuar, necesito que me recuerdes <strong className="text-indigo-600">exactamente</strong> el día que nos conocimos...
            </p>
          </div>

          {/* Hint Button */}
          <button
            onClick={() => alert('💡 Pista: Fue en junio de 2025, y era un día muy especial... 😊')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 bg-indigo-50/50 hover:bg-indigo-100/50 rounded-full transition-all duration-300 backdrop-blur-sm border border-indigo-200/30 hover:border-indigo-300/50"
          >
            <span className="text-lg">💡</span>
            ¿Necesitas una pista?
            <span className="text-lg">✨</span>
          </button>

          <p className="text-gray-600 text-sm font-medium bg-gray-50/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/30">
            Selecciona la fecha en el calendario
          </p>
        </div>

        {/* Date Picker */}
        <div className="space-y-5">
          <label className="block text-lg font-semibold text-gray-800 text-center bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
            ¿Cuándo nos conocimos? 📅
          </label>
          <div className="flex justify-center">
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="w-full px-8 py-5 text-lg text-center bg-white/70 backdrop-blur-md border-2 border-gray-200/50 rounded-3xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 hover:border-gray-300 transition-all duration-300 placeholder:text-gray-400 shadow-lg hover:shadow-xl"
                placeholderText="Selecciona la fecha"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedDate}
          className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 px-10 rounded-3xl font-bold text-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-[1.02] active:scale-[0.99] transition-all duration-500 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-2xl overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Continuar
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">✨</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>

        {/* Memory Photos */}
        <div className="flex justify-center space-x-4 pt-8">
          <div className="group relative">
            <PhotoDisplay
              src="/recuerdo-1.jpg"
              alt="Foto recuerdo 1"
              className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-white/60 hover:border-white/80 transform hover:scale-110 hover:rotate-2"
              width={96}
              height={96}
              fallbackText="Recuerdo especial"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
          </div>
          <div className="group relative">
            <PhotoDisplay
              src="/recuerdo-2.jpg"
              alt="Foto recuerdo 2"
              className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-white/60 hover:border-white/80 transform hover:scale-110 hover:-rotate-2"
              width={96}
              height={96}
              fallbackText="Otro recuerdo"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  )
}