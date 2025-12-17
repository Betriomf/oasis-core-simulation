import { PHYSICS } from '../constants/UniversalConstants';

export class GaussianDefense {

    /**
     * CÁLCULO DEL Z-SCORE (La Prueba de la Verdad)
     * Mide cuántas desviaciones estándar se aleja un valor de la media.
     * Z = 0 -> Comportamiento perfecto (promedio).
     * Z > 3 -> Comportamiento sospechoso.
     */
    static calculateZScore(value: number, mean: number, stdDev: number): number {
        if (stdDev === 0) return 0; // Si todos son iguales, nadie es sospechoso
        return (value - mean) / stdDev;
    }

    /**
     * FILTRO DE RUIDO (Suavizado Gaussiano)
     * Decide si un nodo debe ser baneado basándose en el contexto global.
     */
    static isAnomaly(zScore: number): boolean {
        // Si Z > 3.5, la probabilidad de que sea "mala suerte" es < 0.02%.
        // Es casi seguro malicia o fallo catastrófico.
        return Math.abs(zScore) > PHYSICS.ANOMALY_THRESHOLD_Z;
    }
}
