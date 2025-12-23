/**
 * 📊 GAUSSIAN DEFENSE SYSTEM
 * "El cerebro estadístico que diferencia entre un error y un ataque."
 * Calcula desviaciones estándar y Z-Scores.
 */
export class GaussianDefense {

    /**
     * Calcula cuántas desviaciones estándar se aleja un valor de la media.
     * Fórmula: Z = (X - μ) / σ
     */
    static calculateZScore(value: number, mean: number, stdDev: number): number {
        // Evitamos división por cero si la red es perfecta
        if (stdDev === 0) return 0;
        return (value - mean) / stdDev;
    }

    /**
     * Determina si es una anomalía estadística.
     * Si Z > 2.0 (95% confianza) o 3.0 (99%), es una anomalía.
     * Usamos 2.0 para ser estrictos pero justos.
     */
    static isAnomaly(zScore: number): boolean {
        return Math.abs(zScore) > 2.0;
    }
}
