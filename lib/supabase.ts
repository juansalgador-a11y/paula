import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Type alias for our date request
export type DateRequest = Database['public']['Tables']['date_requests']['Row']
export type DateRequestInsert = Database['public']['Tables']['date_requests']['Insert']
export type DateRequestUpdate = Database['public']['Tables']['date_requests']['Update']

export const createDateRequest = async (data: DateRequestInsert) => {
  const { data: result, error } = await supabase
    .from('date_requests')
    .insert([data])
    .select()

  if (error) throw error
  return result[0] as DateRequest
}

export const updateDateRequest = async (id: string, data: DateRequestUpdate) => {
  const { data: result, error } = await supabase
    .from('date_requests')
    .update(data)
    .eq('id', id)
    .select()

  if (error) throw error
  return result[0] as DateRequest
}