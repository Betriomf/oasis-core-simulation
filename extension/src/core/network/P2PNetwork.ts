/**
 * 🕸️ GESTOR DE ENJAMBRE (SWARM MANAGER)
 * Escanea la red y ahora gestiona la "Temperatura" de los datos (Reacción-Difusión).
 */
export class P2PNetwork {
    
    // Lista de nodos simulada
    private static activePeers = [
        { id: 'Node_Berlin', latency: 45, freeSpaceGB: 2500 },
        { id: 'Node_Tokyo', latency: 120, freeSpaceGB: 8000 },
        { id: 'Node_Local', latency: 5, freeSpaceGB: 500 } // Tu vecino (Baja Latencia)
    ];

    static async scanNetworkStatus() {
        console.log("📡 SONAR: Escaneando enjambre...");
        await new Promise(r => setTimeout(r, 400)); 
        
        let totalCapacityGB = 0;
        this.activePeers.forEach(peer => totalCapacityGB += peer.freeSpaceGB);

        return {
            totalRaw: totalCapacityGB,
            effective: Math.floor(totalCapacityGB / 3),
            nodes: this.activePeers.length
        };
    }

    /**
     * 🔥 CHECK DE TEMPERATURA (Biological Replication)
     * Determina si un archivo es popular y se ha replicado cerca.
     */
    static getFileTemperature(fileId: string): string {
        // Simulamos la ecuación de Reacción-Difusión
        // Archivos con nombres comunes o recientes suelen estar "Calientes"
        const entropy = Math.random();
        
        if (entropy > 0.7) {
            return "HOT"; // ¡Es viral! Está en el nodo de tu vecino.
        } else if (entropy > 0.3) {
            return "WARM"; // Está en nodos regionales.
        } else {
            return "COLD"; // Está en la red profunda (lento).
        }
    }

    static checkSufficiency(fileSizeMB: number, networkStats: any): boolean {
        const availableMB = networkStats.effective * 1024;
        return availableMB > fileSizeMB;
    }
}
