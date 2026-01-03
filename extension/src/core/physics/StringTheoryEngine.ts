import { PHYSICS } from '../constants/UniversalConstants';
import { StringDimensions } from '../geometry/CalabiYau';

/**
 * STRING THEORY ENGINE (Motor de Física Dinámica)
 * Decide el movimiento de datos basándose en la Acción de Nambu-Goto.
 */
export class StringTheoryEngine {

    // Coste energético por segundo de transmisión (normalizado en SPN)
    private static readonly ENERGY_COST_PER_SEC = 0.0001;

    /**
     * 1. CÁLCULO DE LA TENSIÓN DE LA CUERDA (T)
     * La Tensión define la "rigidez" y valor del dato.
     * T = (Valor Económico * Factor Entrópico) / Inercia
     */
    static calculateTension(dimensions: StringDimensions, sizeBytes: number): number {
        // Extraemos D2 (Economía)
        const valueSPN = dimensions.D2_Eco;

        // Asumimos que la integridad nos da una pista de la entropía (1.0 base)
        const entropyFactor = 1.0;

        // Fórmula: A mayor valor económico, mayor tensión (más difícil de mover).
        // A mayor tamaño, mayor inercia, pero aquí normalizamos para la física de la red.
        // (Nota: Ajustamos la fórmula para que tenga sentido en la simulación: 
        // Valor alto = Alta Tensión = Cuerda Rígida).
        return (valueSPN * entropyFactor);
    }

    /**
     * 2. ACCIÓN DE NAMBU-GOTO (S)
     * Calcula el "Área de la Hoja de Mundo" (Worldsheet) barrida por la cuerda.
     * El universo siempre minimiza esta cantidad.
     * S = Tensión * Área Espacio-Temporal
     */
    static calculateWorldsheetAction(
        tension: number,
        networkDistance: number, // Latencia o Hops
        transferTimeSeconds: number
    ): number {
        // Área en el espacio-tiempo = Hipotenusa de (Espacio^2 + Tiempo^2)
        // Esto es geometría Lorentziana simplificada.

        const spaceComponent = Math.pow(networkDistance, 2);

        // Convertimos tiempo a "distancia" usando una constante de conversión
        const timeComponent = Math.pow(transferTimeSeconds * 100, 2); 

        const area = Math.sqrt(spaceComponent + timeComponent);

        return tension * area;
    }

    /**
     * 3. EL DECIDIDOR GEODÉSICO (Optimizador de Transporte)
     * Compara mover el Dato (Estrategia A) vs Mover el Código (Estrategia B).
     */
    static optimizeTransport(
        fileSizeMB: number,
        cyDimensions: StringDimensions,
        networkLatencyMs: number
    ): { strategy: string, saving: string, actionData: number, actionCode: number } {

        const sizeBytes = fileSizeMB * 1e6;
        const codeSizeBytes = 50 * 1e6; // Docker container promedio (50MB)

        // Paso A: Calcular la Tensión de la Cuerda de Datos (El Archivo)
        const T_data = this.calculateTension(cyDimensions, sizeBytes);

        // --- ESCENARIO 1: MOVER DATOS (Newtoniano) ---
        // Asumimos ancho de banda 1GB/s para el ejemplo
        const bandwidthBps = 1e9; 
        const timeData = sizeBytes / bandwidthBps;
        const Action_MoveData = this.calculateWorldsheetAction(T_data, networkLatencyMs, timeData);

        // --- ESCENARIO 2: MOVER CÓDIGO (Relativista/Oasis) ---
        // El código es una herramienta (baja tensión económica comparada con el activo)
        const T_code = 0.001; // Tensión base muy baja para el código
        const timeCode = codeSizeBytes / bandwidthBps;

        // La acción del código es mover el container
        const Action_MoveCode = this.calculateWorldsheetAction(T_code, networkLatencyMs, timeCode);

        // --- DECISIÓN FINAL (Principio de Mínima Acción) ---
        if (Action_MoveCode < Action_MoveData) {
            const savingPct = (1 - (Action_MoveCode / Action_MoveData)) * 100;
             return {
                strategy: "MOVE_CODE_TO_DATA (Compute-over-Data)", 
                saving: savingPct.toFixed(2) + "%",
                actionData: Action_MoveData,
                actionCode: Action_MoveCode
            };
        } else {
            return {
                strategy: "MOVE_DATA_TO_NODE (Standard Transfer)", 
                saving: "0%",
                actionData: Action_MoveData,
                actionCode: Action_MoveCode
            };
        }
    }
}
