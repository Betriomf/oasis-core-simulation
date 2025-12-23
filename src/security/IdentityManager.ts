import * as os from 'os';
import * as crypto from 'crypto';

/**
 * 🔐 IDENTITY MANAGER
 * "Tu hardware es tu llave. Si cambias de cuerpo, pierdes el alma."
 * Gestiona la identidad criptográfica anclada a la máquina física.
 */
export class IdentityManager {

  /**
   * 1. GENERAR HUELLA DE HARDWARE (Fingerprint)
   * Crea un hash único basado en componentes inmutables.
   */
  static generateHardwareHash(): string {
    // A. CPU Info
    const cpu = os.cpus()[0]?.model || 'UNKNOWN_CPU';
    
    // B. Arquitectura y Plataforma
    const arch = os.arch();
    const platform = os.platform();
    
    // C. Memoria Total
    const memory = os.totalmem().toString();

    // D. MAC Address (Interfaces de red)
    const networks = os.networkInterfaces();
    let mac = '';
    for (const key in networks) {
        const net = networks[key];
        if (net) {
            const valid = net.find(i => !i.internal && i.mac !== '00:00:00:00:00:00');
            if (valid) {
                mac = valid.mac;
                break;
            }
        }
    }

    // MEZCLA ALQUÍMICA
    const rawFingerprint = `${cpu}-${arch}-${platform}-${memory}-${mac}`;
    
    // HASHING SHA-256
    return crypto.createHash('sha256').update(rawFingerprint).digest('hex');
  }

  /**
   * 2. VERIFICAR INTEGRIDAD
   * Compara el hash actual con el guardado.
   */
  static verifyIdentity(storedHash: string): 'ACCESS_GRANTED' | 'ACCESS_DENIED_HARDWARE_MISMATCH' {
    const currentHash = this.generateHardwareHash();
    
    if (currentHash === storedHash) {
        return 'ACCESS_GRANTED';
    } else {
        return 'ACCESS_DENIED_HARDWARE_MISMATCH';
    }
  }
}
