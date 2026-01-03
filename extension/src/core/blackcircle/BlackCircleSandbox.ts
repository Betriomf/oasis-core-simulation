/**
 * ⚫ BLACK CIRCLE SANDBOX v2.0 (Physics-Based)
 * "No es un muro, es un campo de fuerza."
 * Integra: Stefan-Boltzmann (Térmica), Coulomb (Memoria) y Fractales.
 */
export class BlackCircleSandbox {

  // Horizonte de Sucesos (4GB)
  static readonly MEMORY_HORIZON_MB = 4096;
  
  // Constante de Stefan-Boltzmann (W/m^2 K^4) adaptada para silicio
  private static readonly SIGMA = 5.67e-8;

  /**
   * 1. BARRERA DE POTENCIAL (Coulomb Barrier)
   * En lugar de un límite fijo, calcula el "Coste de Resistencia".
   * Formula: C(r) = k / (R - r)
   * A medida que te acercas al límite, el coste tiende a infinito.
   */
  static calculateBarrierStress(currentUsageMB: number): number {
    const R = this.MEMORY_HORIZON_MB;
    const r = currentUsageMB;

    // Si tocamos el horizonte, la resistencia es infinita (Singularidad)
    if (r >= R) return Infinity;

    // A medida que r se acerca a R, el coste sube exponencialmente
    // Factor 1000 para normalizar la escala
    return 1000 / (R - r);
  }

  /**
   * 2. GESTIÓN TÉRMICA RADIATIVA (Stefan-Boltzmann)
   * Predice el límite de potencia antes de quemarse usando T^4.
   * P_max = sigma * T^4
   */
  static checkThermalSafety(currentTempC: number): 'SAFE' | 'THROTTLE' | 'SHUTDOWN' {
    const T_kelvin = currentTempC + 273.15;

    // Potencia radiada actual (Densidad de energía térmica)
    const powerDensity = this.SIGMA * Math.pow(T_kelvin, 4);

    // Umbrales basados en densidad de potencia (Watts virtuales/m2)
    // > 700 es crítico (~95°C)
    // > 600 es saturación (~85°C)
    if (powerDensity > 700) return 'SHUTDOWN'; 
    if (powerDensity > 600) return 'THROTTLE'; 

    return 'SAFE';
  }

  /**
   * 3. DECISIÓN DE ADMISIÓN (El Juez Físico)
   * Decide si una tarea entra basándose en el gradiente de estrés, no en un if simple.
   */
  static attemptAdmittance(currentLoad: number, taskSize: number, temp: number): boolean {

    // A. Check Térmico Predictivo (Ley de Potencias)
    if (this.checkThermalSafety(temp) !== 'SAFE') return false;

    // B. Check de Barrera Asintótica
    const currentStress = this.calculateBarrierStress(currentLoad);
    const futureStress = this.calculateBarrierStress(currentLoad + taskSize);

    // Si la tarea empuja el estrés hacia el infinito demasiado rápido, se rechaza.
    // Esto evita romper el equilibrio cerca del borde (Singularidad).
    if (futureStress > currentStress * 2) return false;

    return true;
  }
}
