// NOTA: Importamos 'Physics' y lo renombramos a 'PHYSICS' para que coincida con tu lógica
import { Physics as PHYSICS } from '../constants/modules/Physics';
import { GaussianDefense } from '../statistics/GaussianDefense';

/**
 * TIPOS DE NODO (Taxonomía Expandida)
 */
export type NodeType = 'GAMER' | 'ENTERPRISE' | 'COMPUTE' | 'ARCHIVE' | 'CACHE';

export class RadioactiveCore {

    /**
     * 1. ABSORCIÓN DE DOSIS (Ley de Potencias)
     */
    static calculateAbsorbedDose(severity: number): number {
        return Math.pow(severity * 10, PHYSICS.DOSE_EXPONENT);
    }

    /**
     * 2. DECAIMIENTO RELATIVISTA
     */
    static decayRadiation(
        currentSieverts: number,
        wallClockSeconds: number,
        nodeType: NodeType,
        gammaFactor: number = 1.0
    ): number {
        
        let lambda: number;

        switch (nodeType) {
            case 'ENTERPRISE':
            case 'ARCHIVE': 
            case 'COMPUTE': 
                lambda = PHYSICS.LAMBDA_ENTERPRISE; 
                break;
            case 'CACHE':
                lambda = PHYSICS.LAMBDA_CACHE; 
                break;
            case 'GAMER':
            default:
                lambda = PHYSICS.LAMBDA_GAMER; 
                break;
        }

        const properTime = wallClockSeconds / gammaFactor;
        const decayFactor = Math.exp(-lambda * properTime);
        let newLevel = currentSieverts * decayFactor;

        if (newLevel < PHYSICS.H_OASIS) return 0;
        return newLevel;
    }

    /**
     * 3. LÍMITE FÍSICO
     */
    static isLethal(sieverts: number): boolean {
        return sieverts >= PHYSICS.LETHAL_DOSE_SV;
    }

    /**
     * 4. JUICIO GAUSSIANO
     */
    static shouldBanNode(
        nodeRadiation: number,
        networkAvgRadiation: number,
        networkStdDev: number
    ): { banned: boolean, zScore: number, reason: string } {

        const z = GaussianDefense.calculateZScore(
            nodeRadiation,
            networkAvgRadiation,
            networkStdDev
        );

        if (nodeRadiation > PHYSICS.LETHAL_DOSE_SV) {
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
                    reason: "PARDONED_BY_CONTEXT (Global Radiation Spike)" 
                };
            }
        }
        return { banned: false, zScore: z, reason: "HEALTHY" };
    }
}
