/**
 * 🕸️ GESTOR DE ENJAMBRE (SWARM MANAGER)
 * Escanea la red para encontrar nodos vivos y calcular la capacidad global.
 */
export class P2PNetwork {
    
    // Simulamos una lista de nodos que responden al Ping
    private static activePeers = [
        { id: 'Node_Berlin_01', latency: 45, freeSpaceGB: 2500, reputation: 0.98 },
        { id: 'Node_Tokyo_X9', latency: 120, freeSpaceGB: 8000, reputation: 0.95 },
        { id: 'Node_Local_Neighbor', latency: 5, freeSpaceGB: 500, reputation: 0.80 },
        { id: 'Node_SpaceX_Sat', latency: 200, freeSpaceGB: 150, reputation: 0.99 }
    ];

    /**
     * Escanea la red en busca de capacidad disponible
     */
    static async scanNetworkStatus() {
        console.log("📡 PING enviado a la DHT (Tabla de Hash Distribuida)...");
        await new Promise(r => setTimeout(r, 600)); // Latencia simulada
        
        let totalCapacityGB = 0;
        let activeNodes = 0;

        // Sumamos la capacidad de cada nodo encontrado
        console.log("   > Recibiendo 'Pong' de pares cercanos:");
        this.activePeers.forEach(peer => {
            console.log(`     🔹 ${peer.id}: +${peer.freeSpaceGB} GB Libres (${peer.latency}ms)`);
            totalCapacityGB += peer.freeSpaceGB;
            activeNodes++;
        });

        // Factor Galois: Necesitamos 3 veces el espacio real para seguridad
        // Esto responde a tu pregunta: reducimos la capacidad mostrada por seguridad
        const effectiveCapacity = Math.floor(totalCapacityGB / 3);

        return {
            totalRaw: totalCapacityGB,
            effective: effectiveCapacity,
            nodes: activeNodes
        };
    }

    /**
     * Verifica si hay espacio suficiente para un archivo específico
     */
    static checkSufficiency(fileSizeMB: number, networkStats: any): boolean {
        // Convertimos GB a MB para comparar
        const availableMB = networkStats.effective * 1024;
        return availableMB > fileSizeMB;
    }
}
