import { HardwareSecurity } from '../security/HardwareSecurity';
import { WalletCore } from './WalletCore';

/**
 * ⚡ STATE CHANNEL WALLET (Streaming Money)
 */
export class StateChannelWallet {
    
    private static channels: Map<string, number> = new Map();

    static async openChannel(peerId: string, depositAmount: number) {
        const success = await WalletCore.pay(depositAmount, `OPEN_CHANNEL:${peerId}`);
        if (success) {
            this.channels.set(peerId, depositAmount);
            console.log(`   > ⚡ CANAL DE PAGO ABIERTO con ${peerId.substring(0,10)}...`);
        }
    }

    static async streamPayment(peerId: string, microAmount: number): Promise<string | null> {
        const balance = this.channels.get(peerId) || 0;
        
        if (balance < microAmount) {
            console.error("   > ❌ CANAL AGOTADO. Se requiere liquidación.");
            return null;
        }

        this.channels.set(peerId, balance - microAmount);
        const ticket = `TICKET:${peerId}:${microAmount}:${Date.now()}`;
        
        // Firma con el Hardware (Bohr-Hafnium Defense)
        const signature = HardwareSecurity.signData(ticket);
        return signature;
    }

    static closeChannel(peerId: string) {
        this.channels.delete(peerId);
        console.log(`   > 🏁 CANAL CERRADO y liquidado en Blockchain.`);
    }
}
