import { PHYSICS } from '../constants/UniversalConstants';

/**
 * EL CÍRCULO NEGRO (Reactor de Ejecución)
 * Gestiona la RAM y CPU como un fluido termodinámico blindado.
 */
export class BlackCircleScheduler {

    /**
     * 1. BARRERA DE COULOMB (Seguridad Infinita)
     * Calcula el coste energético de escribir en una posición de memoria.
     * @param radiusPosition Posición relativa (0.0 centro -> 1.0 borde)
     */
    static calculateBarrierCost(radiusPosition: number): number {
        // V(r) = k / (R - r)
        // Si te acercas al borde (1.0), el coste tiende a infinito.
        const distanceToEdge = 1.0 - radiusPosition;
        
        // Si intenta tocar el límite prohibido
        if (distanceToEdge <= (1.0 - PHYSICS.COULOMB_BARRIER_LIMIT)) {
            return Infinity; // Muro impenetrable
        }

        return 1 / distanceToEdge;
    }

    /**
     * 2. LÍMITE TERMODINÁMICO (Stefan-Boltzmann)
     * Evita que el nodo se queme físicamente.
     */
    static checkThermalLimit(currentTempK: number, taskLoad: number): boolean {
        // P = sigma * T^4
        const currentRadiance = PHYSICS.STEFAN_BOLTZMANN * Math.pow(currentTempK, 4);
        const maxRadiance = PHYSICS.STEFAN_BOLTZMANN * Math.pow(PHYSICS.MAX_TEMP_KELVIN, 4);

        // Simulamos la presión de la nueva tarea
        const newRadiance = currentRadiance + (taskLoad * 100);

        if (newRadiance > maxRadiance) {
            console.warn(`[HAWKING RADIATION] Exceso térmico. Evaporando tarea.`);
            return false; 
        }
        return true; 
    }
}
