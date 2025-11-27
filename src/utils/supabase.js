import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Supabase non configuré. Le tracking Supabase sera désactivé.');
    console.warn('   Ajoutez REACT_APP_SUPABASE_URL et REACT_APP_SUPABASE_ANON_KEY dans votre .env');
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Supabase configuré avec succès');
    console.log('   URL:', supabaseUrl);
  }
}

export { supabase };