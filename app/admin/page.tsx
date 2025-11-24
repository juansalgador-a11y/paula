'use client'

import { useState, useEffect } from 'react'
import { supabase, DateRequest } from '../../lib/supabase'

export default function AdminDashboard() {
  const [responses, setResponses] = useState<DateRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResponses()
  }, [])

  const fetchResponses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('date_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setResponses(data || [])
    } catch (err) {
      console.error('Error fetching responses:', err)
      setError('Error al cargar las respuestas')
    } finally {
      setLoading(false)
    }
  }

  const getFoodEmoji = (choice: string) => {
    switch (choice) {
      case 'sushi': return '🍱 Sushi'
      case 'pizza': return '🍕 Pizza'
      case 'mexican': return '🌮 Comida Mexicana'
      default: return choice || 'No especificado'
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No especificada'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const formatCreatedAt = (dateString: string) => {
    if (!dateString) return 'No especificada'
    try {
      const date = new Date(dateString)
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando respuestas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">❌ {error}</div>
          <button
            onClick={fetchResponses}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📊 Dashboard de Respuestas
          </h1>
          <p className="text-gray-600">
            Todas las respuestas recibidas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-indigo-600">{responses.length}</div>
            <div className="text-gray-600">Total de respuestas</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-green-600">
              {responses.filter(r => r.wants_date).length}
            </div>
            <div className="text-gray-600">Dijeron SÍ</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-orange-600">
              {responses.filter(r => r.food_choice).length}
            </div>
            <div className="text-gray-600">Comida elegida</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-purple-600">
              {responses.filter(r => r.time_choice).length}
            </div>
            <div className="text-gray-600">Hora elegida</div>
          </div>
        </div>

        {/* Responses List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Respuestas Recibidas</h2>
          </div>

          {responses.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">💭</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aún no hay respuestas</h3>
              <p className="text-gray-500">Las respuestas aparecerán aquí cuando alguien complete el formulario.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha/Hora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nos conocimos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ¿Quiere cita?
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comida
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spotify
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {responses.map((response) => (
                    <tr key={response.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCreatedAt(response.created_at || '')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(response.meeting_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          response.wants_date
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {response.wants_date ? '✅ Sí' : '❌ No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {response.food_choice ? getFoodEmoji(response.food_choice) : 'No especificada'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {response.time_choice || 'No especificada'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {response.spotify_link ? (
                          <a
                            href={response.spotify_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 underline"
                          >
                            🎵 Escuchar
                          </a>
                        ) : (
                          'No especificada'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchResponses}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            🔄 Actualizar respuestas
          </button>
        </div>
      </div>
    </div>
  )
}