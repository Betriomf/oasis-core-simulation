import { PHYSICS } from '../constants/UniversalConstants';

/**
 * TEORÍA DE CUERDAS (Módulo de Resonancia v11.5)
 * Mide la salud vibracional de la conexión.
 * Integra: Frecuencia (Latencia), Amplitud (Ancho de Banda) y Pureza (Jitter).
 */
export class StringTheory {

    /**
     * CÁLCULO DE ESTADO VIBRACIONAL
     * @param latencyMs Tiempo de ida y vuelta (Define la nota fundamental).
     * @param bandwidthGbps Capacidad del canal (Define la energía).
     * @param jitterMs Ruido térmico/variabilidad (Define la decoherencia).
     */
    static calculateVibrationState(latencyMs: number, bandwidthGbps: number, jitterMs: number = 0): string {
        // 1. Protección de Singularidad (Relatividad)
        if (latencyMs <= 0) return "SINGULARIDAD_TEMPORAL (Causalidad Rota)";

        // 2. Frecuencia Fundamental (Hz inversos)
        const frequency = 1000 / latencyMs; 
        
        // 3. Factor de Estabilidad (Pureza de la Onda)
        // Si jitter es 0, factor es 1.0 (Puro).
        // Si jitter es igual a la latencia, factor es 0.5 (Ruido 50%).
        // Fórmula: 1 / (1 + Relación Ruido/Señal)
        const stabilityFactor = 1 / (1 + (jitterMs / latencyMs));

        // 4. Armonía Unificada
        // (Energía * Estabilidad) / Phi
        // Usamos Phi para filtrar resonancias destructivas.
        const harmony = (frequency * bandwidthGbps * stabilityFactor) * PHYSICS.PHI_INV;

        // Log para depuración física
        // console.log(`[STRING] Freq: ${frequency.toFixed(0)}Hz | Stab: ${(stabilityFactor*100).toFixed(0)}% | Harmony: ${harmony.toFixed(2)}`);

        if (harmony > 100) return "RESONANCIA_PERFECTA (Supercuerda)";
        if (harmony > 50) return "VIBRACIÓN_ESTABLE";
        if (harmony > 10) return "VIBRACIÓN_DÉBIL (Ruido Alto)";
        return "DISONANCIA_DESTRUCTIVA (Cuerda Rota)";
    }
}
