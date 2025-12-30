import { Economy } from '../constants/modules/Economy';

/**
 * 💹 ECONOMIC ENGINE
 * Calcula el "Peaje de Protocolo" basándose en la física del mercado.
 */
export class EconomicEngine {

    /**
     * Aplica la Regla de Ramsey inversa:
     * "A mayor inelasticidad (urgencia), mayor peaje".
     */
    static calculateDynamicToll(isPremium: boolean) {
        // 1. MEDIR EL PULSO DEL MERCADO (Simulación)
        // Generamos un factor de "Pánico/Euforia" aleatorio
        const marketEntropy = Math.random(); 

        // 2. DECISIÓN DE TARIFA
        let appliedRate = 0;
        let reason = "STANDARD_OPERATING_PROCEDURE";

        if (marketEntropy > 0.9) {
            // Si el mercado está loco (90% entropía), subimos el precio (SURGE)
            appliedRate = Economy.RAMSEY_FEES.TIER_SURGE;
            reason = "HIGH_MARKET_VOLATILITY_SURGE";
        } else if (isPremium) {
            appliedRate = Economy.RAMSEY_FEES.TIER_ENTERPRISE;
            reason = "ENTERPRISE_AGREEMENT";
        } else {
            appliedRate = Economy.RAMSEY_FEES.TIER_CONSUMER;
            reason = "STANDARD_CONSUMER";
        }

        return {
            rate: appliedRate,
            reason: reason,
            treasury: Economy.TREASURY_WALLET
        };
    }
}
