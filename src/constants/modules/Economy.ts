/**
 * 💰 OASIS ECONOMIC ENGINE (v36.0 - Dynamic Stability)
 * "Prices adapt to local physics. Entropy is local, not global."
 */

export const Economy = {
  // 1. IDENTIDAD FINANCIERA (Bóveda Fría)
  TREASURY_WALLET: "33zJ9jmWYWe6JmHuw8aHoJqKQGFqdz1qVE",

  // 2. FÍSICA LOCAL (El Suelo del Nodo)
  PHYSICAL_COSTS: {
    // YA NO ES FIJO. Depende de la realidad del usuario.
    // Si el usuario consigue luz gratis (solar), el mínimo es 0.01 para evitar spam.
    getLocalKwhPrice: (userInputCost: number) => Math.max(0.01, userInputCost),

    // Depreciación variable según el "Hierro" (Hardware)
    getHardwareDepreciation: (hardwareTier: 'LOW' | 'MED' | 'HIGH') => {
        switch(hardwareTier) {
            case 'HIGH': return 0.050; // H100/RTX4090 (Caro y delicado)
            case 'MED':  return 0.005; // PC Gamer estándar
            case 'LOW':  return 0.001; // Raspberry Pi / Móvil
            default:     return 0.002;
        }
    },

    MIN_PROFIT_MARGIN: 1.05 // +5% Supervivencia Biológica
  },

  // 3. PRECIOS DE RAMSEY (Estrategia de Mercado)
  RAMSEY_FEES: {
    TIER_CONSUMER: 0.01,   // 1% (Volumen)
    TIER_PRO: 0.05,        // 5% (Trabajo)
    TIER_ENTERPRISE: 0.20, // 20% (Privacidad)
    
    // 🚨 SURGE PRICING: Si la red está saturada (>90%), subimos precios
    // para frenar la demanda y atraer nuevos nodos urgentemente.
    TIER_SURGE: 0.50       
  },

  // 4. ECOSISTEMA
  BUILDER_REWARD: 0.30 // 30% del Fee para el creador de la App/Plugin
};
