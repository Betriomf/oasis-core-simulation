import * as fs from 'fs';
import * as os from 'os';
import { createHmac, randomBytes, createHash, createCipheriv, createDecipheriv } from 'crypto';

/**
 * 🛡️ HARDWARE SECURITY MODULE
 * Gestiona la "Física de la Identidad" y la Persistencia Segura.
 */
export class HardwareSecurity {

    private static readonly STORAGE_FILE = './oasis_secure_vault.enc';
    private static secureMemory: Buffer[] = [];
    
    // Lista negra de IPs o PeerIDs maliciosos (DenyList)
    private static readonly BLACKLIST = new Set<string>([
        "/ip4/192.168.1.666/tcp/80", // Ejemplo
        // Aquí se cargarían IPs de granjas de bots
    ]);

    // --- 1. VERIFICACIÓN DE RED (El Portero) ---

    static isBlacklisted(address: string): boolean {
        // Verifica si la dirección está prohibida
        return this.BLACKLIST.has(address);
    }

    static verifyOrganicSignature(address: string): boolean {
        // En producción: Verificaría la firma criptográfica SBT.
        // Simulación: Validamos que la dirección tenga longitud mínima
        if (!address || address.length < 5) return false;
        
        // Simulamos que el 90% de las conexiones son orgánicas
        return Math.random() > 0.1; 
    }

    static getLocalMetrics() {
        return { cpu: os.loadavg()[0], ram: os.freemem() };
    }

    // --- 2. PERSISTENCIA FÍSICA (La Bóveda) ---

    private static getMachineEncryptionKey(): string {
        const rawId = `${os.platform()}-${os.arch()}-${os.cpus()[0]?.model}-${os.totalmem()}`;
        return createHash('sha256').update(rawId).digest('hex').substring(0, 32);
    }

    static saveSecureData(data: any) {
        try {
            const key = this.getMachineEncryptionKey();
            const iv = randomBytes(16);
            const cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);
            let encrypted = cipher.update(JSON.stringify(data));
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            fs.writeFileSync(this.STORAGE_FILE, iv.toString('hex') + ':' + encrypted.toString('hex'));
        } catch (e) { console.error("❌ Error guardando bóveda:", e); }
    }

    static loadSecureData(): any {
        if (!fs.existsSync(this.STORAGE_FILE)) return null;
        try {
            const content = fs.readFileSync(this.STORAGE_FILE, 'utf-8');
            const [ivHex, dataHex] = content.split(':');
            const key = this.getMachineEncryptionKey();
            const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(ivHex, 'hex')); 
            let decrypted = decipher.update(Buffer.from(dataHex, 'hex'));
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return JSON.parse(decrypted.toString());
        } catch (error) { return null; }
    }

    // --- 3. MEMORIA EFÍMERA (Defensa Bohr) ---

    static signData(payload: string): string {
        if (this.secureMemory.length === 0) this.generateIdentity();
        try {
            const ephemeralKey = Buffer.concat(this.secureMemory);
            const hmac = createHmac('sha256', ephemeralKey);
            hmac.update(payload);
            const signature = hmac.digest('hex');
            ephemeralKey.fill(0); // Zeroización inmediata
            return signature;
        } catch (error) { this.wipeMemory(); throw new Error("SECURITY_COLLAPSE"); }
    }

    static generateIdentity(): void {
        this.wipeMemory();
        this.secureMemory = [randomBytes(32), randomBytes(32), randomBytes(32)];
    }

    static wipeMemory() {
        if (this.secureMemory.length > 0) {
            this.secureMemory.forEach(buffer => buffer.fill(0));
            this.secureMemory = [];
        }
    }

    static hashData(input: string): string { return this.signData(input); }
    static runProofOfWork(): number { return 0.1; } 
}
