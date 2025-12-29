import { ethers } from 'ethers';
import { HardwareSecurity } from './HardwareSecurity';

/**
 * 🔥 PHOENIX RECOVERY MODULE (Ethers.js Edition)
 * Genera identidades soberanas usando criptografía moderna.
 */
export class PhoenixRecovery {

    /**
     * Crea una nueva identidad criptográfica desde cero.
     * Genera: Mnemotecnia (12 palabras), Clave Privada y Dirección.
     */
    static async createFreshIdentity(): Promise<any> {
        console.log("   > 🔥 Generando Identidad Fénix (Curva Elíptica secp256k1)...");
        
        // Usamos Ethers v6 para crear una wallet aleatoria con entropía fuerte
        const wallet = ethers.Wallet.createRandom();
        
        const identity = {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic?.phrase,
            publicKey: wallet.publicKey,
            createdAt: Date.now()
        };

        // Guardamos inmediatamente en la Bóveda de Hardware
        HardwareSecurity.saveSecureData(identity);
        
        return identity;
    }

    static recoverFromMnemonic(phrase: string): any {
        try {
            const wallet = ethers.Wallet.fromPhrase(phrase);
            return {
                address: wallet.address,
                privateKey: wallet.privateKey
            };
        } catch (e) {
            console.error("   > ❌ Error recuperando identidad:", e);
            return null;
        }
    }
}
