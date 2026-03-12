import { createClient } from '@supabase/supabase-js';

// Get environment variables - these are injected by Vite during build
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log environment variable status (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase URL configured:', Boolean(supabaseUrl));
  console.log('Supabase Key configured:', Boolean(supabaseAnonKey));
}

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUPABASE CONFIGURATION MISSING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Supabase environment variables are not configured.

TO FIX IN DEVELOPMENT:
   1. Copy .env.example to .env
   2. Add your Supabase credentials to .env
   3. Restart the dev server

TO FIX IN PRODUCTION (Vercel):
   1. Go to your Vercel project settings
   2. Navigate to Environment Variables
   3. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
   4. Redeploy the application

See .env.example for the required variables

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;

  console.error(errorMessage);

  // Throw error in production to prevent app from running without config
  if (import.meta.env.PROD) {
    throw new Error('Supabase configuration is required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }
}

// Create Supabase client
// Note: In development without env vars, this will create an invalid client
// The app will show appropriate errors when trying to use Supabase features
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};
