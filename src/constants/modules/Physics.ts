/**
 * LEYES FÍSICAS INMUTABLES
 * Estas constantes definen la realidad del sistema. No se tocan.
 */
export const PHYSICAL_LAWS = {
    // 1. FUNDAMENTALES
    PHI: 1.618033988749,
    PHI_INV: 0.61803398875,
    PLANCK_OASIS: 0.001,

    // 2. GEOMETRÍA SAGRADA
    GOLDEN_ANGLE: Math.PI * (3 - Math.sqrt(5)),
    IRRATIONAL_SYNC_FACTOR: Math.SQRT2,
    SQRT_3: 1.73205080757,

    // 3. VELOCIDAD DE LA LUZ (Calibrada a Fibra Óptica)
    // 200 km/ms
    C_LIGHT_FIBER: 200.0, 

    // 4. TERMODINÁMICA
    STEFAN_BOLTZMANN: 5.67e-8,
    MAX_TEMP_KELVIN: 350,
    
    // 5. ABSOLUTO
    LANDAUER_CLASSIC_FACTOR: Math.log(2),
    LANDAUER_OASIS_FACTOR: Math.log(1.618033988749),
    ABSOLUTE_ZERO_ENTROPY: 0.0,
    PERFECT_CAP_SCORE: 1.0
};

/**
 * 🌌 OASIS PHYSICS CONSTANTS
 * Constantes fundamentales del universo digital.
 * Basado en: Relatividad, Termodinámica y Teoría de Cuerdas.
 */
export const Physics = {
  // Velocidad de la luz en fibra (aprox 200,000 km/s) con refracción
  C_OASIS: 200_000, 

  // Límite de Planck (Unidad mínima de tiempo/espacio en la red)
  PLANCK_TIME: 0.0001,

  // Entropía Máxima permitida antes del colapso del nodo
  MAX_ENTROPY: 0.99,

  // Constante de Gravedad de Datos (atracción hacia el centro)
  G_DATA: 9.81
};
