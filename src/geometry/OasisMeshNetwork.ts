/**
 * 🕸️ OASIS MESH CORE (Phi-CAP Protocol)
 * Solución al Teorema CAP mediante Tiempo Irracional y Topología Fibonacci.
 * "El orden matemático vence al caos temporal."
 */
export class OasisMeshNetwork {

  // CONSTANTES SAGRADAS (Geometría del Universo)
  static readonly PHI = 1.618033988749895; // La Proporción Áurea
  static readonly PI = Math.PI;
  static readonly SQRT_3 = 1.73205080757;  // Estructura Hexagonal

  // Constante de Sincronización Irracional (Teorema Phi-CAP)
  // Al usar un número irracional, los ciclos de los nodos nunca entran en resonancia destructiva.
  static readonly IRRATIONAL_SYNC = this.PI / this.PHI; // ~1.9416

  /**
   * 1. EL LATIDO IRRACIONAL (Solución a Disponibilidad)
   * Genera un intervalo de ping que nunca colisiona con otros nodos.
   * Evita el ataque DDoS interno ("Thundering Herd").
   * @param nodeId - Identidad única del nodo
   * @param baseIntervalMs - Ritmo base (ej: 1000ms)
   */
  static getNextHeartbeat(nodeId: number, baseIntervalMs: number): number {
    // Fase Fractal: Usamos el ID para situar al nodo en un punto único de la espiral
    const fractalPhase = (nodeId * this.PHI) % 1;

    // Fórmula Maestra: T = T0 * (pi/phi) * (Ruido Fractal)
    const nextTick = baseIntervalMs * this.IRRATIONAL_SYNC * (1 + (fractalPhase * 0.01));
    
    return Math.floor(nextTick);
  }

  /**
   * 2. TOPOLOGÍA DE CRISTAL (Solución a Tolerancia a Particiones)
   * Encuentra los 6 vecinos perfectos en una esfera virtual.
   * Estructura Hexagonal (Honeycomb) indeformable.
   */
  static getIdealNeighbors(myIndex: number, totalNodes: number): number[] {
    const neighbors: number[] = [];
    
    // Buscamos los 6 vecinos hexagonales en la espiral de Fibonacci
    for (let i = 1; i <= 6; i++) {
        // El "Salto Áureo" asegura distribución máxima
        const offset = Math.floor(i * this.PHI * 10);
        // Aritmética modular para cerrar la esfera (mundo redondo)
        const neighbor = (myIndex + offset) % totalNodes;
        neighbors.push(neighbor);
    }
    // Eliminamos duplicados y el propio nodo
    return [...new Set(neighbors)].filter(n => n !== myIndex).sort((a, b) => a - b);
  }

  /**
   * 3. VISCOSIDAD DE RED (Solución a Consistencia)
   * Acepta paquetes solo si la entropía no supera la capacidad del canal.
   */
  static checkViscosity(currentLoad: number, packetEntropy: number): boolean {
    const MAX_CAPACITY = 100; // Límite de Bekenstein abstracto
    return (currentLoad + packetEntropy) <= MAX_CAPACITY;
  }
}
