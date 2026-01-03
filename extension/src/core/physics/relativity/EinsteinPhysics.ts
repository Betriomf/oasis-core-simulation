/**
 * 🌌 EINSTEIN RELATIVITY ENGINE
 * "El tiempo y el espacio son modos en los que pensamos, no condiciones en las que vivimos."
 * Gestiona la Causalidad, la Dilatación Temporal y la Gravedad de Datos.
 */

export class EinsteinPhysics {

  // Velocidad de la luz en el medio (Fibra óptica ~200,000 km/s)
  // Calibrado a ms por km para la red.
  static readonly C_LIGHT = 300000; 

  /**
   * 1. RELATIVIDAD ESPECIAL: MÉTRICA DE MINKOWSKI
   * ds^2 = -c^2 * dt^2 + dx^2
   * Valida si una transacción es físicamente posible o es un fraude (Spoofing).
   * @param distanceKm - Distancia física entre nodos.
   * @param timeTakenMs - Tiempo que dicen haber tardado.
   */
  static checkCausalityViolation(distanceKm: number, timeTakenMs: number): boolean {
    // El tiempo mínimo físico que la luz tarda en recorrer esa distancia
    // t = d / c
    const minTimeSec = distanceKm / this.C_LIGHT;
    const minTimeMs = minTimeSec * 1000;

    // Si tardaron MENOS que la luz, han roto la causalidad (Mentira/Hackeo)
    if (timeTakenMs < minTimeMs) {
        return true; // VIOLACIÓN DETECTADA
    }
    return false; // CAUSALIDAD RESPETADA (Intervalo Tipo-Tiempo)
  }

  /**
   * 2. RELATIVIDAD GENERAL: DILATACIÓN TEMPORAL (LORENTZ)
   * Ajusta el "reloj" del nodo según su estrés.
   * Un nodo bajo mucha gravedad (carga) percibe el tiempo más lento.
   * @param nodeLoadPercent - Carga del nodo (0 a 100) -> Actúa como "Gravedad"
   */
  static calculateTimeDilation(nodeLoadPercent: number): number {
    // Factor de Lorentz simplificado para sistemas digitales
    // A mayor carga (v -> c), mayor dilatación (t' > t)
    
    const velocity = Math.min(0.99, nodeLoadPercent / 100); // v/c
    
    // Gamma = 1 / sqrt(1 - v^2)
    const gamma = 1 / Math.sqrt(1 - Math.pow(velocity, 2));
    
    return gamma; // Factor de dilatación (ej. 1.0 a 7.0)
  }

  /**
   * 3. ENERGÍA RELATIVISTA (E = mc^2)
   * Calcula el precio final considerando la "Urgencia" como velocidad de la luz.
   * Precio = Masa * Urgencia^2
   */
  static calculateRelativisticPrice(dataMassMB: number, urgencyIndex: number): number {
    // urgencyIndex: 1 (Normal) a 10 (Velocidad Luz)
    const energy = dataMassMB * Math.pow(urgencyIndex, 2);
    return energy;
  }
}
