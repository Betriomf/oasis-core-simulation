/**
 * 📊 GAUSSIAN DEFENSE SYSTEM
 * "El cerebro estadístico que diferencia entre un error y un ataque."
 * Calcula desviaciones estándar y Z-Scores.
 */
export class GaussianDefense {
    
    /**
     * Calcula cuántas desviaciones estándar se aleja un valor de la media.
     * Fórmula: Z = (X - μ) / σ
     * * @param value - El valor del nodo (ej. Radiación actual)
     * @param mean - La media de la red
     * @param stdDev - La desviación estándar de la red
     */
    static calculateZScore(value: number, mean: number, stdDev: number): number {
        // Evitamos división por cero si la red es perfecta (stdDev = 0)
        if (stdDev === 0) return 0;
        
        return (value - mean) / stdDev;
    }

    /**
     * Determina si es una anomalía estadística.
     * En una distribución normal (Campana de Gauss):
     * - Z > 3.0 ocurre solo el 0.1% de las veces.
     * - Z > 3.5 es extremadamente raro (ANOMALÍA CONFIRMADA).
     */
    static isAnomaly(zScore: number): boolean {
        return Math.abs(zScore) > 3.5;
    }
}
