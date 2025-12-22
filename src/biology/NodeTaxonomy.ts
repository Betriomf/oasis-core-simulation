/**
 * 🏷️ NODE TAXONOMY ENGINE (Teoría de Representaciones)
 * Clasifica el nodo basándose en su "Masa" (Cómputo) y "Spin" (Estabilidad).
 * Ubicación: src/biology/NodeTaxonomy.ts
 */

export class NodeTaxonomy {

  // Umbrales de Hipercarga (Potencia de Cómputo en GFLOPS simulados)
  static readonly THRESHOLD_ENTERPRISE = 200; // Ajustado para JS/Node
  static readonly THRESHOLD_GAMER = 50;

  // Umbrales de Isospín (Horas de Uptime/Estabilidad)
  static readonly STABILITY_ENTERPRISE = 24 * 30; // 30 Días
  static readonly STABILITY_PRO = 24;             // 24 Horas

  /**
   * 1. BENCHMARK DE INERCIA (F=ma)
   * Ejecuta una carga pesada para medir la "Masa" real del nodo.
   * Retorna una puntuación de Hipercarga (Y).
   */
  static async measureHypercharge(): Promise<number> {
    const start = performance.now();

    // Simulamos trabajo pesado: Multiplicación de Matrices / Tensores
    let acc = 0;
    // Hacemos 2 millones de operaciones trigonométricas
    for (let i = 0; i < 2_000_000; i++) {
      acc += Math.sqrt(i) * Math.sin(i);
    }

    const duration = performance.now() - start;
    
    // Si tarda poco (duration baja), la hipercarga es alta.
    // Fórmula calibrada para dar valores legibles (ej. 50-500)
    if (duration === 0) return 9999; // Infinito (demasiado rápido)
    const hypercharge = 10000 / duration;

    return hypercharge;
  }

  /**
   * 2. CLASIFICADOR DE FAMILIAS (El "Sombrero Seleccionador")
   * Asigna el Rol basándose en las métricas físicas.
   */
  static classify(hypercharge: number, uptimeHours: number): string {

    // A. NODO ENTERPRISE (Alta Potencia + Alta Estabilidad)
    // El "Bosón Pesado" - Ideal para Hospitales/Bancos
    if (hypercharge > this.THRESHOLD_ENTERPRISE && uptimeHours > this.STABILITY_ENTERPRISE) {
      return "ENTERPRISE (Hospital/Bank Grade)";
    }

    // B. NODO GAMER (Alta Potencia + Baja Estabilidad)
    // El "Fermión Rápido" - Ideal para IA/Renderizado, pero volátil.
    if (hypercharge > this.THRESHOLD_GAMER) {
      return "GAMER (High-Throughput / Volatile)";
    }

    // C. NODO ARCHIVE (Baja Potencia + Alta Estabilidad)
    // "Materia Oscura" - Lento pero fiable para guardar datos fríos.
    if (uptimeHours > this.STABILITY_PRO) {
      return "ARCHIVE (Cold Storage)";
    }

    // D. NODO STANDARD (El resto)
    return "STANDARD (Relay / Light Node)";
  }
}
