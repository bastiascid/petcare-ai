-- Script para automatizar la creación de perfiles (Soluciona el problema de registro)
-- Ejecuta esto en el SQL Editor de tu panel de Supabase.

-- 1. Crear la función que se ejecutará automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (auth_id, email, name, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Usuario'),
    COALESCE(new.raw_user_meta_data->>'full_name', 'Usuario'),
    COALESCE(new.raw_user_meta_data->>'role', 'OWNER')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Crear el trigger que llama a la función cada vez que alguien se registra
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
