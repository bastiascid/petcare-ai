import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jekwvuswxblezasltdiv.supabase.co';
const supabaseKey = 'sb_publishable_HuE04WZq7eM3BxXVwJfQZw_jTkmJDaT';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const email = 'admin@petcare.com';
  const password = 'adminpassword2026';
  
  // 1. Registrar
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  });

  if (authError) {
    console.error("Auth error:", authError.message);
    if (!authError.message.includes('already registered')) return;
  }

  // 2. Intentar actualizar a ADMIN
  const { data: updateData, error: updateError } = await supabase
    .from('users')
    .update({ role: 'ADMIN' })
    .eq('email', email)
    .select();

  if (updateError) {
    console.error("Update error:", updateError);
  } else {
    console.log("Admin account updated!", updateData);
  }
}

createAdmin();
