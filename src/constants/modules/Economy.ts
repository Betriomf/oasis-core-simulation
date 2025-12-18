/**
 * 💰 OASIS ECONOMIC CONSTANTS (v2.0 - Thermodynamic Equilibrium)
 * "Energy cannot be created or destroyed, only exchanged efficiently."
 */

export const Economy = {
  // 1. IDENTIDAD FINANCIERA & TESORERÍA
  TREASURY_WALLET: "33zJ9jmWYWe6JmHuw8aHoJqKQGFqdz1qVE",

  // 2. MODELO DE NEGOCIO DEL ARQUITECTO (Precios de Ramsey)
  // Cobramos según la elasticidad de la demanda (urgencia del cliente).
  LICENSING_FEES: {
    CONSUMER_TIER: 0.01,   // 1% para Gamers/Usuarios (Demanda Elástica)
    ENTERPRISE_TIER: 0.05, // 5% para Hospitales/Bancos (Demanda Inelástica)
    ARCHITECT_MIN_FEE: 0.001 // Mínimo absoluto para cubrir costes de entropía
  },

  // 3. ECONOMÍA DEL COLABORADOR (Proof-of-Code)
  // Incentiva la calidad sobre la cantidad usando reputación (SBT).
  BOUNTY_SPLIT: {
    DEV_BASE_SHARE: 0.90,     // 90% Base (Energía Cinética)
    ARCHITECT_MGMT: 0.10,     // 10% Gestión (Reducción Entropía)
    SBT_MULTIPLIER: 1.25,     // Bonus x1.25 para Devs L2/L3 (Alta Reputación)
    VIBRATION_BONUS: 0.05     // +5% extra si el código pasa tests a la primera (Clean Code)
  },

  // 4. MERCADO DE RECURSOS (GPU/RAM) - MODELO P = CM
  // El precio tiende al Coste Marginal + Amortización.
  RESOURCE_EXCHANGE: {
    BASE_KWH_PRICE: 0.15,        // Coste eléctrico promedio global ($/kWh)
    HARDWARE_DEPRECIATION: 0.02, // Desgaste de hardware ($/h)
    
    // Factor de Escasez: Si la red está saturada (>90%), el precio sube.
    SCARCITY_MULTIPLIER: (networkLoad: number) => networkLoad > 0.9 ? 1.5 : 1.0,

    // Alquiler de Memoria (Hipocampo)
    RAM_PRICE_PER_GB_HOUR: 0.004,
  },

  // 5. SOSTENIBILIDAD & DEFENSA (Anti-Fraude)
  SECURITY: {
    MIN_STAKE_VALIDATOR: 100, // SPN necesarios para operar nodo
    SLASHING_PENALTY: 0.50,   // Quema del 50% si hay fraude
    ENTROPY_TAX: 2.0,         // Doble coste para datos "sucios"
  },

  // 6. CRECIMIENTO (Inflationary Boost)
  GROWTH: {
    RESEARCH_GRANT: 0.05,     // 5% constitucional a I+D
    REFERRAL_BONUS: 0.02      // 2% de por vida por traer nodos
  }
};
