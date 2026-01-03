/**
 * 🌡️ LANDAUER LIMIT ENGINE
 * "La geometría de la información determina su coste energético."
 *
 * Implementa la Supresión de Entropía Topológica (Fibonacci Mesh).
 * Fórmula Clásica: S = kB * ln(2)
 * Fórmula Oasis:   S = kB * ln(phi) -> 30.6% Reducción de Entropía.
 */

export class LandauerLimit {

    // Constante de Boltzmann (J/K)
    private static readonly k_B = 1.380649e-23;

    // Temperatura Ambiente de Operación (300 Kelvin)
    private static readonly T_AMBIENT = 300;

    // 1. COSTES FUNDAMENTALES POR BIT (En Julios)
    // Clásico (Binario): ln(2) ≈ 0.693
    static readonly CLASSICAL_COST = this.k_B * this.T_AMBIENT * Math.LN2;

    // Oasis (Fibonacci): ln(phi) ≈ 0.481
    // Phi (φ) = 1.618033...
    static readonly OASIS_COST = this.k_B * this.T_AMBIENT * Math.log(1.6180339887);

    // 2. CONVERSIÓN ECONÓMICA
    // 1 SPN = 1 Nano-Julio de trabajo útil (Arbitrario para el ejemplo)
    private static readonly JOULES_PER_SPN = 1e-9;

    /**
     * Calcula el Calor (Q) generado por procesar datos.
     * @param bits - Cantidad de información procesada.
     * @param mode - 'CLASSICAL' (AWS/Azure) o 'OASIS' (Fibonacci).
     */
    static calculateHeatGenerated(bits: number, mode: 'CLASSICAL' | 'OASIS'): number {
        const costPerBit = mode === 'OASIS' ? this.OASIS_COST : this.CLASSICAL_COST;
        return bits * costPerBit; // Resultado en Julios
    }

    /**
     * Calcula el Precio Base en SPN basado en la física.
     * "Somos más baratos porque la física nos cuesta menos."
     */
    static calculatePriceSPN(bits: number): number {
        const energyJoules = this.calculateHeatGenerated(bits, 'OASIS');
        return energyJoules / this.JOULES_PER_SPN;
    }

    /**
     * BLACK CIRCLE SCHEDULER (Simulado)
     * Verifica si una tarea va a fundir el nodo.
     */
    static checkThermalSafety(heatJoules: number, maxDissipation: number): boolean {
        // Si el calor generado supera la disipación térmica máxima del hardware
        return heatJoules < maxDissipation;
    }

    /**
     * UI: MÉTRICA DE AHORRO ECOLÓGICO
     * Devuelve el % exacto de eficiencia.
     */
    static getEfficiencyGain(): string {
        const gain = 1 - (this.OASIS_COST / this.CLASSICAL_COST);
        return `${(gain * 100).toFixed(2)}% THERMODYNAMIC ADVANTAGE`;
    }
}
