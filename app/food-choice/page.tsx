'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhotoDisplay from '../../components/PhotoDisplay'
import { supabase } from '../../lib/supabase'

const foodOptions = [
  {
    id: 'sushi',
    name: 'Sushi',
    emoji: '🍱'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    emoji: '🍕'
  },
  {
    id: 'mexican',
    name: 'Comida Mexicana',
    emoji: '🌮'
  }
] as const

export default function FoodChoice() {
  const [selectedFood, setSelectedFood] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Check if user came from the date question page
    const wantsDate = localStorage.getItem('wantsDate')
    if (!wantsDate) {
      router.push('/')
    }
  }, [router])

  const handleFoodSelect = (foodId: string) => {
    setSelectedFood(foodId)
  }

  const handleContinue = async () => {
    if (selectedFood) {
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
              .update({ food_choice: selectedFood })
              .eq('id', existingRecord.id)
          }
        }
      } catch (error) {
        console.error('Error updating food choice:', error)
        // Continue anyway
      }

      localStorage.setItem('foodChoice', selectedFood)
      router.push('/time-choice')
    }
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/30 p-12 space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-slate-200/20 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-slate-200/20 to-gray-200/20 rounded-full translate-y-14 -translate-x-14 blur-2xl"></div>
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
            ¿Qué te gustaría comer? 🍽️
          </h1>
          <p className="text-lg text-gray-700 font-medium bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/30">
            Elige tu comida favorita
          </p>
        </div>

        {/* Food Options */}
        <div className="space-y-3">
          {foodOptions.map((food) => (
            <button
              key={food.id}
              onClick={() => handleFoodSelect(food.id)}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left transform hover:scale-[1.02] ${
                selectedFood === food.id
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white/70 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{food.emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{food.name}</h3>
                </div>
                {selectedFood === food.id && (
                  <div className="ml-auto">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
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
          disabled={!selectedFood}
          className="w-full bg-white text-gray-800 py-3 px-6 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
        >
          Continuar
        </button>

        {/* Memory Photos */}
        <div className="flex justify-center space-x-2 pt-4">
          <PhotoDisplay
            src="/nosotros1.jpeg"
            alt="Foto de comida"
            className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            width={64}
            height={64}
            fallbackText="Comida"
          />
          <PhotoDisplay
            src="/nosotros2.jpeg"
            alt="Foto juntos"
            className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            width={64}
            height={64}
            fallbackText="Foto juntos"
          />
        </div>
      </div>
    </div>
  )
}