/**
 * 🍎 NEWTONIAN MECHANICS ENGINE
 * "La naturaleza no calcula rutas; minimiza la acción."
 * Deriva fuerzas de enrutamiento y precios basándose en leyes de movimiento y entropía.
 */

export class NewtonianMechanics {

  // Constante Gravitacional de la Red (Calibrada para que 1 SPN mueva 1 GB)
  static readonly G_CONST = 6.674e-11;

  /**
   * 1. SEGUNDA LEY (F = ma) -> CÁLCULO DE PRECIO ($SPN)
   * Determina el coste de vencer la inercia del dato.
   * @param dataMassMB - Tamaño del archivo + Complejidad (Masa)
   * @param urgencySec - Tiempo límite deseado (Aceleración requerida)
   */
  static calculateForceToMove(dataMassMB: number, urgencySec: number): number {
    // A mayor urgencia (tiempo pequeño), mayor aceleración necesaria.
    // a = 1 / t^2
    const acceleration = 1 / Math.pow(Math.max(0.1, urgencySec), 2);

    // F = m * a
    const force = dataMassMB * acceleration;

    // Retornamos la Fuerza en unidades SPN (Precio Base)
    return force;
  }

  /**
   * 2. GRAVITACIÓN UNIVERSAL -> ENRUTAMIENTO
   * F = G * (m1 * m2) / r^2
   * Decide la atracción entre una Tarea (m1) y un Nodo (m2).
   * @param taskMass - Importancia del dato (0-100)
   * @param nodePower - Potencia del nodo (TFLOPS)
   * @param latencyMs - Distancia (r)
   */
  static calculateGravitationalPull(taskMass: number, nodePower: number, latencyMs: number): number {
    // La distancia (latencia) penaliza al cuadrado.
    // Si estás lejos (ping alto), la gravedad cae drásticamente.
    const distanceSquared = Math.pow(Math.max(1, latencyMs), 2);

    const pull = this.G_CONST * ((taskMass * nodePower) / distanceSquared);

    // Normalizamos a una escala legible (Newtons Digitales)
    return pull * 1e10; 
  }

  /**
   * 3. FUERZA ENTRÓPICA (Verlinde) -> FILTRO DE SPAM
   * F = T * (dS/dx)
   * Si no hay ganancia de información (dS), la fuerza es cero.
   */
  static verifyThermodynamicJustification(tokenPrice: number, infoGain: number, networkFriction: number): boolean {
    // T = Temperatura ($SPN Price)
    // dS = Ganancia de Información
    // dx = Coste de Red (Fricción)
    
    const entropicForce = tokenPrice * (infoGain / Math.max(1, networkFriction));

    // Si la fuerza entrópica es menor que la fricción del vacío, el dato se detiene.
    return entropicForce > 0.01; 
  }
}
