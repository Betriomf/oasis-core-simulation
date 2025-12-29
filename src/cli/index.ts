import { HardwareSecurity } from '../security/HardwareSecurity';
import { EntropyValidator } from '../security/EntropyValidator';
import { IdentityManager } from '../security/IdentityManager';
import { PhoenixRecovery } from '../security/PhoenixRecovery';
import { ContentFilter } from '../security/ContentFilter';
import { DiapauseMechanism, VitalState } from '../biology/DiapauseMechanism';
import { SymbiosisProtocol } from '../biology/SymbiosisProtocol';
import { RadioactiveCore } from '../biology/RadioactiveCore';
import { SingularityBridge } from '../bridge/SingularityBridge';
import { WalletCore } from '../economy/WalletCore';
import { P2PNetwork } from '../network/P2PNetwork';

/**
 * 🖥️ OASIS CLI v5.1 - "GENESIS EDITION"
 * Auto-generación de identidad y conexión soberana.
 */

let PERSISTENT_MEMORY = HardwareSecurity.loadSecureData() || {
    isFirstRun: true,
    hardwareHash: '',
    activeIdentity: null,
};

let CURRENT_VITAL_STATE: VitalState = 'GROWTH';

function saveState() {
    HardwareSecurity.saveSecureData(PERSISTENT_MEMORY);
}

async function ensureIdentity() {
    // Si no hay identidad activa, la creamos AHORA (BIP-39)
    if (!PERSISTENT_MEMORY.activeIdentity) {
        console.log("   > ⚠️  Identidad no encontrada. Iniciando Protocolo Fénix...");
        console.log("   > 🧬 Recolectando entropía del hardware...");
        
        // 1. Generar Claves (Ethers.js + Entropía)
        const identity = await PhoenixRecovery.createFreshIdentity();
        
        // 2. Guardar en Bóveda
        PERSISTENT_MEMORY.activeIdentity = identity;
        PERSISTENT_MEMORY.hardwareHash = IdentityManager.generateHardwareHash();
        PERSISTENT_MEMORY.isFirstRun = false;
        
        saveState();
        
        console.log(`   > 🔐 IDENTIDAD SOBERANA CREADA.`);
        console.log(`   > 🆔 Address: ${identity.address}`);
        console.log(`   > 🗝️  (La clave privada se ha guardado cifrada en disco)`);
    }
}

async function updateVitalSigns() {
    const symbiosisStatus = await SymbiosisProtocol.maintainHomeostasis();
    if (symbiosisStatus === 'HIBERNATING') {
        CURRENT_VITAL_STATE = 'HIBERNATION';
        return;
    }
    const telemetry = DiapauseMechanism.getSimulatedTelemetry();
    CURRENT_VITAL_STATE = DiapauseMechanism.checkMetabolism(
        telemetry.diskUsage, telemetry.battery, telemetry.legalRisk
    );
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const inputParam = args.slice(1).join(' ');

  await updateVitalSigns();

  console.log(`
  ░▒▓ OASIS CORE v5.1 - "GENESIS SWARM" ▓▒░
  -------------------------------------------
  Estado: ${CURRENT_VITAL_STATE}
  -------------------------------------------
  `);

  switch (command) {
    case 'start':
      await ensureIdentity(); 
      console.log("\n✨ NODO LOCAL LISTO.");
      break;

    case 'swarm':
        // PASO CRÍTICO: Antes de conectar, verificamos quién eres
        await ensureIdentity(); 
        
        // Inicializamos la Wallet con la identidad cargada
        WalletCore.initializeWallet();

        console.log("🐝 CONECTANDO AL MULTIVERSO (Red P2P)...");
        try {
            await P2PNetwork.startSwarm();
            console.log("   > 📡 Escuchando señales del espacio profundo...");
            // Mantener vivo
            setInterval(() => {}, 10000); 
        } catch (e: any) {
            console.error(`   > ❌ ERROR DE RED: ${e.message}`);
        }
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
        }
        break;

    case 'audit':
      console.log("☢️  AUDITORÍA DE RADIACIÓN...");
      const isToxic = RadioactiveCore.confirmToxicity([6.0, 5.5, 7.0]);
      console.log(`   > Toxicidad: ${isToxic ? 'CULPABLE' : 'INOCENTE'}`);
      break;

    case 'consult':
        if (!inputParam) console.log("   > ⚠️  Falta consulta.");
        else await SingularityBridge.contractConsultant("standard-inference", inputParam);
        break;

    default:
      console.log("Comandos: start, swarm, wallet, consult, audit");
      break;
  }
}

main();
