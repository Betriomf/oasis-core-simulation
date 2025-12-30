export const Economy = {
    // ✅ TU TESORERÍA REAL (Donde cobras)
    TREASURY_WALLET: "0x009299bc092c2c571f4fad5623d82ab804f35755",

    // Mantenemos la de Bitcoin solo como referencia (Backup)
    BITCOIN_RESERVE: "33zJ9jmWYWe6JmHuw8aHoJqKQGFqdz1qVE",

    // Tarifas del Sistema (Regla de Ramsey)
    RAMSEY_FEES: {
        TIER_CONSUMER: 0.005,   // 0.5% (Usuario normal)
        TIER_ENTERPRISE: 0.002, // 0.2% (Usuario que comparte disco)
        TIER_INSTITUTIONAL: 0.001 // 0.1% (Socios)
    },

    MAX_TRANSACTION_LIMIT: 1000,
    MIN_GAS_RESERVE: 0.01 
};
