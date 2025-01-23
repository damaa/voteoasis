import { createClient } from '@supabase/supabase-js'
import type { Tables } from './schema'

const supabaseUrl = "https://lccgaeojwzjjxdpkexai.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjY2dhZW9qd3pqanhkcGtleGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzU3MjMsImV4cCI6MjA1MzI1MTcyM30.fuDKHvjC06K9AfzSvSdp2e8QypqgLtptFnFAH3N5WX4"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Tables>(
  supabaseUrl,
  supabaseAnonKey
)