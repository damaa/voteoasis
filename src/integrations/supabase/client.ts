// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lccgaeojwzjjxdpkexai.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjY2dhZW9qd3pqanhkcGtleGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzU3MjMsImV4cCI6MjA1MzI1MTcyM30.fuDKHvjC06K9AfzSvSdp2e8QypqgLtptFnFAH3N5WX4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);