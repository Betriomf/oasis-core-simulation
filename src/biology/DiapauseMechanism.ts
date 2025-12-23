/**
 * 🦘 DIAPAUSE MECHANISM (Biological Suspension)
 * Estrategia de supervivencia: Ante la falta de recursos, 
 * priorizar la conservación de lo existente sobre el crecimiento.
 */

export type VitalState = 'GROWTH' | 'WARNING' | 'DIAPAUSE' | 'HIBERNATION';

export class DiapauseMechanism {

  // Umbrales de Estrés
  static readonly STORAGE_WARNING = 80; // 80% lleno
  static readonly STORAGE_CRITICAL = 95; // 95% lleno
  static readonly BATTERY_LOW = 20; // 20% batería

  /**
   * CHEQUEO DE CONSTANTES VITALES
   * Decide el estado metabólico del nodo basándose en telemetría.
   */
  static checkMetabolism(
    diskUsagePercent: number, // 0 a 100
    batteryLevel: number,     // 0 a 100
    legalRisk: boolean
  ): VitalState {

    // 1. DIAPAUSE LEGAL (Inmunidad)
    if (legalRisk) {
      return 'HIBERNATION';
    }

    // 2. DIAPAUSE ENERGÉTICA (Metabolismo)
    if (batteryLevel < this.BATTERY_LOW) {
      return 'DIAPAUSE';
    }

    // 3. DIAPAUSE POR ESPACIO (Físico)
    if (diskUsagePercent >= this.STORAGE_CRITICAL) {
      return 'DIAPAUSE';
    }

    // 4. ALERTA TEMPRANA
    if (diskUsagePercent >= this.STORAGE_WARNING) {
      return 'WARNING';
    }

    // 5. CRECIMIENTO NORMAL (Homeostasis)
    return 'GROWTH';
  }

  /**
   * CONTROL DE ADMISIÓN (Can Conceive?)
   * Define si el nodo acepta nuevos archivos ("embarazos").
   */
  static canConceive(state: VitalState): boolean {
    switch (state) {
      case 'GROWTH': return true;
      case 'WARNING': 
        // En warning, aceptamos, pero podríamos limitar la velocidad (Throttle)
        console.log("   > ⚠️  ADVERTENCIA: Recursos limitados. Crecimiento ralentizado.");
        return true; 
      case 'DIAPAUSE': 
        console.log("   > 🦘 DIAPAUSA ACTIVA: El nodo está en modo Solo Lectura.");
        return false; 
      case 'HIBERNATION': 
        console.log("   > ❄️  HIBERNACIÓN: Nodo bloqueado por seguridad.");
        return false;
      default: return false;
    }
  }

  // Simulación de lectura de hardware (para el CLI sin dependencias externas)
  static getSimulatedTelemetry() {
      // Simulamos un escenario realista: Disco al 45%, Batería al 100%, Legal OK
      return {
          diskUsage: 45, 
          battery: 100,
          legalRisk: false
      };
  }
}
