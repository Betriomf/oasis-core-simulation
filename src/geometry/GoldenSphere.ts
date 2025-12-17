import { PHYSICS } from '../constants/UniversalConstants';

export class GoldenSphere {

  /**
   * 1. MAPEO DE FIBONACCI ESFÉRICO (Con corrección de Seguridad)
   * Distribuye N fragmentos en la superficie de una esfera (Horizonte de Sucesos).
   */
  static getCoordinates(index: number, totalNodes: number) {
    // Evitar división por cero y polos exactos (Singularidades)
    const n = Math.max(totalNodes, 1);
    const i = index + 0.5; // Offset 0.5 para evitar simetría especular

    // Coordenada Y (Distribución de Área Cilíndrica)
    const y = 1 - (2 * i) / n;

    // Radio en esa altura (Pitágoras)
    const radius = Math.sqrt(1 - y * y);

    // Ángulo Áureo (La constante mágica v35.0)
    const theta = PHYSICS.GOLDEN_ANGLE * i;

    return {
      x: Math.cos(theta) * radius,
      y: y,
      z: Math.sin(theta) * radius,
      // Capacidad Holográfica del punto (Bekenstein)
      // Normalizamos el área superficial disponible para este shard.
      maxEntropy: (4 * Math.PI * Math.pow(radius, 2)) / n
    };
  }

  /**
   * 2. EL LATIDO IRRACIONAL (Anti-Resonancia de Weyl)
   * Calcula el siguiente momento de actividad.
   * AHORA REQUIERE 'nodeId' para garantizar trayectorias únicas.
   */
  static getNextIrrationalTick(attempt: number, nodeId: string, baseInterval: number = 1000): number {

    // 1. Convertir NodeID a un número caótico (Hash simple)
    const nodeHash = this.fnv1aHash(nodeId);

    // 2. Parte Fraccionaria Determinista (Teorema de Weyl)
    // Esto asegura que cada nodo tenga una "órbita" temporal única.
    const uniquePhase = (nodeHash * PHYSICS.PHI_INV) % 1;

    // 3. Cálculo del Tick
    // T = (Intervalo) * (Factor Irracional) * (Intento + FASE ÚNICA)
    const theta = baseInterval * PHYSICS.IRRATIONAL_SYNC_FACTOR * (attempt + uniquePhase);

    return Math.floor(theta);
  }

  /**
   * Helper: Hash rápido para convertir string a entero (No criptográfico)
   */
  private static fnv1aHash(str: string): number {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }
}
