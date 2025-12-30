import { HardwareSecurity } from '../security/HardwareSecurity';
import { IdentityManager } from '../security/IdentityManager';
import { PhoenixRecovery } from '../security/PhoenixRecovery';
import { WalletConnectTerminal } from '../wallet/WalletConnectTerminal';
import { HolographicDisk } from '../storage/HolographicDisk';
import { DigitalVacuum } from '../defi/DigitalVacuum'; 
import { OasisSapphire } from '../bridge/OasisSapphire';
import { Watchtower } from '../security/Watchtower';
import { SingularityBridge, AIProvider } from '../ai/SingularityBridge';
import { ComputeGrid, TASK_CATALOG, GridEstimator } from '../compute/ComputeGrid';
import * as readline from 'readline';

let PERSISTENT_MEMORY = HardwareSecurity.loadSecureData() || {
    isFirstRun: true, hardwareHash: '', activeIdentity: null,
};
if (!PERSISTENT_MEMORY.hardwareHash) {
    PERSISTENT_MEMORY.hardwareHash = PhoenixRecovery.getCurrentHardwareHash();
    HardwareSecurity.saveSecureData(PERSISTENT_MEMORY);
}

const askQuestion = (query: string) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise<string>(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
};

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const inputParam = args.slice(1).join(' ');

  switch (command) {
    case 'grid':
        console.log("\n   ⚡ OASIS COMPUTE GRID (Decentralized Marketplace)");
        console.log("   ================================================");
        console.log("   1. 📤 ALQUILAR POTENCIA");
        console.log("   2. 📥 OFRECER POTENCIA");
        
        const mode = await askQuestion("   > Elige (1-2): ");

        if (mode === '2') {
            await ComputeGrid.startProviderMode();
            break;
        }

        // --- MENÚ DE TAREAS ---
        console.log("\n   SELECCIONA TAREA:");
        console.log("   A. 🧠 IA / Machine Learning");
        console.log("   B. 🎨 Renderizado 3D (Blender/CGI)");
        
        const cat = await askQuestion("   > Elige (A/B): ");
        const categoryFilter = cat.toUpperCase() === 'A' ? 'AI_ML' : 'RENDER';
        const availableTasks = TASK_CATALOG.filter(t => t.category === categoryFilter);
        
        availableTasks.forEach((t, i) => console.log(`   ${i+1}. ${t.name}`));
        const tIdx = await askQuestion(`   > Elige Tarea (1-${availableTasks.length}): `);
        const selectedTask = availableTasks[parseInt(tIdx)-1];

        if (!selectedTask) break;

        // --- ESCANEO DE RED ---
        console.log("\n   📡 ESCANEANDO RED P2P (Discovery Protocol)...");
        await new Promise(r => setTimeout(r, 1200));
        const networkState = await GridEstimator.getLiveNetworkStatus();
        const loadPercent = (networkState.utilizationPercent * 100).toFixed(0);
        
        console.log(`   -------------------------------------------------`);
        console.log(`   | 🌐 ESTADO DE LA RED OASIS (Live Status)       |`);
        console.log(`   | 👥 Nodos Activos:    ${networkState.activeNodes} Peers Online          |`);
        console.log(`   | 📊 Saturación:       ${loadPercent}% ${networkState.statusColor}                  |`);
        console.log(`   -------------------------------------------------`);

        // --- TEST DE DIMENSIONAMIENTO ---
        console.log("\n   📐 TEST DE DIMENSIONAMIENTO...");
        const qty = await askQuestion("   > Cantidad (frames/epochs): ");
        const projection = GridEstimator.calculateProjection(selectedTask, parseInt(qty)||100, networkState);
        
        const savings = ((projection.costLegacy - projection.costSwarm) / projection.costLegacy) * 100;

        // --- LA TABLA DE PRECIOS "NEUTRA Y TÉCNICA" ---
        console.log("\n   📊 COTIZACIÓN DE MERCADO (Market Rates):");
        console.log("   ==========================================================================");
        // 1. GENÉRICO: Usamos "Centralized Cloud Index" (Indice de Nube Centralizada)
        console.log(`   🚫 Centralized Cloud Avg.  | $${projection.costLegacy.toFixed(2)}  | ❌ REFERENCIA (Precio Mercado)`);
        
        // 2. AKASH: "Decentralized Cloud" (Su definición oficial)
        console.log(`   2. Akash Network (AKT)     | $${projection.costAkash.toFixed(2)}   | 🛡️  Nube Descentralizada`);
        
        // 3. OASIS: "P2P Community Grid" (Descripción fáctica)
        console.log(`   3. Oasis Swarm (USDC)      | $${projection.costSwarm.toFixed(2)}   | 🐝 RED P2P (-${savings.toFixed(0)}%)`);
        console.log(`      ↳ Spot Price: $${projection.pricePerHourSwarm.toFixed(2)} / hora`);
        
        // 4. RENDER: "Distributed GPU Rendering" (Descripción técnica exacta)
        if (categoryFilter === 'RENDER') {
            console.log(`   4. Render Network (RNDR)   | $${projection.costRender.toFixed(2)}   | 🎨 Renderizado GPU Distribuido`);
        }
        console.log("   ==========================================================================");

        const choice = await askQuestion("\n   > ELIGE PROVEEDOR (2, 3, 4): ");
        
        if (['2','3','4'].includes(choice)) {
            await ComputeGrid.deployWorkload(selectedTask, projection, choice);
        } else {
            console.log("   > Operación cancelada.");
        }
        break;

    // --- (RESTO DE COMANDOS IGUAL) ---
    case 'consult':
        const prompt = inputParam || await askQuestion("   > 🧠 Tu pregunta: ");
        console.log("\n   SELECCIONA IA:");
        console.log("   1. 🕯️  Candle (Local)");
        console.log("   2. ⚛️  Oasis Quantum (Local Lite)");
        console.log("   3. 🌐 ASI Alliance (Crypto)");
        console.log("   4. 🧠 Bittensor (Premium)");
        console.log("   5. 🤖 Google/GPT (Airlock)");
        const aiChoice = await askQuestion("\n   > Elige (1-5): ");
        let aiProv: any = 'LOCAL_CANDLE';
        if (aiChoice === '2') aiProv = 'LOCAL_QUANTUM';
        if (aiChoice === '3') aiProv = 'ASI_ALLIANCE';
        if (aiChoice === '4') aiProv = 'BITTENSOR';
        if (aiChoice === '5') aiProv = 'OPENAI';
        await SingularityBridge.processQuery(prompt, aiProv);
        break;

    case 'panic': 
        await Watchtower.logAccess('PAPER_KEY_EMERGENCY', true);
        const key = await askQuestion("   > Paper Key: ");
        const sentinel = await PhoenixRecovery.enterSentinelMode(key, PERSISTENT_MEMORY.hardwareHash);
        if (sentinel.hardwareMatch) { console.log("\n✅ ACCESO CONCEDIDO."); PhoenixRecovery.showAuditLogs(); } 
        else await PhoenixRecovery.activateSelfDestruct();
        break;

    case 'connect': await WalletConnectTerminal.generateConnectionQR(); break;
    case 'store': await HolographicDisk.saveSecureFile("Secret.pdf", 120); break;
    case 'retrieve': await HolographicDisk.retrieveSecureFile("Secret.pdf"); break;
    case 'defi': await DigitalVacuum.activatePull("ETH", "USDT"); break;
    case 'stealth': await OasisSapphire.executeStealthTransaction(); break;

    default: console.log("Comandos: grid, consult, connect, store, retrieve, panic, defi"); break;
  }
}
main();
