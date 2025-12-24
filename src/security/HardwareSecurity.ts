import * as fs from 'fs';
import * as os from 'os';
import { createHmac, randomBytes, createHash, createCipheriv, createDecipheriv } from 'crypto';

/**
 * 🛡️ HARDWARE SECURITY v4.1 - "THE BOHRIUM FORTRESS"
 * FUSIÓN FINAL:
 * 1. Persistencia Física (AES-256 atado a la CPU).
 * 2. Memoria Efímera (Bohr-Hafnium) para firmas anti-virus.
 * 3. Fragmentación de Claves (Shards).
 */
export class HardwareSecurity {

    private static readonly STORAGE_FILE = './oasis_secure_vault.enc';
    
    // Memoria de seguridad para firmas (Fragmentada y Efímera)
    private static secureMemory: Buffer[] = [];

    // ==========================================================
    // 1. CAPA FÍSICA (Persistencia en Disco)
    // ==========================================================

    /**
     * Genera la clave maestra de encriptación basada en la CPU.
     * Si cambias de PC, esta clave cambia y no podrás leer el disco.
     */
    private static getMachineEncryptionKey(): string {
        const cpu = os.cpus()[0]?.model || 'UNKNOWN_CPU';
        const totalMem = os.totalmem();
        const platform = os.platform();
        const arch = os.arch();

        const rawId = `${platform}-${arch}-${cpu}-${totalMem}`;
        return createHash('sha256').update(rawId).digest('hex').substring(0, 32);
    }

    /**
     * Guarda el estado (Wallet, Identity) encriptado en el disco.
     */
    static saveSecureData(data: any) {
        try {
            const key = this.getMachineEncryptionKey();
            const iv = randomBytes(16);
            const cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);

            let encrypted = cipher.update(JSON.stringify(data));
            encrypted = Buffer.concat([encrypted, cipher.final()]);

            const payload = iv.toString('hex') + ':' + encrypted.toString('hex');
            fs.writeFileSync(this.STORAGE_FILE, payload);
        } catch (e) {
            console.error("❌ Error guardando bóveda:", e);
        }
    }

    /**
     * Carga el estado desencriptándolo con la huella de la CPU.
     */
    static loadSecureData(): any {
        if (!fs.existsSync(this.STORAGE_FILE)) return null;

        try {
            const content = fs.readFileSync(this.STORAGE_FILE, 'utf-8');
            const [ivHex, dataHex] = content.split(':');
            if (!ivHex || !dataHex) return null;

            const key = this.getMachineEncryptionKey();
            const iv = Buffer.from(ivHex, 'hex');
            const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
            
            let decrypted = decipher.update(Buffer.from(dataHex, 'hex'));
            decrypted = Buffer.concat([decrypted, decipher.final()]);

            return JSON.parse(decrypted.toString());
        } catch (error) {
            console.error("🚨 ALERTA DE SEGURIDAD: Hardware no coincide o bóveda corrupta.");
            return null;
        }
    }

    // ==========================================================
    // 2. CAPA CUÁNTICA (Memoria RAM Efímera)
    // ==========================================================

    /**
     * Genera fragmentos de identidad temporal para la sesión actual.
     */
    static generateIdentity(): void {
        this.wipeMemory();
        // Generamos 3 fragmentos de entropía pura
        const shardA = randomBytes(32);
        const shardB = randomBytes(32);
        const shardC = randomBytes(32);
        this.secureMemory = [shardA, shardB, shardC];
        // console.log("   > 🔐 IDENTITY SHARDS GENERATED (RAM).");
    }

    /**
     * FIRMA EN ENCLAVE EFÍMERO (Bohr-Hafnium Defense)
     * La clave se reconstruye, firma y se autodestruye en milisegundos.
     */
    static signData(payload: string): string {
        if (this.secureMemory.length === 0) this.generateIdentity();

        try {
            // A. RECONSTRUCCIÓN (Solo dura milisegundos)
            const ephemeralKey = Buffer.concat(this.secureMemory);

            // B. FIRMA
            const hmac = createHmac('sha256', ephemeralKey);
            hmac.update(payload);
            const signature = hmac.digest('hex');

            // C. PROTOCOLO BOHRIO (Autodestrucción)
            // Llenamos de ceros la variable para cegar a los virus de RAM
            ephemeralKey.fill(0); 
            
            return signature;

        } catch (error) {
            this.wipeMemory();
            throw new Error("SECURITY_COLLAPSE: Memory Integrity Violation.");
        }
    }

    static wipeMemory() {
        if (this.secureMemory.length > 0) {
            this.secureMemory.forEach(buffer => buffer.fill(0));
            this.secureMemory = [];
        }
    }

    // Alias para compatibilidad con WalletCore
    static hashData(input: string): string {
        return this.signData(input);
    }

    // ==========================================================
    // 3. CAPA DE CÓMPUTO (Proof of Work)
    // ==========================================================

    static runProofOfWork(): number {
        const start = performance.now();
        let pi = 0;
        let k = 1;
        // Reducimos iteraciones para no ralentizar el inicio en dev
        for (let i = 0; i < 500000; i++) {
            pi += (4 / k) * (i % 2 === 0 ? 1 : -1);
            k += 2;
        } 
        const duration = performance.now() - start;
        if (duration < 0.1) throw new Error("CPU SPOOFING DETECTED.");
        return duration;
    }
}
