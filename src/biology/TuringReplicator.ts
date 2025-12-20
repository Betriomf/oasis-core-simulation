/**
 * 🐆 TURING REPLICATOR ENGINE (v33.5 Bio-Mímesis)
 * "Los datos no se copian, se reproducen como bacterias en un cultivo."
 * Implementa ecuaciones de Reacción-Difusión (Gray-Scott Model) para la gestión autónoma.
 */
export class TuringReplicator {

  // =================================================================
  // 1. CONSTANTES BIOLÓGICAS (Calibradas para evitar plagas digitales)
  // =================================================================

  // D_u: Velocidad de contagio del archivo viral (Activador)
  static readonly D_U = 0.18;

  // D_v: Resistencia del disco duro local (Inhibidor)
  static readonly D_V = 0.04;

  // f: Tasa de alimentación (Qué tan viral es el contenido intrínsecamente)
  static readonly F = 0.035;

  // k: Tasa de muerte (Coste energético de mantener el archivo vivo)
  static readonly K = 0.062;

  /**
   * CÁLCULO DEL PASO DE TURING (Euler Integration)
   * Evalúa si el archivo debe vivir, crecer o morir en este nodo.
   */
  static decideState(
    u: number,
    v: number,
    neighborsAvg_u: number,
    neighborsAvg_v: number
  ): 'REPLICATE' | 'STASIS' | 'APOPTOSIS' {

    // 1. DIFUSIÓN (El Laplaciano ∇²: Diferencia entre yo y mis vecinos)
    const laplacian_u = this.D_U * (neighborsAvg_u - u);
    const laplacian_v = this.D_V * (neighborsAvg_v - v);

    // 2. REACCIÓN (Dinámica Local de Turing)
    const reaction_u = (this.F * u * (1 - u)) - (v * u * u); 
    const reaction_v = (u * u) - (this.K * v);

    // 3. NUEVO ESTADO (Integración del siguiente instante t+1)
    const new_u = Math.max(0, Math.min(1, u + laplacian_u + reaction_u));
    const new_v = Math.max(0, Math.min(1, v + laplacian_v + reaction_v));

    // 4. DECISIÓN BIOLÓGICA
    return this.evaluatePattern(new_u, new_v);
  }

  /**
   * EVALUACIÓN DEL PATRÓN
   * Traduce el estado matemático a acciones de sistema de archivos.
   */
  private static evaluatePattern(u: number, v: number): 'REPLICATE' | 'STASIS' | 'APOPTOSIS' {
    // Si es muy popular (u alto) y hay poco inhibidor/disco ocupado (v bajo) -> CONTAGIO
    if (u > 0.60 && v < 0.4) {
        return 'REPLICATE';
    }

    // Si hay equilibrio -> MANTENER (El archivo vive feliz)
    if (u > 0.25) {
        return 'STASIS';
    }

    // Si la popularidad cae o la presión de disco es tóxica -> MUERTE PROGRAMADA
    return 'APOPTOSIS';
  }
}
