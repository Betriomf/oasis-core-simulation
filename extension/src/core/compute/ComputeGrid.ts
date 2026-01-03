import { Economy } from '../constants/modules/Economy';
import * as os from 'os';

// --- 🌌 CONSTANTES UNIVERSALES (LA JOYA DE LA CORONA) ---
// Definimos los límites físicos del cómputo para calcular la eficiencia real.
export const UNIVERSAL_CONSTANTS = {
    PLANCK_LENGTH: 1.616255e-35,
    BOLTZMANN: 1.380649e-23,
    LANDAUER_LIMIT: 0.017, // eV mínimo por bit borrado a 300K (Límite termodinámico)
    JOULES_PER_EV: 1.60218e-19,
    CO2_PER_KWH: 0.475 // Media global (kg CO2 por kWh)
};

// --- ORÁCULO DE ENERGÍA (SIMULADO) ---
// TODO: En v7.0, conectar esto a Chainlink Feed para precios dinámicos reales.
const ENERGY_RATES_BY_REGION: any = {
    'EU_SPAIN': 0.18,   // €/kWh
    'US_EAST': 0.12,    // $/kWh
    'ASIA_JP': 0.22,    // ¥/kWh
    'LATAM_BR': 0.14,   // $/kWh
    'GLOBAL_AVG': 0.15
};

export type TaskCategory = 'AI_ML' | 'RENDER' | 'SCIENCE' | 'DATA' | 'BLOCKCHAIN';

export interface TaskProfile {
    id: string;
    name: string;
    category: TaskCategory;
    complexityFactor: number; // Multiplicador de dificultad
    requiresVRAM: number;     // GB mínimos
    isParallel: boolean;      // ¿Soporta Swarm?
    energyIntensity: number;  // kW promedio de consumo (Potencia)
}

export const TASK_CATALOG: TaskProfile[] = [
    { id: 'LLM_TUNE', name: 'Fine-tuning LLM (Llama/Mistral)', category: 'AI_ML', complexityFactor: 1.5, requiresVRAM: 24, isParallel: false, energyIntensity: 0.45 },
    { id: 'RENDER_3D', name: 'Render 3D (Blender/Cycles)', category: 'RENDER', complexityFactor: 1.0, requiresVRAM: 4, isParallel: true, energyIntensity: 0.25 },
    { id: 'VFX_CGI', name: 'VFX / CGI Frame Processing', category: 'RENDER', complexityFactor: 1.3, requiresVRAM: 8, isParallel: true, energyIntensity: 0.30 },
    { id: 'GENOME_SEQ', name: 'Secuenciación Genómica', category: 'SCIENCE', complexityFactor: 2.0, requiresVRAM: 12, isParallel: true, energyIntensity: 0.35 },
    { id: 'ZK_PROOF', name: 'Generación ZK-Proofs', category: 'BLOCKCHAIN', complexityFactor: 1.1, requiresVRAM: 8, isParallel: true, energyIntensity: 0.40 }
];

// --- CEREBRO DE ESTIMACIÓN ---
export class GridEstimator {

    /**
     * 1. ESTADO DE LA RED (GOSSIP PROTOCOL)
     * Simula la salud del enjambre global.
     */
    static async getLiveNetworkStatus() {
        // Simulamos fluctuación de oferta/demanda
        const activeNodes = Math.floor(Math.random() * (800 - 150) + 150);
        const utilization = Math.random(); 
        
        // Surge Pricing: Si la red está llena, el precio sube.
        let basePrice = 0.30;
        let surgeMultiplier = 1 + (utilization * utilization);
        let finalPrice = basePrice * surgeMultiplier;

        let color = "🟢";
        if (utilization > 0.5) color = "🟡";
        if (utilization > 0.85) color = "🔴";

        return {
            activeNodes: activeNodes,
            totalCapacityTB: Math.floor(activeNodes * 0.024), 
            utilizationPercent: utilization,
            dynamicPrice: finalPrice,
            statusColor: color
        };
    }

