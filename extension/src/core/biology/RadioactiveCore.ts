// NOTA: Importamos 'Physics' y lo renombramos a 'PHYSICS' para coincidir con tu lógica
import { Physics as PHYSICS } from '../constants/modules/Physics';
import { GaussianDefense } from '../statistics/GaussianDefense';

/**
 * TIPOS DE NODO (Taxonomía Expandida)
 */
export type NodeType = 'GAMER' | 'ENTERPRISE' | 'COMPUTE' | 'ARCHIVE' | 'CACHE';

/**
 * ☢️ RADIOACTIVE CORE (Nuclear Decay, Geometry & Stability)
 * Gestiona la vida media de la información y la toxicidad de los nodos.
 * Integra: Física Nuclear, Defensa Gaussiana y Geometría Sagrada (Triángulos).
 */
export class RadioactiveCore {

    // 🔥 CONSTANTE GEOMÉTRICA: La Estabilidad del Triángulo (Raíz de 3 ≈ 1.732)
    static readonly TRIANGULATION_FACTOR = Math.sqrt(3);

    /**
     * 1. ABSORCIÓN DE DOSIS (Ley de Potencias)
     * Convierte la severidad de una infracción en Sieverts (Radiación).
     */
    static calculateAbsorbedDose(severity: number): number {
        return Math.pow(severity * 10, PHYSICS.DOSE_EXPONENT);
    }

    /**
     * 2. DECAIMIENTO RELATIVISTA + ESTABILIDAD GEOMÉTRICA
     * Calcula cómo baja la radiación con el tiempo.
     * MEJORA: Si el nodo está triangulado (tiene 2 vecinos fuertes), resiste mejor.
     */
    static decayRadiation(
        currentSieverts: number,
        wallClockSeconds: number,
        nodeType: NodeType,
        gammaFactor: number = 1.0,
        isTriangulated: boolean = false // <--- NUEVO PARÁMETRO
    ): number {

        let lambda: number;

        // Definimos la velocidad de olvido según el tipo de hardware
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

        // 🔥 APLICAMOS LA GEOMETRÍA
        if (isTriangulated) {
            // La estructura triangular estabiliza el isótopo.
            // El nodo olvida la radiación (o retiene reputación) 1.73 veces más rápido/mejor.
            lambda = lambda / this.TRIANGULATION_FACTOR;
        }

        // Cálculo Relativista (Tiempo Propio vs Tiempo Coordinado)
        const properTime = wallClockSeconds / gammaFactor;
        const decayFactor = Math.exp(-lambda * properTime);
        let newLevel = currentSieverts * decayFactor;

        // Límite de Planck (Si es muy bajo, es cero)
        if (newLevel < PHYSICS.H_OASIS) return 0;
        
        return newLevel;
    }

    /**
     * 3. DIAGNÓSTICO TRIANGULADO (La Regla del 3)
     * Para confirmar toxicidad localmente, necesitamos 3 testigos.
     */
    static confirmToxicity(witnessReports: number[]): boolean {
        // Justicia Geométrica: Un punto es opinión, tres son verdad.
        if (witnessReports.length < 3) return false;

        const averageReport = witnessReports.reduce((a, b) => a + b, 0) / witnessReports.length;
        
        // Comprobamos si la media supera el límite físico
        return this.isLethal(averageReport);
    }

    /**
     * 4. LÍMITE FÍSICO BÁSICO
     */
    static isLethal(sieverts: number): boolean {
        return sieverts >= PHYSICS.LETHAL_DOSE_SV;
    }

    /**
     * 5. JUICIO GAUSSIANO (Contexto Global)
     * Incluso si es letal localmente, verificamos si es una anomalía global
     * o si toda la red está sufriendo radiación (falsos positivos masivos).
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

        if (this.isLethal(nodeRadiation)) {
            // Solo baneamos si es una anomalía estadística (Z-Score alto)
            // Si Z es bajo, significa que todos están radiactivos (ej. tormenta solar), así que perdonamos.
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
