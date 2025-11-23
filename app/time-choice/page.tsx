'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhotoDisplay from '../../components/PhotoDisplay'
import { supabase } from '../../lib/supabase'

const timeOptions = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
]

export default function TimeChoice() {
  const [selectedTime, setSelectedTime] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Check if user came from the food choice page
    const foodChoice = localStorage.getItem('foodChoice')
    if (!foodChoice) {
      router.push('/')
    }
  }, [router])

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleContinue = async () => {
    if (selectedTime) {
      try {
        const meetingDate = localStorage.getItem('meetingDate')
        if (meetingDate) {
          // Find the existing record and update it
          const { data: existingRecord } = await supabase
            .from('date_requests')
            .select('id')
            .eq('meeting_date', meetingDate)
            .eq('wants_date', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          if (existingRecord) {
            await supabase
              .from('date_requests')
              .update({ time_choice: selectedTime })
              .eq('id', existingRecord.id)
          }
        }
      } catch (error) {
        console.error('Error updating time choice:', error)
        // Continue anyway
      }

      localStorage.setItem('timeChoice', selectedTime)
      router.push('/confirmation')
    }
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/30 p-12 space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-y-14 -translate-x-14 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-indigo-200/20 to-purple-200/20 rounded-full translate-y-16 translate-x-16 blur-2xl"></div>
        {/* Photo Section */}
        <div className="flex justify-center">
          <PhotoDisplay
            src="/foto-principal.jpg"
            alt="Tu foto principal"
            fallbackText="Tu foto aquí 💕"
          />
        </div>

        {/* Question */}
        <div className="text-center space-y-4 relative z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            ¿A qué hora te viene mejor? 🕐
          </h1>
          <p className="text-lg text-gray-700 font-medium bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/40">
            Elige el horario perfecto para nuestra cita
          </p>
        </div>

        {/* Time Options */}
        <div className="grid grid-cols-2 gap-3">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`group relative p-6 rounded-3xl border-2 transition-all duration-500 transform hover:scale-110 overflow-hidden ${
                selectedTime === time
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 shadow-2xl ring-4 ring-blue-200/50'
                  : 'border-gray-200/60 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-25 hover:to-indigo-25 hover:shadow-xl bg-white/70 backdrop-blur-sm'
              }`}
            >
              <div className="text-center">
                <span className={`text-lg font-semibold ${
                  selectedTime === time ? 'text-blue-600' : 'text-gray-800'
                }`}>
                  {time}
                </span>
                {selectedTime === time && (
                  <div className="mt-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedTime}
          className="relative w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white py-5 px-10 rounded-3xl font-bold text-xl hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.99] transition-all duration-500 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-2xl overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Continuar
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">⏰</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>

        {/* Memory Photos */}
        <div className="flex justify-center space-x-2 pt-4">
          <PhotoDisplay
            src="/cita.jpg"
            alt="Foto de cita"
            className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50"
            width={80}
            height={80}
            fallbackText="Una cita perfecta"
          />
          <PhotoDisplay
            src="/especial.jpg"
            alt="Foto especial"
            className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50"
            width={80}
            height={80}
            fallbackText="Momento especial"
          />
        </div>
      </div>
    </div>
  )
}