    /**
     * 2. PROYECCIÓN FÍSICA Y ECONÓMICA (EL TAXÍMETRO DE EINSTEIN)
     * Calcula costes basándose en física real, no especulación.
     */
    static calculatePhysicsProjection(task: TaskProfile, quantity: number, networkState: any) {
        // A. Estimación de Tiempo
        let estimatedHours = (quantity * task.complexityFactor) / 100; 
        if (estimatedHours < 0.1) estimatedHours = 0.1;

        // B. Física: Energía Consumida (kWh) = Potencia (kW) * Tiempo (h)
        const totalEnergyKWh = task.energyIntensity * estimatedHours;

        // C. Economía: Coste Eléctrico Base (Coste Marginal)
        // Por defecto usamos España para la demo, pero esto debería detectar IP.
        const localRate = ENERGY_RATES_BY_REGION['EU_SPAIN'];
        const energyCostFiat = totalEnergyKWh * localRate;

        // D. Termodinámica: Eficiencia Landauer (La métrica científica)
        // Calculamos cuántos Julios teóricos costaría procesar esto vs realidad.
        // Bit ops estimadas ~ quantity * 1e9 (GigaOps)
        const estimatedOps = quantity * 1e9 * task.complexityFactor;
        const theoreticalJoules = estimatedOps * UNIVERSAL_CONSTANTS.LANDAUER_LIMIT * UNIVERSAL_CONSTANTS.JOULES_PER_EV;
        const realJoules = totalEnergyKWh * 3.6e6; // 1 kWh = 3.6MJ
        // Eficiencia = Energía Mínima Teórica / Energía Real Gastada
        const thermodynamicEff = (theoreticalJoules / realJoules).toExponential(2);

        // E. Ecología: Huella de Carbono
        const carbonFootprint = totalEnergyKWh * UNIVERSAL_CONSTANTS.CO2_PER_KWH;

        // F. Precios de Mercado (Comparativa)
        const oasisIncentive = 0.10; // Margen para el proveedor (vecino)
        const priceSwarmTotal = (energyCostFiat + (estimatedHours * oasisIncentive)); 
        const priceSwarmHourly = priceSwarmTotal / estimatedHours;

        // Precios externos (Centralizados e ineficientes)
        const marketAvg = 4.40; 
        const priceAkash = 1.80;
        const priceRender = 2.50;

        return {
            vram: task.requiresVRAM,
            hours: estimatedHours,
            
            // Datos Físicos
            energyUsed: totalEnergyKWh.toFixed(2), // kWh
            carbonParams: `${carbonFootprint.toFixed(3)} kgCO2`,
            thermoEff: thermodynamicEff, // Métrica Landauer
            localRateUsed: localRate,
            
            // Datos Económicos
            costSwarm: estimatedHours * networkState.dynamicPrice, // Precio de mercado P2P actual
            costAkash: estimatedHours * priceAkash,
            costRender: estimatedHours * priceRender,
            costLegacy: estimatedHours * marketAvg,
            pricePerHourSwarm: networkState.dynamicPrice
        };
    }
}

// --- ORQUESTADOR PRINCIPAL ---
export class ComputeGrid {

    static async deployWorkload(task: TaskProfile, projection: any, choiceIndex: string) {
        
        let providerName = "";
        let totalCost = 0;
        let currency = "USDC";
        
        if (choiceIndex === '3') { 
            providerName = "Oasis Swarm (P2P)";
            totalCost = projection.costSwarm;
        } else if (choiceIndex === '2') {
            providerName = "Akash Network";
            totalCost = projection.costAkash;
            currency = "AKT";
        } else if (choiceIndex === '4') {
            providerName = "Render Network";
            totalCost = projection.costRender;
            currency = "RNDR";
        }

        const feePercentage = Economy.RAMSEY_FEES.TIER_CONSUMER;
        const protocolFee = totalCost * feePercentage;
        const finalAmount = totalCost + protocolFee;

        // MOSTRAR LA JOYA DE LA CORONA (FÍSICA) SI ES OASIS
        if (choiceIndex === '3') {
            console.log(`\n⚛️  ANÁLISIS TERMODINÁMICO (OASIS PROTOCOL):`);
            console.log(`   > ⚡ Energía Real:       ${projection.energyUsed} kWh`);
            console.log(`   > 🌍 Huella Carbono:     ${projection.carbonParams}`);
            console.log(`   > 🌡️  Eficiencia:         Landauer Limit x ${projection.thermoEff}`);
            console.log(`   > ✅ Transparencia: Pagarás por Julios procesados, no por especulación.`);
            await new Promise(r => setTimeout(r, 1500));
        }

        console.log(`\n⚖️  AVISO LEGAL: Interactuando con ${providerName}.`);
        console.log(`🚀 INICIANDO PAGO (${finalAmount.toFixed(4)} ${currency})...`);
        
        if (choiceIndex === '3') {
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
            process.stdout.write(`   > [Tick ${i}] ⚡ Energía Pagada... ${paid.toFixed(4)} USDC\r`);
        }
        console.log("\n   > ✅ Tarea finalizada.");
    }

    private static async simulateCryptoPayment(provider: string, amount: number, currency: string) {
        console.log(`   > 🔒 Bloqueando fondos en Smart Contract...`);
        await new Promise(r => setTimeout(r, 1000));
        console.log(`   > ✅ TAREA EN PROCESO.`);
    }

    // Dashboard de Ganancias
    static async startProviderMode() {
        console.log("\n🤑 MODO PROVEEDOR ACTIVADO (Oasis Node)");
        console.log("   > Tu hardware está ofertando su Entropía Negativa al mercado.");
    }
}
