// Exemple de configuration Supabase
// Copiez ce fichier vers supabase.js et ajoutez vos clés

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase non configuré. Le tracking Supabase sera désactivé.');
  console.warn('   Ajoutez REACT_APP_SUPABASE_URL et REACT_APP_SUPABASE_ANON_KEY dans votre .env');
  export const supabase = null;
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Supabase configuré avec succès');
  }
}

