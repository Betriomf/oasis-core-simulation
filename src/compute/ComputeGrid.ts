import { Economy } from '../constants/modules/Economy';

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
    { id: 'LLM_TUNE', name: 'Fine-tuning LLM (Llama/Mistral)', category: 'AI_ML', complexityFactor: 1.5, requiresVRAM: 24, isParallel: false },
    { id: 'RENDER_3D', name: 'Render 3D (Blender/Cycles)', category: 'RENDER', complexityFactor: 1.0, requiresVRAM: 4, isParallel: true },
    { id: 'VFX_CGI', name: 'VFX / CGI Frame Processing', category: 'RENDER', complexityFactor: 1.3, requiresVRAM: 8, isParallel: true },
];

// --- NUEVO: INTERFAZ DE ESTADO DE RED ---
export interface NetworkState {
    activeNodes: number;      // Cuánta gente hay conectada
    totalCapacityTB: number;  // RAM/VRAM Total en la red
    utilizationPercent: number; // % Ocupado (Saturación)
    dynamicPrice: number;     // Precio ajustado por demanda
    statusColor: string;      // 🟢 🟡 🔴
}

export class GridEstimator {

    /**
     * 📡 ESCANER DE RED (Network Discovery)
     * Simula la conexión P2P para ver oferta y demanda real.
     */
    static async getLiveNetworkStatus(): Promise<NetworkState> {
        // Simulamos fluctuación del mercado
        const activeNodes = Math.floor(Math.random() * (800 - 150) + 150); // Entre 150 y 800 nodos
        const utilization = Math.random(); // 0.0 a 1.0 (0% a 100%)
        
        // CÁLCULO DE PRECIO DINÁMICO (Surge Pricing)
        // Precio base: $0.30. Si está lleno, sube hasta $0.80.
        let basePrice = 0.30;
        let surgeMultiplier = 1 + (utilization * utilization); // Exponencial
        let finalPrice = basePrice * surgeMultiplier;

        let color = "🟢";
        if (utilization > 0.5) color = "🟡";
        if (utilization > 0.85) color = "🔴";

        return {
            activeNodes: activeNodes,
            totalCapacityTB: Math.floor(activeNodes * 0.024), // ~24GB VRAM media por nodo
            utilizationPercent: utilization,
            dynamicPrice: finalPrice,
            statusColor: color
        };
    }

    static calculateProjection(task: TaskProfile, quantity: number, networkState: NetworkState) {
        let estimatedHours = (quantity * task.complexityFactor) / 100; 
        if (estimatedHours < 0.1) estimatedHours = 0.1;

        // PRECIOS DE MERCADO
        const priceSwarm = networkState.dynamicPrice; // ¡Precio Real Variable!
        const priceAkash = 1.80;  
        const priceRender = 2.50; 
        const marketAvg = 4.40;   // Legacy Cloud

        return {
            vram: task.requiresVRAM,
            hours: estimatedHours,
            costSwarm: estimatedHours * priceSwarm,
            costAkash: estimatedHours * priceAkash,
            costRender: estimatedHours * priceRender,
            costLegacy: estimatedHours * marketAvg,
            pricePerHourSwarm: priceSwarm // Para mostrar el precio unitario
        };
    }
}

export class ComputeGrid {

    static async deployWorkload(task: TaskProfile, projection: any, choiceIndex: string) {
        
        let providerName = "";
        let totalCost = 0;
        let currency = "USDC";
        let paymentType = "";
        
        if (choiceIndex === '3') { 
            providerName = "Oasis Swarm (P2P)";
            totalCost = projection.costSwarm;
            paymentType = "STREAMING"; 
        } else if (choiceIndex === '2') {
            providerName = "Akash Network";
            totalCost = projection.costAkash;
            currency = "AKT";
            paymentType = "ESCROW_BLOCK"; 
        } else if (choiceIndex === '4') {
            providerName = "Render Network";
            totalCost = projection.costRender;
            currency = "RNDR";
            paymentType = "ESCROW_SMART"; 
        }

        const feePercentage = Economy.RAMSEY_FEES.TIER_CONSUMER;
        const protocolFee = totalCost * feePercentage;
        const finalAmount = totalCost + protocolFee;

        // DISCLAIMER DE DISPONIBILIDAD
        if (choiceIndex === '3') {
            console.log(`\n🌊 VERIFICANDO DISPONIBILIDAD DE NODOS VECINOS...`);
            await new Promise(r => setTimeout(r, 1000));
            console.log(`   > ✅ Recursos bloqueados. La tarifa se congela por 10 min.`);
        }

        console.log(`\n⚖️  AVISO LEGAL: Interactuando con ${providerName}.`);
        console.log("   Oasis Core actúa como interfaz (Mero Conducto).");
        
        console.log(`\n🚀 INICIANDO PAGO...`);
        
        if (paymentType === 'STREAMING') {
            await this.simulateStreamingPayment(finalAmount, projection.hours);
        } else {
            await this.simulateCryptoPayment(providerName, finalAmount, currency);
        }

        return { status: 'DEPLOYED' };
    }

    private static async simulateStreamingPayment(totalAmount: number, hours: number) {
        console.log("   > 🌊 Abriendo Canal Superfluid...");
        const amountPerSecond = totalAmount / (hours * 3600);
        
        for (let i = 1; i <= 3; i++) {
            await new Promise(r => setTimeout(r, 600));
            const paid = amountPerSecond * i * 100;
            process.stdout.write(`   > [Tick ${i}] 🟢 Nodo Activo... Pagado: ${paid.toFixed(4)} USDC\r`);
        }
        console.log("\n   > ✅ Tarea finalizada.");
    }

    private static async simulateCryptoPayment(provider: string, amount: number, currency: string) {
        console.log(`   > 🔒 Enviando ${amount.toFixed(4)} ${currency} al Smart Contract...`);
        await new Promise(r => setTimeout(r, 1000));
        console.log(`   > ✅ TAREA EN PROCESO (On-Chain).`);
    }

    static async startProviderMode() {
        console.log("\n🤑 MODO PROVEEDOR ACTIVADO");
        console.log("   > Tu nodo ahora es visible en el mapa de calor de Oasis.");
    }
}
