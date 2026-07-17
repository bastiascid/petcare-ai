import { GoogleGenerativeAI } from '@google/generative-ai';

// Instanciar el cliente usando la clave de entorno.
// Hacemos fallback a 'mock-key' para evitar cuelgues si no está configurada,
// pero avisaremos si no hay llave.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'mock-key';
const genAI = new GoogleGenerativeAI(apiKey);

export type UrgencyLevel = 'GREEN' | 'YELLOW' | 'RED';

export interface TriageResult {
  urgency: UrgencyLevel;
  analysis: string;
  recommendation: string;
}

/**
 * Función B2C: Triaje para dueños de mascotas
 */
export async function analyzeTriage(species: string, breed: string, symptoms: string): Promise<TriageResult> {
  if (apiKey === 'mock-key' || apiKey === 'tu-api-key-de-google-studio-aqui') {
    // Si no hay API Key real, hacemos una simulación para no romper el flujo
    return new Promise((resolve) => setTimeout(() => resolve({
      urgency: 'YELLOW',
      analysis: 'Se detecta un posible problema gastrointestinal moderado, común en su especie.',
      recommendation: 'Te sugerimos agendar una cita para revisión médica si los síntomas persisten por más de 24 horas.'
    }), 1500));
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Eres un veterinario experto en triaje. Un dueño te describe los síntomas de su mascota.
      Debes evaluar la urgencia y dar una recomendación clara.
      
      Mascota: ${species} (Raza: ${breed || 'No especificada'})
      Síntomas reportados: "${symptoms}"

      Devuelve TU RESPUESTA EXCLUSIVAMENTE en formato JSON válido, con las siguientes claves:
      - "urgency": "GREEN" (rutina/leve), "YELLOW" (precaución/agendar pronto), "RED" (emergencia/ir ahora).
      - "analysis": "Breve explicación clínica amigable para el dueño de por qué tiene esa urgencia (máximo 2 oraciones)".
      - "recommendation": "Acción recomendada para el dueño (ej. Agenda una cita, llévalo a emergencias)".
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extraer JSON en caso de que Gemini añada texto extra (ej: ```json ... ```)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Formato de IA inválido");

    const parsed = JSON.parse(jsonMatch[0]) as TriageResult;
    return parsed;
  } catch (error) {
    console.error("Error en Triaje AI:", error);
    throw error;
  }
}

/**
 * Función B2B: Asistente de Diagnóstico para Médicos
 */
export async function suggestDiagnosis(species: string, symptoms: string, historySummary: string): Promise<string> {
  if (apiKey === 'mock-key' || apiKey === 'tu-api-key-de-google-studio-aqui') {
    return new Promise((resolve) => setTimeout(() => resolve(
      "🐾 *Sugerencia AI (Modo Prueba)*:\n- Posible Gastroenteritis aguda.\n- Se sugiere realizar hemograma y perfil bioquímico.\n- Tratamiento empírico: antieméticos y dieta blanda."
    ), 1500));
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Eres un Asistente Clínico de Inteligencia Artificial para un Médico Veterinario.
      Basándote en los datos del paciente, sugiere posibles diagnósticos diferenciales (ordenados por probabilidad) y recomendaciones de exámenes o tratamientos.
      Sé muy profesional, conciso y técnico. Usa formato Markdown.
      
      Especie: ${species}
      Síntomas Actuales: "${symptoms}"
      Resumen del Historial: "${historySummary || 'Sin historial relevante'}"
      
      Estructura tu respuesta en 3 partes:
      1. Diagnósticos Diferenciales
      2. Plan Diagnóstico (Exámenes sugeridos)
      3. Sugerencia de Tratamiento Inicial
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en Diagnóstico AI:", error);
    throw error;
  }
}
