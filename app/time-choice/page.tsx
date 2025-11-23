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
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            ¿A qué hora te viene mejor? 🕐
          </h1>
          <p className="text-gray-600">
            Elige el horario perfecto para nuestra cita
          </p>
        </div>

        {/* Time Options */}
        <div className="grid grid-cols-2 gap-3">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedTime === time
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25/50 hover:shadow-md'
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
          className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
        >
          Continuar ⏰
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