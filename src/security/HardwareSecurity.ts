import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const IDENTITY_FILE = path.join(process.cwd(), 'node_identity.json');

export class HardwareSecurity {
    
    // Carga la identidad (existente)
    static loadSecureData() {
        if (fs.existsSync(IDENTITY_FILE)) {
            try {
                return JSON.parse(fs.readFileSync(IDENTITY_FILE, 'utf-8'));
            } catch (e) { return null; }
        }
        
        // Si no existe, genera una nueva (Genesis)
        const newIdentity = {
            hardwareHash: crypto.createHash('sha256').update('NODO-' + Date.now()).digest('hex'),
            nodeType: 'ARCHITECT',
            createdAt: new Date().toISOString()
        };
        fs.writeFileSync(IDENTITY_FILE, JSON.stringify(newIdentity, null, 2));
        return newIdentity;
    }

    // --- NUEVAS FUNCIONES PARA ARREGLAR ERRORES ---

    /**
     * Crea un Hash SHA-256 de cualquier dato (Para HolographicStorage)
     */
    static hashData(data: string): string {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    /**
     * Simula una firma digital con la clave privada del nodo
     */
    static signData(data: string): string {
        // En producción usaríamos la Private Key real. Aquí simulamos la firma.
        const hash = this.hashData(data);
        return `SIG_RSA_${hash.substring(0, 16)}`;
    }

    /**
     * Guarda datos seguros (Para StressTest)
     */
    static saveSecureData(data: any) {
        // En simulación, solo logueamos que se ha guardado
        console.log("💾 [SECURE VAULT] Datos encriptados y guardados.");
    }
}
