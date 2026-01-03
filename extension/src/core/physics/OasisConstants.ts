/**
 * 📐 OASIS CONSTANTS (The Immutable Laws)
 */
export class OasisConstants {
    // La Proporción Áurea (Crecimiento Fractal)
    static readonly PHI = (1 + Math.sqrt(5)) / 2; // ≈ 1.618033988

    // El Ciclo Perfecto
    static readonly PI = Math.PI;

    // EL TIEMPO IRRACIONAL (Solución al Teorema CAP)
    // T_beat = T0 * (PI / PHI) ≈ 1.9416...
    static readonly IRRATIONAL_TIME_FACTOR = this.PI / this.PHI;

    // Constante de Desintegración (Marie Curie)
    // Lambda para limpieza de datos basura (Vida media corta)
    static readonly LAMBDA_DECAY = 0.693; 
}
