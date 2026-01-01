import { HardwareSecurity } from '../security/HardwareSecurity';
import { PhoenixRecovery } from '../security/PhoenixRecovery';
import { WalletConnectTerminal } from '../wallet/WalletConnectTerminal';
import { HolographicDisk } from '../storage/HolographicDisk';
import { DigitalVacuum } from '../defi/DigitalVacuum'; 
import { OasisSapphire } from '../bridge/OasisSapphire';
import { Watchtower } from '../security/Watchtower';
import { SingularityBridge } from '../ai/SingularityBridge';
import { ComputeGrid, TASK_CATALOG, GridEstimator } from '../compute/ComputeGrid';
import * as readline from 'readline';

// --- 🔒 FASE 1: SECURE BOOT (Integración Real) ---
// El sistema NO arranca si la seguridad física falla.
console.log("🔒 INICIANDO SECURE BOOT...");
let PERSISTENT_MEMORY = HardwareSecurity.loadSecureData();

if (!PERSISTENT_MEMORY || !PERSISTENT_MEMORY.hardwareHash) {
    console.log("⚠️  PRIMER ARRANQUE DETECTADO O MEMORIA CORRUPTA.");
    console.log("   Vinculando software a este Hardware (AMD/Intel)...");
    const currentHash = PhoenixRecovery.getCurrentHardwareHash();
    PERSISTENT_MEMORY = {
        isFirstRun: false, 
        hardwareHash: currentHash, 
        activeIdentity: 'ANONYMOUS_ARCHITECT'
    };
    HardwareSecurity.saveSecureData(PERSISTENT_MEMORY);
    console.log(`✅ HARDWARE VINCULADO: ${currentHash.substring(0, 16)}...`);
} else {
    // VERIFICACIÓN ACTIVA
    const currentHash = PhoenixRecovery.getCurrentHardwareHash();
    if (PERSISTENT_MEMORY.hardwareHash !== currentHash) {
        console.log("\n🛑 ERROR CRÍTICO DE SEGURIDAD 🛑");
        console.log("Se ha detectado un cambio de hardware o clonación no autorizada.");
        console.log("Protocolo Watchtower activado.");
        process.exit(1); // El programa se niega a funcionar
    }
    console.log("✅ INTEGRIDAD DE HARDWARE VERIFICADA.");
}

const askQuestion = (query: string) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise<string>(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
};

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const inputParam = args.slice(1).join(' ');

  // Si no hay comando, mostramos ayuda
  if (!command) {
      console.log("\n🌌 OASIS CORE v6.0 - CLI");
      console.log("Uso: npx tsx src/cli/index.ts [comando]");
      console.log("Comandos disponibles: grid, consult, connect, store, panic");
      return;
  }

  switch (command) {
    case 'grid':
        console.log("\n   ⚡ OASIS COMPUTE GRID (Secured by Hardware)");
        console.log("   ================================================");
        console.log("   1. 📤 ALQUILAR POTENCIA");
        console.log("   2. 📥 OFRECER POTENCIA");
        
        const mode = await askQuestion("   > Elige (1-2): ");

        if (mode === '2') {
            await ComputeGrid.startProviderMode();
            break;
        }

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

        console.log("\n   📡 ESCANEANDO RED P2P (Discovery Protocol)...");
        await new Promise(r => setTimeout(r, 1200));
        const networkState = await GridEstimator.getLiveNetworkStatus();
        
        console.log(`   -------------------------------------------------`);
        console.log(`   | 🌐 ESTADO DE LA RED OASIS (Live Status)       |`);
        console.log(`   | 👥 Nodos Activos:    ${networkState.activeNodes} Peers Online          |`);
        console.log(`   | 📊 Saturación:       ${(networkState.utilizationPercent * 100).toFixed(0)}% ${networkState.statusColor}                  |`);
        console.log(`   -------------------------------------------------`);

        console.log("\n   📐 CÁLCULO FÍSICO Y DIMENSIONAMIENTO...");
        const qty = await askQuestion("   > Cantidad (frames/epochs): ");
        
        // FÍSICA APLICADA
        const projection = GridEstimator.calculatePhysicsProjection(selectedTask, parseInt(qty)||100, networkState);
        const savings = ((projection.costLegacy - projection.costSwarm) / projection.costLegacy) * 100;

        console.log("\n   📊 COTIZACIÓN (Basada en Energía Local + Entropía):");
        console.log("   ==========================================================================");
        console.log(`   🚫 Centralized Cloud Avg.  | $${projection.costLegacy.toFixed(2)}  | ❌ REFERENCIA`);
        console.log(`   2. Akash Network (AKT)     | $${projection.costAkash.toFixed(2)}   | 🛡️  Nube Descentralizada`);
        console.log(`   3. Oasis Swarm (USDC)      | $${projection.costSwarm.toFixed(2)}   | 🐝 SOBERANO (-${savings.toFixed(0)}%)`);
        console.log(`      ↳ Energía: ${projection.energyUsed} kWh | Eficiencia: ${projection.thermoEff}`);
        console.log("   ==========================================================================");

        const choice = await askQuestion("\n   > ELIGE PROVEEDOR (2, 3): ");
        if (['2','3'].includes(choice)) {
            await ComputeGrid.deployWorkload(selectedTask, projection, choice);
        }
        break;

    case 'consult':
        const prompt = inputParam || await askQuestion("   > 🧠 Tu pregunta: ");
        console.log("\n   SELECCIONA IA (Soberana vs Corporativa):");
        console.log("   1. 🕯️  Candle (Local - Privado)");
        console.log("   2. 🤖 GPT/Google (Airlock - Público)");
        const aiChoice = await askQuestion("\n   > Elige (1-2): ");
        let aiProv: any = aiChoice === '1' ? 'LOCAL_CANDLE' : 'OPENAI';
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

    default: console.log("Comando desconocido."); break;
  }
}
main();
