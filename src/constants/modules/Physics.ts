/*
*
 * 🌌 OASIS PHYSICS CONSTANTS
 * "Las leyes inmutables que gobiernan la simulación."
 */
export const Physics = {
  // VELOCIDAD DE LA LUZ DIGITAL (km/s)
  C_OASIS: 200_000,

  // TIEMPO DE PLANCK (Mínima unidad temporal indivisible)
  PLANCK_TIME: 0.0001,

  // ENTROPÍA MÁXIMA (Muerte térmica del nodo)
  MAX_ENTROPY: 100,

  // CONSTANTE GRAVITACIONAL DE DATOS (Newton)
  G_DATA: 6.674e-11,

  // --- FÍSICA NUCLEAR (CURIE & BIOLOGÍA) ---
  
  // Exponente de castigo (Daño no lineal para ataques)
  DOSE_EXPONENT: 4.8,

  // Constantes de Decaimiento (Lambda = ln(2) / VidaMedia en horas)
  LAMBDA_GAMER: Math.log(2) / 72,       // 72 Horas (Vida media PC Gamer)
  LAMBDA_ENTERPRISE: Math.log(2) / 720, // 30 Días (Vida media Servidor)
  LAMBDA_CACHE: Math.log(2) / 1,        // 1 Hora (Vida media Cache)

  // Límite de Planck (Mínima reputación posible antes de ser considerada 0)
  H_OASIS: 0.001,

  // Dosis Letal (Sieverts acumulados para Baneo inmediato)
  LETHAL_DOSE_SV: 10.0
};
