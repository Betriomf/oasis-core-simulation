import { ethers } from 'ethers';
import { HardwareSecurity } from '../security/HardwareSecurity';

/**
 * 💎 WALLET CORE (Ethers.js Edition)
 * Gestión de activos y firmas digitales.
 */
export class WalletCore {
    
    private static wallet: ethers.Wallet | null = null;
    private static balance: number = 0.0; // Mock balance (SBN)

    static initializeWallet() {
        const data = HardwareSecurity.loadSecureData();
        
        if (data && data.privateKey) {
            // Rehidratamos la wallet desde la clave privada guardada
            this.wallet = new ethers.Wallet(data.privateKey);
            // console.log(`   > 💎 Wallet Cargada: ${this.wallet.address.substring(0, 10)}...`);
        } else {
            // Si no hay datos, esperamos a que PhoenixRecovery cree una.
            console.log("   > ⚠️ Wallet no inicializada (Esperando identidad).");
        }
    }

    static getAddress(): string {
        return this.wallet ? this.wallet.address : "0x0000000000000000000000000000000000000000";
    }

    static getBalance(): number {
        return this.balance;
    }

    static receiveMockDeposit(amount: number) {
        this.balance += amount;
        console.log(`   > 💰 Depósito recibido: +${amount} SPN`);
    }

    /**
     * Pagar (Simulado Off-chain para Canales de Estado)
     */
    static async pay(amount: number, concept: string): Promise<boolean> {
        if (this.balance >= amount) {
            this.balance -= amount;
            // Aquí firmaríamos la transacción real
            // const signature = await this.wallet.signMessage(concept);
            return true;
        }
        return false;
    }
}
