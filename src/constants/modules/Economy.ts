/**
 * REGLAS ECONÓMICAS (POLÍTICA MONETARIA Y TESORERÍA)
 * Estas constantes definen el flujo de valor y la sostenibilidad del Arquitecto.
 */
export const ECONOMIC_RULES = {
    // 1. PRECIOS BASE
    MIN_PRICE_WATT: 0.0001,
    HARDWARE_AMORTIZATION: 0.02,
    
    // 2. AMORTIGUACIÓN Y ELASTICIDAD
    TESLA_DAMPING: 0.01,
    K_OASIS: 0.08,

    // 3. TASAS DE LA DAO
    DAO_FEE_ELASTIC: {
        'GAMER': 0.01,      // 1%
        'ENTERPRISE': 0.05, // 5%
        'CACHE': 0.005      // 0.5%
    },

    // 4. INCENTIVOS
    BLACK_CIRCLE_MULTIPLIER: 1.618, 
    
    // 5. CRISTALOGRAFÍA
    HOLOGRAPHIC_RATIO: 1000, 
    FRACTAL_PACKING_EXPONENT: 2.5,

    // 6. TESORERÍA DEL ARQUITECTO (Canon Fundacional)
    // Dirección inmutable para royalties (1-5%)
    TREASURY_WALLET_BTC: "33zJ9jmWYWe6JmHuw8aHoJqKQGFqdz1qVE",
    
    // Referencia al Paper Económico para validación de modelo
    ECONOMIC_PAPER_DOI: "PENDING-OASIS-V6-ECONOMY" 
};
