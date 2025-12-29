import { HardwareSecurity } from '../security/HardwareSecurity';
import { IdentityManager } from '../security/IdentityManager';
import { PhoenixRecovery } from '../security/PhoenixRecovery';
import { DiapauseMechanism, VitalState } from '../biology/DiapauseMechanism';
import { SymbiosisProtocol } from '../biology/SymbiosisProtocol';
import { RadioactiveCore } from '../biology/RadioactiveCore';
import { SingularityBridge } from '../bridge/SingularityBridge';
import { WalletCore } from '../economy/WalletCore';
import { P2PNetwork } from '../network/P2PNetwork';
import { DigitalVacuum } from '../defi/DigitalVacuum'; 

// --- MEMORIA PERSISTENTE ---
let PERSISTENT_MEMORY = HardwareSecurity.loadSecureData() || {
    isFirstRun: true,
    hardwareHash: '',
    activeIdentity: null,
};

let CURRENT_VITAL_STATE: VitalState = 'GROWTH';

function saveState() { HardwareSecurity.saveSecureData(PERSISTENT_MEMORY); }

async function ensureIdentity() {
    if (!PERSISTENT_MEMORY.activeIdentity) {
        console.log("   > ⚠️  Identidad no encontrada. Iniciando Protocolo Fénix...");
        const identity = await PhoenixRecovery.createFreshIdentity();
        PERSISTENT_MEMORY.activeIdentity = identity;
        PERSISTENT_MEMORY.hardwareHash = IdentityManager.generateHardwareHash();
        PERSISTENT_MEMORY.isFirstRun = false;
        saveState();
        console.log(`   > 🔐 IDENTIDAD SOBERANA CREADA: ${identity.address}`);
    }
}

async function updateVitalSigns() {
    const symbiosisStatus = await SymbiosisProtocol.maintainHomeostasis();
    if (symbiosisStatus === 'HIBERNATING') {
        CURRENT_VITAL_STATE = 'HIBERNATION';
        return;
    }
    const telemetry = DiapauseMechanism.getSimulatedTelemetry();
    CURRENT_VITAL_STATE = DiapauseMechanism.checkMetabolism(telemetry.diskUsage, telemetry.battery, telemetry.legalRisk);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const inputParam = args.slice(1).join(' ');

  await updateVitalSigns();

  console.log(`
  ░▒▓ OASIS CORE v5.2 - "QUANTUM DEFI" ▓▒░
  -------------------------------------------
  Estado: ${CURRENT_VITAL_STATE}
  -------------------------------------------
  `);

  switch (command) {
    case 'swarm':
        await ensureIdentity(); 
        WalletCore.initializeWallet();
        console.log("🐝 CONECTANDO AL MULTIVERSO (Red P2P)...");
        try {
            await P2PNetwork.startSwarm();
            setInterval(() => {}, 10000); 
        } catch (e: any) { console.error(`   > ❌ ERROR DE RED: ${e.message}`); }
        break;

    case 'wallet':
        await ensureIdentity();
        WalletCore.initializeWallet();
        const address = WalletCore.getAddress();
        const balance = WalletCore.getBalance();
        console.log("\n💎 OASIS HARDWARE WALLET");
        console.log(`🔑 Dirección: ${address}`);
        console.log(`💰 Saldo: ${balance.toFixed(4)} SPN`);
        if (inputParam.startsWith('deposit')) {
            const amount = parseFloat(inputParam.split(' ')[1]) || 0;
            WalletCore.receiveMockDeposit(amount);
            console.log(`   > 💰 Depósito recibido: +${amount} SPN`);
        }
        break;

    case 'defi': 
        await ensureIdentity();
        WalletCore.initializeWallet();
        
        // --- ⚡ FLASH LOAN AUTOMÁTICO PARA PRUEBAS ---
        // Inyectamos saldo temporalmente para que la física funcione en este test
        console.log("   > ⚡ Solicitando Flash Loan de prueba...");
        WalletCore.receiveMockDeposit(1000); 
        // ---------------------------------------------

        console.log("🦄 CONECTANDO A 1INCH AGGREGATOR...");
        await DigitalVacuum.activatePull("ETH", "USDT");
        break;

    case 'audit':
      const isToxic = RadioactiveCore.confirmToxicity([6.0, 5.5, 7.0]);
      console.log(`   > Toxicidad: ${isToxic ? 'CULPABLE' : 'INOCENTE'}`);
      break;

    case 'consult':
        if (!inputParam) console.log("   > ⚠️  Falta consulta.");
        else await SingularityBridge.contractConsultant("standard-inference", inputParam);
        break;

    default:
      console.log("Comandos Disponibles: swarm, wallet, defi, consult, audit");
      break;
  }
}

main();
