/**
 * 🐆 TURING REPLICATOR v3.1 (Hybrid Bio-Mimetic Engine)
 * "Los datos son bacterias: comen atención (F) y mueren por coste (K)."
 * * Integra:
 * 1. Modelo Gray-Scott (Reacción-Difusión) para precisión matemática.
 * 2. Ajuste Relativista (Latencia) para realidad de red.
 * 3. Estados de Fase (Cristalización/Viralidad) para gestión lógica.
 */
export class TuringReplicator {

  // =================================================================
  // 1. CONSTANTES BIOLÓGICAS (Calibradas v33.5)
  // =================================================================

  // D_u: Velocidad de contagio de la fama (Activador)
  static readonly D_ACTIVATOR = 0.18;

  // D_v: Resistencia del disco duro (Inhibidor)
  static readonly D_INHIBITOR = 0.04;

  // F: Feed Rate (Alimento) - Qué tan intrínsecamente interesante es el dato
  static readonly FEED_RATE = 0.055;

  // K: Kill Rate (Muerte) - Coste energético de mantener el dato vivo
  static readonly KILL_RATE = 0.062;

  /**
   * ANÁLISIS DE ESTABILIDAD DEL PATRÓN (Morfogénesis)
   * Evalúa las ecuaciones diferenciales para determinar el destino del archivo.
   * * @param u (Popularity): Concentración del Activador (0.0 a 1.0)
   * @param v (Scarcity): Concentración del Inhibidor (0.0 a 1.0)
   * @param latencyMs: Fricción del medio (ms).
   */
  static analyzePatternStability(u: number, v: number, latencyMs: number): string {

    // 1. AJUSTE RELATIVISTA (Fricción)
    // La latencia actúa como viscosidad en el fluido de datos.
    const friction = Math.max(1, latencyMs / 40);
    const effectiveDu = this.D_ACTIVATOR / friction;

    // 2. ECUACIONES DE REACCIÓN (Modelo Gray-Scott simplificado)
    
    // Laplaciano: (0.5 - u). 
    // Si u es muy alto (0.9), esto es negativo (-0.4), lo que significa
    // que el nodo está "perdiendo" datos al dárselos a sus vecinos.
    const laplacian = 0.5 - u; 

    // Reacción: uv^2 (El inhibidor consume al activador)
    const reaction = u * (v * v);

    // Ecuación de Crecimiento (Turing Index): 
    // Cambio neto = Difusión - Consumo + Alimentación
    const turingIndex = (effectiveDu * laplacian) - reaction + (this.FEED_RATE * (1 - u));

    // 3. DIAGNÓSTICO DE ESTADOS (Lógica Corregida v3.1)

    // CASO A: Crecimiento Explosivo (Viral)
    // CORRECCIÓN CRÍTICA: Añadimos "|| u > 0.8".
    // Si el archivo ya es muy famoso (u > 0.8), es VIRAL aunque el índice baje por difusión.
    // Esto evita que el sistema confunda "compartir mucho" con "morir".
    if ((turingIndex > 0.01 || u > 0.8) && v < 0.4) {
        return "EXPLOSIVE_GROWTH"; 
    }

    // CASO B: Apoptosis (Muerte Programada)
    // Si nadie lo quiere (u bajo) Y cuesta mucho mantenerlo (v alto).
    else if ((turingIndex < -0.05 && u < 0.3) || (v > 0.8 && u < 0.2)) {
        return "APOPTOSIS_SEQUENCE"; 
    }

    // CASO C: Cristalización (Archivo Profundo)
    // Alta popularidad (u) PERO alta escasez (v).
    // El sistema no puede replicar más, así que "congela" el dato.
    else if (u > 0.7 && v > 0.7) {
        return "CRYSTALLIZATION"; 
    }

    // CASO D: Homeostasis
    else {
        return "TURING_PATTERN_STABLE"; 
    }
  }

  /**
   * REPLICACIÓN BIOLÓGICA (Génesis)
   */
  static replicateGenesis(seed: string): string {
      return `GENESIS_${seed}_${Date.now()}_BIO_V3`;
  }
}
