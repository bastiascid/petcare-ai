-- Script de Configuración para el Módulo CRM y Ventas (God Mode v2.0)
-- Ejecuta este script en el SQL Editor de tu Dashboard de Supabase.

-- 1. Crear tabla de Suscripciones (Ventas)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clinic_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    plan_name VARCHAR(50) NOT NULL,
    mrr_usd DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    start_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Crear tabla de Convenios / Alianzas (Partnerships)
CREATE TABLE IF NOT EXISTS public.partnerships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_name VARCHAR(255) NOT NULL,
    industry_type VARCHAR(100) NOT NULL,
    monthly_revenue_usd DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    contact_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilitar Seguridad a Nivel de Fila (RLS)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;

-- 4. Crear Políticas de Seguridad (Solo ADMIN puede ver y modificar)
-- Política para subscriptions
CREATE POLICY "Admins can manage subscriptions" ON public.subscriptions
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid() AND users.role = 'ADMIN'
        )
    );

-- Política para partnerships
CREATE POLICY "Admins can manage partnerships" ON public.partnerships
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid() AND users.role = 'ADMIN'
        )
    );

-- 5. Insertar datos de prueba para Ventas y Convenios (Opcional, para poblar el CRM)
INSERT INTO public.partnerships (partner_name, industry_type, monthly_revenue_usd, is_active)
VALUES 
    ('Royal Canin', 'Nutrición Animal', 500.00, true),
    ('Bayer Animal Health', 'Farmacéutica', 1200.00, true);
