import * as fs from 'fs';
import * as crypto from 'crypto';
import * as os from 'os';

/**
 * 🛡️ HARDWARE SECURITY MODULE (HSM)
 * Simula un TPM y un Secure Enclave usando criptografía nativa.
 * Resuelve: Persistencia segura y CPU Spoofing.
 */
export class HardwareSecurity {

    // Guardamos la bóveda en la raíz del proyecto
    private static readonly STORAGE_FILE = './oasis_secure_vault.enc';

    /**
     * 1. HUELLA DE HARDWARE (TPM Simulado)
     * Usamos esto como CLAVE DE ENCRIPTACIÓN AES-256.
     * Si mueves el archivo .enc a otro PC, no se podrá desencriptar.
     */
    private static getMachineEncryptionKey(): string {
        const cpu = os.cpus()[0]?.model || 'UNKNOWN_CPU';
        const totalMem = os.totalmem();
        const platform = os.platform();
        const arch = os.arch();

        // Creamos una clave de 32 bytes (256 bits) basada en el hierro
        const rawId = `${platform}-${arch}-${cpu}-${totalMem}`;
        return crypto.createHash('sha256').update(rawId).digest('hex').substring(0, 32);
    }

    /**
     * 2. PRUEBA DE TRABAJO REAL (Pi Benchmark Intenso)
     * Soluciona el "CPU Check Warning".
     */
    static runProofOfWork(): number {
        const start = performance.now();

        // Cálculo intenso: Serie de Leibniz (1 millón de iteraciones)
        // Esto obliga a la ALU a trabajar de verdad.
        let pi = 0;
        let k = 1;
        for (let i = 0; i < 1000000; i++) {
            pi += (4 / k) * (i % 2 === 0 ? 1 : -1);
            k += 2;
        }

        const duration = performance.now() - start;

        // Anti-Spoofing: Si es < 0.5ms, es falso o una simulación.
        if (duration < 0.5) throw new Error("CPU SPOOFING DETECTED: Cálculo imposiblemente rápido.");

        return duration; // Retorna latencia real
    }

    /**
     * 3. GUARDAR ESTADO (ENCRIPTADO)
     * Escribe la memoria en disco usando AES-256-CBC
     */
    static saveSecureData(data: any) {
        try {
            const key = this.getMachineEncryptionKey();
            const iv = crypto.randomBytes(16); // Vector de inicialización
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

            let encrypted = cipher.update(JSON.stringify(data));
            encrypted = Buffer.concat([encrypted, cipher.final()]);

            // Guardamos IV + Datos
            const payload = iv.toString('hex') + ':' + encrypted.toString('hex');
            fs.writeFileSync(this.STORAGE_FILE, payload);
        } catch (e) {
            console.error("❌ Error guardando bóveda:", e);
        }
    }

    /**
     * 4. CARGAR ESTADO (DESENCRIPTAR)
     * Lee del disco y verifica que el hardware sea el mismo.
     */
    static loadSecureData(): any {
        if (!fs.existsSync(this.STORAGE_FILE)) return null;

        try {
            const content = fs.readFileSync(this.STORAGE_FILE, 'utf-8');
            const [ivHex, dataHex] = content.split(':');
            if (!ivHex || !dataHex) return null;

            const key = this.getMachineEncryptionKey();
            const iv = Buffer.from(ivHex, 'hex');
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);

            let decrypted = decipher.update(Buffer.from(dataHex, 'hex'));
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            
            return JSON.parse(decrypted.toString());
        } catch (error) {
            // Si falla es porque la clave (hardware) cambió
            console.error("🚨 ALERTA DE SEGURIDAD (HSM): Hardware no coincide o bóveda corrupta.");
            return null;
        }
    }
}
