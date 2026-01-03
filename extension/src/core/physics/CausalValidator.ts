import { PHYSICS } from '../constants/UniversalConstants';

/**
 * CAUSAL VALIDATOR (Relatividad General v10.0)
 * Integra el Cono de Luz de Minkowski con la Dilatación Temporal de Kerr.
 */
export class CausalValidator {

    /**
     * CÁLCULO DE DILATACIÓN TEMPORAL (Factor de Lorentz Gravitatorio)
     * Si un nodo tiene mucha carga (Masa de Datos), el tiempo local se ralentiza.
     * t' = t / sqrt(1 - load)
     */
    private static calculateTimeDilation(nodeLoad: number): number {
        // Limitamos la carga para evitar división por cero (Singularidad)
        const safeLoad = Math.min(nodeLoad, PHYSICS.MAX_LOAD_FACTOR);

        // Factor gamma (simplificado para métrica de red)
        return 1 / Math.sqrt(1 - safeLoad);
    }

    /**
     * VERIFICACIÓN CAUSAL RELATIVISTA
     * @param distanceKm Distancia física
     * @param claimedLatencyMs Latencia reportada
     * @param nodeLoad Carga del nodo (0.0 a 1.0) -> Simula la "Gravedad"
     */
    static verifyCausality(distanceKm: number, claimedLatencyMs: number, nodeLoad: number = 0.0): { valid: boolean, minTime: number } {

        // 1. Tiempo Mínimo en el Vacío (Espacio plano)
        const c = PHYSICS.C_LIGHT_FIBER; // 200 km/ms
        const flatSpaceTime = distanceKm / c;

        // 2. Aplicar Dilatación Temporal (Espacio Curvo)
        // Un nodo muy cargado tiene "derecho" a tardar más.
        const dilationFactor = this.calculateTimeDilation(nodeLoad);
        const relativisticMinTime = flatSpaceTime * dilationFactor;

        // 3. Aplicar Tolerancia al Jitter (Incertidumbre)
        const absoluteMinTime = relativisticMinTime - PHYSICS.JITTER_TOLERANCE_MS;

        // console.log(`[MINKOWSKI] Dist: ${distanceKm}km | Load: ${(nodeLoad*100).toFixed(0)}% | Min (Flat): ${flatSpaceTime.toFixed(2)}ms | Min (Relativista): ${relativisticMinTime.toFixed(2)}ms`);

        if (claimedLatencyMs < absoluteMinTime) {
            return { valid: false, minTime: absoluteMinTime }; // VIOLACIÓN (FTL)
        }

        return { valid: true, minTime: absoluteMinTime }; // CAUSAL
    }
}
