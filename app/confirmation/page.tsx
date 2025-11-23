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
    <div className="min-h-screen animated-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/30 p-12 space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full -translate-y-16 -translate-x-16 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-indigo-200/20 to-purple-200/20 rounded-full translate-y-14 translate-x-14 blur-2xl"></div>
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
            Todo listo para el sábado 💕
          </h1>

          {/* Summary */}
          <div className="bg-gradient-to-br from-purple-100/90 via-pink-100/90 to-indigo-100/90 backdrop-blur-md rounded-3xl p-8 space-y-4 shadow-xl border border-white/40 relative z-10">
            <h2 className="font-bold text-gray-800 text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Resumen de nuestra cita:</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-800">Fecha</p>
                  <p className="text-gray-700">Sábado 29 de noviembre</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="font-semibold text-gray-800">Hora</p>
                  <p className="text-gray-700">{timeChoice}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <span className="text-2xl">{getFoodEmoji(foodChoice).split(' ')[0]}</span>
                <div>
                  <p className="font-semibold text-gray-800">Comida</p>
                  <p className="text-gray-700">{getFoodEmoji(foodChoice)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <span className="text-2xl">💕</span>
                <div>
                  <p className="font-semibold text-gray-800">Nos conocimos el</p>
                  <p className="text-gray-700">viernes 27 de junio de 2025</p>
                </div>
              </div>
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
            className="relative w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white py-6 px-12 rounded-3xl font-bold text-2xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.99] transition-all duration-500 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-2xl overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSaving ? '💾 Guardando...' : '✨ Finalizar'}
              {!isSaving && <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">💕</span>}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
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