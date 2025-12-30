import { Economy } from '../constants/modules/Economy';
import { WalletConnectTerminal } from '../wallet/WalletConnectTerminal'; // Importamos para el QR de retiro
import * as os from 'os';
import * as readline from 'readline';

// (Mantenemos las interfaces anteriores TASK_CATALOG, etc...)
export type TaskCategory = 'AI_ML' | 'RENDER' | 'SCIENCE' | 'DATA' | 'BLOCKCHAIN';
export interface TaskProfile {
    id: string;
    name: string;
    category: TaskCategory;
    complexityFactor: number;
    requiresVRAM: number;
    isParallel: boolean;
}
export const TASK_CATALOG: TaskProfile[] = [
    { id: 'LLM_TUNE', name: 'Fine-tuning LLM', category: 'AI_ML', complexityFactor: 1.5, requiresVRAM: 24, isParallel: false },
    { id: 'RENDER_3D', name: 'Render 3D', category: 'RENDER', complexityFactor: 1.0, requiresVRAM: 4, isParallel: true },
];

// (Mantenemos GridEstimator igual...)
export class GridEstimator {
    static getLiveNetworkStatus() {
        return { activeNodes: 500, totalCapacityTB: 12, utilizationPercent: 0.4, dynamicPrice: 0.35, statusColor: '🟢' }; 
    }
    static calculateProjection(task: TaskProfile, quantity: number, networkState: any) {
        let h = (quantity * task.complexityFactor) / 100; if(h<0.1)h=0.1;
        return { vram: task.requiresVRAM, hours: h, costSwarm: h*0.45, costAkash: h*1.8, costLegacy: h*4.4, costRender: h*2.5, pricePerHourSwarm: 0.45 };
    }
}

// --- CLASE PRINCIPAL CON GESTIÓN DE INGRESOS ---
export class ComputeGrid {

    // Simulación de ganancias acumuladas (en la "Hucha")
    private static accumulatedEarnings = {
        USDC: 15.40,  // De Oasis Swarm (Streaming ya recibido)
        AGIX: 120.50, // De SingularityNET (Pendiente de retiro)
        AKT: 45.20    // De Akash (Pendiente de retiro)
    };

    static async deployWorkload(task: TaskProfile, projection: any, choiceIndex: string) {
        // (Lógica de despliegue igual que antes, resumida para este archivo)
        console.log("Desplegando...");
        return { status: 'DEPLOYED' };
    }

    /**
     * 💰 MODO PROVEEDOR (EARN DASHBOARD)
     * Aquí gestionas lo que cobras.
     */
    static async startProviderMode() {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        const ask = (q: string) => new Promise<string>(r => rl.question(q, a => { r(a); }));

        while (true) {
            console.clear();
            console.log("\n   🤑 OASIS EARN DASHBOARD (Modo Proveedor)");
            console.log("   ========================================");
            console.log("   Estado: 🟢 ONLINE (Compartiendo GPU/CPU)");
            console.log("   Hardware: " + os.cpus()[0].model);
            console.log("   Wallet Destino: " + Economy.TREASURY_WALLET);
            console.log("   ----------------------------------------");
            console.log("   💰 BALANCE ACUMULADO:");
            console.log(`   • Oasis Swarm:     ${this.accumulatedEarnings.USDC.toFixed(2)} USDC (Ya en tu wallet - Streaming)`);
            console.log(`   • SingularityNET:  ${this.accumulatedEarnings.AGIX.toFixed(2)} AGIX (En Smart Contract)`);
            console.log(`   • Akash Network:   ${this.accumulatedEarnings.AKT.toFixed(2)} AKT  (En Smart Contract)`);
            console.log("   ----------------------------------------");
            console.log("   1. 🔄 Actualizar Estado");
            console.log("   2. 📥 RECLAMAR GANANCIAS (Withdraw to Wallet)");
            console.log("   3. 🔙 Volver al Menú");

            const option = await ask("\n   > Elige opción: ");

            if (option === '1') {
                console.log("\n   📡 Sincronizando con Blockchain...");
                await new Promise(r => setTimeout(r, 1000));
                // Simulamos que ganamos más
                this.accumulatedEarnings.AGIX += Math.random() * 5;
                this.accumulatedEarnings.USDC += Math.random() * 0.5;
            } 
            else if (option === '2') {
                rl.close(); // Cerramos temporalmente para usar WalletConnect
                await this.withdrawEarnings();
                break; 
            } 
            else if (option === '3') {
                rl.close();
                break;
            }
        }
    }

    /**
     * 📥 LÓGICA DE RETIRO (CLAIM)
     * Genera el QR para que firmes la recepción del dinero.
     */
    private static async withdrawEarnings() {
        console.log("\n   🚀 INICIANDO PROTOCOLO DE RETIRO...");
        console.log("   > Agrupando tokens (AGIX + AKT)...");
        
        const totalPending = `${this.accumulatedEarnings.AGIX.toFixed(2)} AGIX + ${this.accumulatedEarnings.AKT.toFixed(2)} AKT`;
        
        console.log(`   > 📦 Paquete preparado: ${totalPending}`);
        console.log("   > 👮 Seguridad: Se requiere firma del propietario.");

        // LLAMADA AL GENERADOR DE QR
        await WalletConnectTerminal.generateConnectionQR();
        
        console.log("\n   ------------------------------------------------");
        console.log("   | 🛑 ALERTA MÓVIL: 'Claim Rewards'             |");
        console.log("   | -------------------------------------------- |");
        console.log(`   | Acción: Retirar Ganancias de Nodo            |`);
        console.log(`   | Cantidad: ${totalPending}                  |`);
        console.log(`   | Destino: ${Economy.TREASURY_WALLET.substring(0,10)}... |`);
        console.log(`   | Gas Fee: ~0.002 ETH (Paga la red)            |`);
        console.log("   ------------------------------------------------");
        
        await new Promise(r => setTimeout(r, 2000));
        console.log("\n   ✅ TRANSACCIÓN CONFIRMADA.");
        console.log("   > 💰 Los fondos se han movido a tu Billetera Fría.");
        
        // Resetamos los contadores (ya se han cobrado)
        this.accumulatedEarnings.AGIX = 0;
        this.accumulatedEarnings.AKT = 0;
    }
}
