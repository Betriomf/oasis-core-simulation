import * as fs from 'fs';

interface AccessLog {
    timestamp: string;
    method: 'BIO_MOBILE' | 'PAPER_KEY_EMERGENCY';
    location: string;
    success: boolean;
}

export class Watchtower {
    private static LOG_FILE = 'access_log_secure.json';

    static async logAccess(method: 'BIO_MOBILE' | 'PAPER_KEY_EMERGENCY', success: boolean) {
        // Simulamos ubicaciones para la demo
        const mockLocations = ["Madrid, ES (Home)", "Tokyo, JP (VPN)", "Unknown IP"];
        const currentLocation = method === 'BIO_MOBILE' ? mockLocations[0] : mockLocations[Math.floor(Math.random() * mockLocations.length)];
        
        const entry: AccessLog = {
            timestamp: new Date().toISOString(),
            method: method,
            location: currentLocation,
            success: success
        };
        return entry;
    }

    static showSecurityReport(currentEntry: AccessLog) {
        console.log("\n👁️  PROTOCOLO ATALAYA (WATCHTOWER REPORT)");
        console.log("   ---------------------------------------------");
        console.log(`   1. [AYER 23:45] ✅ Acceso BIO desde Madrid (Tú)`);
        
        if (currentEntry.method === 'PAPER_KEY_EMERGENCY') {
            console.log(`   2. [AHORA MISMO] ⚠️  ACCESO DE EMERGENCIA DETECTADO`);
            console.log(`      📍 Origen: ${currentEntry.location}`);
            console.log(`      🔑 Método: PAPER KEY (Alta Prioridad)`);
        }
        console.log("   ---------------------------------------------");
        console.log("   ❓ ¿No reconoces el acceso anterior? EJECUTA 'WIPE' YA.");
    }
}
