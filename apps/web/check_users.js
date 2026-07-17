import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jekwvuswxblezasltdiv.supabase.co';
const supabaseKey = 'sb_publishable_HuE04WZq7eM3BxXVwJfQZw_jTkmJDaT';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
  const { data, error } = await supabase.from('users').select('*');
  console.log("Users:", data);
}

checkUsers();
