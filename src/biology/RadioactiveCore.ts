import { PHYSICS } from '../constants/UniversalConstants';
import { GaussianDefense } from '../statistics/GaussianDefense'; // <--- ESTO ES NUEVO

export type NodeType = 'GAMER' | 'ENTERPRISE' | 'CACHE';

export class RadioactiveCore {

    /**
     * 1. ABSORCIÓN DE DOSIS (Ley de Potencias)
     * (Esto ya lo tenías, se mantiene igual)
     */
    static calculateAbsorbedDose(severity: number): number {
        return Math.pow(severity * 10, PHYSICS.DOSE_EXPONENT);
    }

    /**
     * 2. DECAIMIENTO RELATIVISTA (Marie Curie + Einstein)
     * (Esto ya lo tenías, se mantiene igual)
     */
    static decayRadiation(
        currentSieverts: number,
        wallClockSeconds: number,
        nodeType: NodeType,
        gammaFactor: number = 1.0
    ): number {
        let lambda = PHYSICS.LAMBDA_GAMER;
        if (nodeType === 'ENTERPRISE') lambda = PHYSICS.LAMBDA_ENTERPRISE;
        if (nodeType === 'CACHE') lambda = PHYSICS.LAMBDA_CACHE;

        const properTime = wallClockSeconds / gammaFactor;
        const decayFactor = Math.exp(-lambda * properTime);
        let newLevel = currentSieverts * decayFactor;

        if (newLevel < PHYSICS.H_OASIS) return 0;
        return newLevel;
    }

    /**
     * 3. LÍMITE FÍSICO (Hard Limit)
     * (Esto ya lo tenías)
     */
    static isLethal(sieverts: number): boolean {
        return sieverts >= PHYSICS.LETHAL_DOSE_SV;
    }

    /**
     * 4. JUICIO GAUSSIANO (NUEVO - v37.0)
     * Este es el "Cerebro Estadístico". Decide si aplicar el ban o perdonar.
     */
    static shouldBanNode(
        nodeRadiation: number,
        networkAvgRadiation: number,
        networkStdDev: number
    ): { banned: boolean, zScore: number, reason: string } {

        // A. Calculamos el Z-Score (Qué tan raro es este nodo)
        const z = GaussianDefense.calculateZScore(
            nodeRadiation,
            networkAvgRadiation,
            networkStdDev
        );

        // B. Lógica de "Perdón Contextual"
        // Solo baneamos si el nodo supera el límite LETAL...
        if (nodeRadiation > PHYSICS.LETHAL_DOSE_SV) {
            
            // ... Y ADEMÁS es una anomalía estadística (Z > 3.5).
            // Si Z es bajo, significa que todos están mal (ej. fallo global), así que perdonamos.
            if (GaussianDefense.isAnomaly(z)) {
                return { 
                    banned: true, 
                    zScore: z, 
                    reason: `ANOMALY_CONFIRMED (Z: ${z.toFixed(2)})` 
                };
            } else {
                return { 
                    banned: false, 
                    zScore: z, 
                    reason: "PARDONED_BY_CONTEXT" // El contexto te salva
                }; 
            }
        }

        // Si no supera el límite letal, está sano.
        return { banned: false, zScore: z, reason: "HEALTHY" };
    }
}
