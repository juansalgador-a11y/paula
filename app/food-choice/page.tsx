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
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-amber-200/20 to-orange-200/20 rounded-full translate-y-14 -translate-x-14 blur-2xl"></div>
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
            ¿Qué te gustaría comer? 🍽️
          </h1>
          <p className="text-lg text-gray-700 font-medium bg-gradient-to-r from-orange-50/50 to-yellow-50/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/40">
            Elige tu comida favorita para nuestra cita
          </p>
        </div>

        {/* Food Options */}
        <div className="space-y-3">
          {foodOptions.map((food) => (
            <button
              key={food.id}
              onClick={() => handleFoodSelect(food.id)}
              className={`group relative w-full p-8 rounded-3xl border-2 transition-all duration-500 text-left transform hover:scale-[1.02] overflow-hidden ${
                selectedFood === food.id
                  ? 'border-orange-500 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 shadow-2xl ring-4 ring-orange-200/50'
                  : 'border-gray-200/60 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-25 hover:to-yellow-25 hover:shadow-xl bg-white/70 backdrop-blur-sm'
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
          className="relative w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 text-white py-5 px-10 rounded-3xl font-bold text-xl hover:from-orange-600 hover:via-amber-600 hover:to-yellow-700 transform hover:scale-[1.02] active:scale-[0.99] transition-all duration-500 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-2xl overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Continuar
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🍽️</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
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