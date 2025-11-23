'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import PhotoDisplay from '../../components/PhotoDisplay'
import { supabase } from '../../lib/supabase'

export default function Confirmation() {
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const router = useRouter()

  // Get stored data
  const meetingDate = typeof window !== 'undefined' ? localStorage.getItem('meetingDate') : null
  const wantsDate = typeof window !== 'undefined' ? localStorage.getItem('wantsDate') : null
  const foodChoice = typeof window !== 'undefined' ? localStorage.getItem('foodChoice') : null
  const timeChoice = typeof window !== 'undefined' ? localStorage.getItem('timeChoice') : null

  useEffect(() => {
    // Check if user completed all steps
    if (!meetingDate || !wantsDate || !foodChoice || !timeChoice) {
      router.push('/')
    }
  }, [meetingDate, wantsDate, foodChoice, timeChoice, router])

  const saveToSupabase = useCallback(async () => {
    if (!meetingDate || !foodChoice || !timeChoice) return

    setIsSaving(true)
    try {
      // Find the existing record and finalize it
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
          .update({
            food_choice: foodChoice as 'sushi' | 'pizza' | 'mexican',
            time_choice: timeChoice
          })
          .eq('id', existingRecord.id)
      }
      setIsSaved(true)
    } catch (error) {
      console.error('Error saving to Supabase:', error)
      // Continue anyway - the app works without Supabase
    } finally {
      setIsSaving(false)
    }
  }, [meetingDate, foodChoice, timeChoice])

  useEffect(() => {
    if (meetingDate && foodChoice && timeChoice && !isSaved) {
      saveToSupabase()
    }
  }, [meetingDate, foodChoice, timeChoice, isSaved, saveToSupabase])

  const handleFinish = async () => {
    await saveToSupabase()
  }

  const getFoodEmoji = (choice: string | null) => {
    switch (choice) {
      case 'sushi': return '🍱 Sushi'
      case 'pizza': return '🍕 Pizza'
      case 'mexican': return '🌮 Comida Mexicana'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 space-y-8">
        {/* Photo Section */}
        <div className="flex justify-center">
          <PhotoDisplay
            src="/feliz.jpg"
            alt="Foto feliz"
            fallbackText="Tu sonrisa 💕"
          />
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            Todo listo para el sábado 💕
          </h1>

          {/* Summary */}
          <div className="bg-gradient-to-br from-purple-100/80 via-pink-100/80 to-indigo-100/80 backdrop-blur-sm rounded-2xl p-6 space-y-3 shadow-sm border border-white/30">
            <h2 className="font-semibold text-gray-800 text-lg">Resumen de nuestra cita:</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <p>📅 <strong>Fecha:</strong> Sábado 29 de noviembre</p>
              <p>🕐 <strong>Hora:</strong> {timeChoice}</p>
              <p>🍽️ <strong>Comida:</strong> {getFoodEmoji(foodChoice)}</p>
              <p>💕 <strong>Nos conocimos el:</strong> viernes 27 de junio de 2025</p>
            </div>
          </div>

          {/* Spotify Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🎵 Canciones que me recuerdan a ti:
              </h3>
              <p className="text-gray-600 text-sm">
                Mientras tanto, disfruta esta playlist especial...
              </p>
            </div>

            <div className="space-y-4">
              {/* First Song Embed */}
              <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/30">
                <iframe
                  data-testid="embed-iframe"
                  style={{borderRadius: "12px"}}
                  src="https://open.spotify.com/embed/track/4u5xLMRN0dgKBFFN8FiNgv?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-2xl"
                />
              </div>

              {/* Second Song Embed - La Carretera */}
              <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/30">
                <iframe
                  data-testid="embed-iframe"
                  style={{borderRadius: "12px"}}
                  src="https://open.spotify.com/embed/track/2yvjjJrWzVzA2zg4VsoEmo?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-2xl"
                />
              </div>

              {/* Third Song Embed - La Plena */}
              <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/30">
                <iframe
                  data-testid="embed-iframe"
                  style={{borderRadius: "12px"}}
                  src="https://open.spotify.com/embed/track/6xOEgzkMSZJKz6qtCJsQL5?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Finish Button */}
          <button
            onClick={handleFinish}
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
          >
            {isSaving ? '💾 Guardando...' : '✨ Finalizar'}
          </button>

          {/* Final Message */}
          <div className="bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-indigo-100/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/30">
            <p className="text-xl font-semibold text-gray-800 text-center leading-relaxed">
              Todo listo para el sábado 😉<br/>
              Te contactaré brevemente.
            </p>
          </div>
        </div>

        {/* Status Message */}
        {isSaving && (
          <div className="text-center text-sm text-gray-600">
            Guardando tus preferencias... 💾
          </div>
        )}

        {isSaved && (
          <div className="text-center text-sm text-green-600">
            ¡Preferencias guardadas! ✨
          </div>
        )}

        {/* Memory Photos */}
        <div className="flex justify-center space-x-3 pt-6">
          <PhotoDisplay
            src="/feliz.jpg"
            alt="Foto feliz"
            className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50"
            width={80}
            height={80}
            fallbackText="Sonrisa hermosa"
          />
          <PhotoDisplay
            src="/especial.jpg"
            alt="Foto especial"
            className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-white/50"
            width={80}
            height={80}
            fallbackText="Momento especial"
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