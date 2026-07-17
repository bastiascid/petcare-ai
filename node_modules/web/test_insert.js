import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jekwvuswxblezasltdiv.supabase.co';
const supabaseKey = 'sb_publishable_HuE04WZq7eM3BxXVwJfQZw_jTkmJDaT';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSignup() {
  const email = `test${Date.now()}@test.com`;
  console.log("Signing up", email);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'password123',
  });

  if (error) {
    console.error("SignUp error:", error.message);
    return;
  }

  console.log("User signed up:", data.user?.id);
  
  const { error: insertError, data: insertData } = await supabase.from('users').insert({
    auth_id: data.user.id,
    email: data.user.email,
    full_name: 'Test Name',
    role: 'CLINIC'
  }).select();

  if (insertError) {
    console.error("Insert error:", insertError);
  } else {
    console.log("Insert success:", insertData);
  }
}

testSignup();
