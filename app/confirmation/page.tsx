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

  const getFoodEmoji = (choice: string | null): string => {
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
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-slate-200/20 rounded-full -translate-y-16 -translate-x-16 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-slate-200/20 to-gray-200/20 rounded-full translate-y-14 translate-x-14 blur-2xl"></div>
        {/* Photo Section */}
        <div className="flex justify-center">
          <PhotoDisplay
            src="/tu-foto.jpeg"
            alt="Foto feliz"
            fallbackText="Tu foto"
          />
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Una invitación especial para una persona especial
          </h1>

          {/* Summary */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 space-y-4 shadow-lg border border-gray-200/50 relative z-10">
            <h2 className="font-bold text-gray-800 text-xl">Resumen:</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-800">Fecha</p>
                  <p className="text-gray-700">Sábado 29 de noviembre</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30">
                <span className="text-xl">🕐</span>
                <div>
                  <p className="font-semibold text-gray-800">Hora</p>
                  <p className="text-gray-700">{timeChoice}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30">
                <span className="text-xl">{getFoodEmoji(foodChoice).split(' ')[0]}</span>
                <div>
                  <p className="font-semibold text-gray-800">Comida</p>
                  <p className="text-gray-700">{getFoodEmoji(foodChoice)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30">
                <span className="text-xl">💕</span>
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
                Disfruta esta playlist...
              </p>
            </div>

            <div className="space-y-4">
              {/* First Song Embed */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200/30">
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
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200/30">
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
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200/30">
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
            className="w-full bg-white text-gray-800 py-4 px-8 rounded-2xl font-bold text-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
          >
            {isSaving ? 'Guardando...' : 'Finalizar'}
          </button>

          {/* Final Message */}
          <div className="bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-indigo-100/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/30">
            <p className="text-xl font-semibold text-gray-800 text-center leading-relaxed">
              Todo listo para el sábado.<br/>
              Te contactaré brevemente.
            </p>
          </div>
        </div>

        {/* Status Message */}
        {isSaving && (
          <div className="text-center text-sm text-gray-600">
            Guardando tus preferencias...
          </div>
        )}

        {isSaved && (
          <div className="text-center text-sm text-green-600">
            ¡Preferencias guardadas!
          </div>
        )}

        {/* Memory Photos */}
        <div className="flex justify-center space-x-3 pt-6">
          <PhotoDisplay
            src="/tu-foto.jpeg"
            alt="Foto feliz"
            className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            width={64}
            height={64}
            fallbackText="Foto"
          />
          <PhotoDisplay
            src="/nosotros1.jpeg"
            alt="Foto especial"
            className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            width={64}
            height={64}
            fallbackText="Momento"
          />
          <PhotoDisplay
            src="/nosotros2.jpeg"
            alt="Foto juntos"
            className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            width={64}
            height={64}
            fallbackText="Nosotros juntos"
          />
        </div>
      </div>
    </div>
  )
}