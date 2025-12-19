/**
 * ⚡ CAP THEOREM STRESS TEST
 * Simula una "Partición de Red" (Lag) donde dos nodos creen ser el ganador.
 * Oasis resuelve esto con "Consistencia Eventual basada en Tiempo".
 */

// Simulación de un bloque de datos (La Verdad)
interface Block {
    id: number;
    winner: string;
    timestamp: number;
}

class NetworkState {
    private lastBlock: Block | null = null;
    private processing = false;

    /**
     * INTENTO DE RECLAMO (RACE CONDITION)
     * Dos nodos llaman a esto "a la vez".
     */
    async claimWork(nodeName: string, lagMs: number) {
        console.log(`📡 ${nodeName}: Intentando reclamar trabajo... (Lag: ${lagMs}ms)`);
        
        // Simulamos el retraso de la red (Partición)
        await new Promise(r => setTimeout(r, lagMs));

        if (this.processing) {
            console.log(`❌ ${nodeName}: Rechazado. El bloque ya se estaba procesando.`);
            return;
        }

        // Si ya hay un ganador registrado (Consistencia)
        if (this.lastBlock) {
            console.log(`❌ ${nodeName}: Tarde. El bloque ya lo ganó ${this.lastBlock.winner}.`);
            return;
        }

        // Si llegamos aquí, este nodo gana (Disponibilidad)
        this.processing = true;
        const now = Date.now();
        this.lastBlock = { id: 1, winner: nodeName, timestamp: now };
        
        console.log(`✅ ${nodeName}: ¡VICTORIA! Bloque minado en t=${now}.`);
        this.processing = false;
    }
}

// EJECUCIÓN DE LA PRUEBA
console.log("🌪️ INICIANDO SIMULACIÓN DE TORMENTA CAP...\n");
const network = new NetworkState();

// Nodo A (Rápido pero lejos)
network.claimWork("🇯🇵 Nodo Tokio", 100); 

// Nodo B (Lento pero cerca) - Intenta ganar
network.claimWork("🇺🇸 Nodo NY", 200);

// Nodo C (Hackeo - Intenta reclamar después de que se cerró)
setTimeout(() => {
    network.claimWork("🏴‍☠️ Hacker", 50);
}, 500);
