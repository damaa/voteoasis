import { createClient } from '@supabase/supabase-js'
import type { Tables } from './schema'

export const supabase = createClient<Tables>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)