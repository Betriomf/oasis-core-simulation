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
