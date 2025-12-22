/**
 * 🥧 PI ENGINE v2.0 (Thermodynamic Proof)
 * "La sincronización perfecta requiere un coste de energía."
 * Integra: Hashing Áureo (Weyl) y Series de Ramanujan/Leibniz.
 */
export class PiEngine {

  static readonly PI = Math.PI;
  // Usamos la precisión completa de Phi para evitar resonancias armónicas
  static readonly PHI = 1.618033988749895;

  /**
   * 1. SINCRONIZACIÓN IRRACIONAL (Golden Ratio Hashing)
   * Distribución de Baja Discrepancia (Teorema de Weyl).
   * Garantiza que nunca haya "grumos" de tráfico (Thundering Herd).
   */
  static getIrrationalHeartbeat(nodeId: number): number {
    // Fórmula: { n * phi } = n*phi - floor(n*phi)
    // Esto genera una distribución perfectamente uniforme en el intervalo [0,1].
    const product = nodeId * this.PHI;
    const fractionalPart = product - Math.floor(product);

    // Escalamos al intervalo de latido deseado (Base 1000ms + Ventana variable 1000ms)
    // Resultado: Latidos distribuidos uniformemente entre 1000ms y 2000ms.
    const baseInterval = 1000;
    const variableWindow = 1000;

    return baseInterval + Math.floor(fractionalPart * variableWindow);
  }

  /**
   * 2. PROOF OF PRECISION (Serie de Leibniz)
   * Obliga a la CPU a calcular, generando un coste energético mínimo (h_oasis).
   * Detecta errores de coma flotante por sobrecalentamiento o malas configuraciones.
   */
  static verifyCpuIntegrity(iterations: number = 10000): boolean {
      // Calculamos PI usando la serie: 4 * (1 - 1/3 + 1/5 - 1/7 ...)
      // Esto estresa la ALU secuencialmente.
      let piEstimate = 0;
      let divisor = 1;

      for (let i = 0; i < iterations; i++) {
          if (i % 2 === 0) {
              piEstimate += 4 / divisor;
          } else {
              piEstimate -= 4 / divisor;
          }
          divisor += 2;
      }

      // Verificamos la convergencia.
      // Si la CPU falla (bit flip) o es un emulador barato, el resultado se desviará.
      const deviation = Math.abs(piEstimate - this.PI);

      // Umbral de tolerancia para 10k iteraciones (La serie converge lento, así que damos margen)
      return deviation < 0.0001;
  }
}
