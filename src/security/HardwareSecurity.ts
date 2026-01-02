import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const IDENTITY_FILE = path.join(process.cwd(), 'node_identity.json');

export class HardwareSecurity {
    static loadSecureData() {
        // 1. Intentamos leer la identidad existente
        if (fs.existsSync(IDENTITY_FILE)) {
            try {
                const data = fs.readFileSync(IDENTITY_FILE, 'utf-8');
                return JSON.parse(data);
            } catch (e) {
                console.error("⚠️ Error leyendo identidad, regenerando...");
            }
        }

        // 2. Si no existe, ejecutamos el "Genesis Enrollment"
        console.log("🆕 DETECTADO NUEVO HARDWARE. REGISTRANDO NODO MAESTRO...");
        
        // Simulamos una huella digital única basada en tu PC
        const hardwareFingerprint = crypto.createHash('sha256')
            .update('LaPTOP-SQON7496-' + Date.now()) // Tu host + timestamp
            .digest('hex');

        const newIdentity = {
            hardwareHash: hardwareFingerprint,
            nodeType: 'ARCHITECT', // Nivel máximo de acceso
            createdAt: new Date().toISOString(),
            reputation: 100
        };

        // 3. Guardamos la identidad en disco (simulando persistencia segura)
        fs.writeFileSync(IDENTITY_FILE, JSON.stringify(newIdentity, null, 2));
        
        console.log(`✅ NODO REGISTRADO: ${hardwareFingerprint.substring(0, 8)}...`);
        return newIdentity;
    }
}
