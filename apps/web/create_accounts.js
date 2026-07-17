import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jekwvuswxblezasltdiv.supabase.co';
const supabaseKey = 'sb_publishable_HuE04WZq7eM3BxXVwJfQZw_jTkmJDaT';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAccounts() {
  console.log("Iniciando creacion de cuentas de prueba...");
  
  const accounts = [
    { email: 'dueno@test.com', pass: 'petcare123', name: 'Dueño Test', role: 'OWNER' },
    { email: 'clinica@test.com', pass: 'petcare123', name: 'Clinica Test', role: 'CLINIC' },
    { email: 'admin@test.com', pass: 'petcare123', name: 'Admin Test', role: 'ADMIN' }
  ];

  for (const acc of accounts) {
    console.log(`Creando ${acc.email}...`);
    const { data, error } = await supabase.auth.signUp({
      email: acc.email,
      password: acc.pass,
      options: {
        data: {
          full_name: acc.name,
          role: acc.role
        }
      }
    });

    if (error) {
      console.error(`Error creando ${acc.email}:`, error.message);
    } else {
      console.log(`Exito: ${acc.email} registrado en Auth.`);
      
      // Intentar insertar en public.users por si acaso el cliente de react no lo hizo antes
      if (data.user) {
        const { error: insertError } = await supabase.from('users').insert({
          auth_id: data.user.id,
          email: acc.email,
          full_name: acc.name,
          role: acc.role
        });
        if (insertError) {
          console.error(`Error insertando en public.users para ${acc.email}:`, insertError.message);
        } else {
          console.log(`Perfil publico creado para ${acc.email}`);
        }
      }
    }
  }
  console.log("Proceso terminado.");
}

createAccounts();
