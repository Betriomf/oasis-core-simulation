import { PHYSICS } from '../constants/UniversalConstants';

export const Economy = {
    RAMSEY_FEES: {
        TIER_CONSUMER: 0.01,
        TIER_ENTERPRISE: 0.05,
        TIER_INSTITUTIONAL: 0.10,
        TIER_SURGE: 0.25
    }
};

export class EconomicEngine {

    /**
     * Calcula el peaje dinámico para DeFi (OneInch)
     * Devuelve un OBJETO completo, no solo un número.
     */
    static calculateDynamicToll(isVip: boolean) {
        const rate = isVip ? 0 : 0.01; // 1% si no es VIP
        return {
            rate: rate,
            reason: isVip ? "VIP_WAIVER" : "STANDARD_NETWORK_TOLL",
            treasury: PHYSICS.TREASURY_WALLET_BTC // Bóveda de destino
        };
    }

    /**
     * Calcula el precio de transacción (Alineado con simulate_life.ts)
     * Orden de argumentos corregido:
     * 1. duration (number)
     * 2. energyCost (number) <--- Aquí fallaba antes
     * 3. location (string)
     * 4. bandwidth (number)
     * 5. tier (string)
     * 6. load (number)
     */
    static calculateTransactionPrice(
        durationHours: number,
        energyCostKwh: number,
        location: string,
        bandwidthMbps: number,
        tier: string,
        networkLoad: number
    ) {
        // 1. Tarifa base
        let baseFee = Economy.RAMSEY_FEES.TIER_CONSUMER;
        if (tier === 'ENTERPRISE') baseFee = Economy.RAMSEY_FEES.TIER_ENTERPRISE;
        if (tier === 'INSTITUTIONAL') baseFee = Economy.RAMSEY_FEES.TIER_INSTITUTIONAL;

        // 2. Surge Pricing
        const isSurge = networkLoad > 0.90;
        if (isSurge) baseFee = Economy.RAMSEY_FEES.TIER_SURGE;

        // 3. Cálculo
        const energyConsumed = (bandwidthMbps / 100) * durationHours;
        const energyCostTotal = energyConsumed * energyCostKwh;
        
        const oasisFee = baseFee * durationHours;
        const nodeMargin = energyCostTotal * 0.20;
        
        const totalUserPays = energyCostTotal + oasisFee + nodeMargin;
        const nodeNet = totalUserPays - oasisFee - energyCostTotal;

        return {
            price: totalUserPays,
            metadata: {
                locationPrice: energyCostKwh,
                isSurge: isSurge,
                location: location
            },
            financials: {
                totalUserPays: totalUserPays,
                nodeNet: nodeNet,
                oasisRevenue: oasisFee,
                energyCost: energyCostTotal
            }
        };
    }
}
