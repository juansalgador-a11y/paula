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
            ¿Qué te gustaría comer? 🍽️
          </h1>
          <p className="text-gray-600">
            Elige tu comida favorita para nuestra cita
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
                  ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg ring-2 ring-orange-200'
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25/50 hover:shadow-md'
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
          className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-orange-600 hover:via-amber-600 hover:to-yellow-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
        >
          Continuar 🍽️
        </button>

        {/* Memory Photos */}
        <div className="flex justify-center space-x-2 pt-4">
          <PhotoDisplay
            src="/comida.jpg"
            alt="Foto de comida"
            className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50"
            width={80}
            height={80}
            fallbackText="Comida deliciosa"
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