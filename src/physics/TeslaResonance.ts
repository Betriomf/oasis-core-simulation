/**
 * ⚡ TESLA RESONANCE ENGINE
 * "Si quieres entender el universo, piensa en energía, frecuencia y vibración."
 * Gestiona el flujo de datos mediante Impedancia, Resonancia y Fases.
 */

export class TeslaResonance {

  // Factor de Eficiencia Trifásica (Raíz de 3)
  static readonly SQRT_3 = 1.73205080757;

  /**
   * 1. SINTONIZACIÓN DE IMPEDANCIA (Z)
   * Z = sqrt(R^2 + (XL - XC)^2)
   * Busca minimizar la resistencia al flujo de datos.
   * * @param latencyMs - Resistencia (R): Fricción de red.
   * @param fileSizeMB - Reactancia Inductiva (XL): Inercia del archivo.
   * @param bandwidthMbps - Reactancia Capacitiva (XC): Capacidad del tubo.
   */
  static calculateImpedance(latencyMs: number, fileSizeMB: number, bandwidthMbps: number): number {
    const R = latencyMs;       // Resistencia Óhmica
    const XL = fileSizeMB;     // Inercia
    const XC = bandwidthMbps;  // Capacidad

    // La Reactancia Neta (X) es la diferencia entre Inercia y Capacidad
    const reactance = XL - XC;

    // Impedancia Total (Z)
    const Z = Math.sqrt(Math.pow(R, 2) + Math.pow(reactance, 2));

    return Z;
  }

  /**
   * 2. CALIDAD DE RESONANCIA (Q-Factor)
   * Determina si el nodo y el dato están "sintonizados".
   * Si XL == XC, entramos en Resonancia Pura (Transmisión perfecta).
   */
  static getResonanceQuality(Z: number, latencyMs: number): string {
    // Si la Impedancia es casi igual a la Latencia pura, significa que 
    // la Reactancia se ha cancelado (XL - XC = 0). ¡RESONANCIA!
    const divergence = Math.abs(Z - latencyMs);

    if (divergence < 5) return "PERFECT_RESONANCE (Superconductor Mode)";
    if (divergence < 20) return "HARMONIC_FLOW (Stable)";
    return "HIGH_IMPEDANCE (Turbulent/Lossy)";
  }

  /**
   * 3. POTENCIA TRIFÁSICA (Throughput Real)
   * Aplica el factor raíz de 3 para calcular el ancho de banda efectivo
   * usando Sharding Rotatorio (Fase A, B, C).
   */
  static calculatePolyphaseThroughput(bandwidthMbps: number): number {
    // En sistemas trifásicos, la potencia es V * I * Raíz(3)
    return bandwidthMbps * this.SQRT_3;
  }
}
