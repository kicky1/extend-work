import { createClient } from '@supabase/supabase-js'

// Service role client for admin operations (bypasses RLS)
// Only use server-side for operations requiring elevated privileges
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
