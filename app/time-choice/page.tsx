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
        <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-gray-200/20 to-slate-200/20 rounded-full -translate-y-14 -translate-x-14 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-slate-200/20 to-gray-200/20 rounded-full translate-y-16 translate-x-16 blur-2xl"></div>
        {/* Photo Section */}
        <div className="flex justify-center">
          <PhotoDisplay
            src="/tu-foto.jpeg"
            alt="Tu foto principal"
            fallbackText="Tu foto aquí"
          />
        </div>

        {/* Question */}
        <div className="text-center space-y-4 relative z-10">
          <h1 className="text-4xl font-bold text-gray-900">
            ¿A qué hora te viene mejor? 🕐
          </h1>
          
        </div>

        {/* Time Options */}
        <div className="grid grid-cols-2 gap-3">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedTime === time
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white/70 backdrop-blur-sm'
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
          className="w-full bg-white text-gray-800 py-3 px-6 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
        >
          Continuar
        </button>

        {/* Memory Photos */}
        <div className="flex justify-center space-x-2 pt-4">
          <PhotoDisplay
            src="/nosotros1.jpeg"
            alt="Foto de cita"
            className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            width={64}
            height={64}
            fallbackText="Cita"
          />
          <PhotoDisplay
            src="/nosotros2.jpeg"
            alt="Foto especial"
            className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            width={64}
            height={64}
            fallbackText="Momento"
          />
        </div>
      </div>
    </div>
  )
}