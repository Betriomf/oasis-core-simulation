import { HardwareSecurity } from '../security/HardwareSecurity';
import { EntropyValidator } from '../security/EntropyValidator';
import { IdentityManager } from '../security/IdentityManager';
import { PhoenixRecovery } from '../security/PhoenixRecovery';
import { ContentFilter } from '../security/ContentFilter';
import { DiapauseMechanism, VitalState } from '../biology/DiapauseMechanism';
import { SymbiosisProtocol } from '../biology/SymbiosisProtocol';
import { BlackCircleSandbox } from '../blackcircle/BlackCircleSandbox';
// Importamos el Núcleo Radiactivo Fusionado
import { RadioactiveCore } from '../biology/RadioactiveCore';
// Importamos el Puente de Inteligencia (SingularityNET)
import { SingularityBridge } from '../bridge/SingularityBridge';
// Importamos el Núcleo Económico (Wallet)
import { WalletCore } from '../economy/WalletCore';

/**
 * 🖥️ OASIS CLI v3.8 - "NUCLEAR JUSTICE"
 * Integra: Simbiosis, Diapausa, Justicia Geométrica, Puente SingularityNET y Wallet Física.
 */

let PERSISTENT_MEMORY = HardwareSecurity.loadSecureData() || {
    isFirstRun: true,
    hardwareHash: '',
    activeIdentity: null,
    readOnlyVault: [],
};

let CURRENT_VITAL_STATE: VitalState = 'GROWTH';

function saveState() {
    HardwareSecurity.saveSecureData(PERSISTENT_MEMORY);
}

// Chequeo de signos vitales y Simbiosis
async function updateVitalSigns() {
    const symbiosisStatus = await SymbiosisProtocol.maintainHomeostasis();

    if (symbiosisStatus === 'HIBERNATING') {
        CURRENT_VITAL_STATE = 'HIBERNATION';
        return;
    }

    const telemetry = DiapauseMechanism.getSimulatedTelemetry();
    CURRENT_VITAL_STATE = DiapauseMechanism.checkMetabolism(
        telemetry.diskUsage,
        telemetry.battery,
        telemetry.legalRisk
    );
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const inputParam = args.slice(1).join(' ');

  // 1. Actualizamos biología
  await updateVitalSigns();

  // 2. Inicializamos la Billetera Física (Derivación de claves)
  WalletCore.initializeWallet();

  console.log(`
  ░▒▓ OASIS CORE v3.8 - "NUCLEAR JUSTICE" ▓▒░
  -------------------------------------------
  Estado: ${CURRENT_VITAL_STATE}
  Simbiosis: ${CURRENT_VITAL_STATE === 'HIBERNATION' ? '⚠️ RESTRICTED' : '✅ ACTIVE'}
  -------------------------------------------
  `);

  switch (command) {
    case 'start':
      console.log("🚀 INICIANDO SISTEMA...");
      try {
          HardwareSecurity.runProofOfWork();
          if (!EntropyValidator.validatePhysicalCore()) throw new Error("Virtual HW");
          console.log("   > ✅ Hardware: Silicio Real Validado.");
      } catch (e: any) {
          console.error(`   > 🚨 ERROR: ${e.message}`);
          process.exit(1);
      }

      if (CURRENT_VITAL_STATE === 'HIBERNATION') {
          console.log("   > ❄️  NODO ENFRIANDO: Protocolo Hafnio activo.");
      } else {
          console.log("   > 🧬 SIMBIOSIS ESTABLE.");
      }

      if (PERSISTENT_MEMORY.isFirstRun) {
          const freshId = await PhoenixRecovery.createFreshIdentity();
          PERSISTENT_MEMORY.activeIdentity = freshId;
          PERSISTENT_MEMORY.hardwareHash = IdentityManager.generateHardwareHash();
          PERSISTENT_MEMORY.isFirstRun = false;
          saveState();
          console.log("   > 🔐 Identidad Creada.");
      }
      console.log("\n✨ SISTEMA ONLINE.");
      break;

    case 'store':
      if (!DiapauseMechanism.canConceive(CURRENT_VITAL_STATE)) {
          console.log("   > ⛔ ACCIÓN BLOQUEADA: Diapausa activa.");
          return;
      }
      const content = inputParam || "test";
      if (ContentFilter.validateContent(content)) {
          console.log("   > ✅ Ética OK. Guardando...");
          console.log("   > ✨ ÉXITO.");
      } else {
          console.log("   > ❌ RECHAZADO: Ética.");
      }
      break;

    // --- COMANDO DE AUDITORÍA NUCLEAR ---
    case 'audit':
      console.log("☢️  INICIANDO AUDITORÍA DE RADIACIÓN (TRIANGULACIÓN)...");

      // 1. Prueba de Justicia (3 Testigos)
      const witnessesToxic = [6.0, 5.5, 7.0];
      const isToxic = RadioactiveCore.confirmToxicity(witnessesToxic);
      console.log(`   > Juicio de Toxicidad (3 testigos): ${isToxic ? 'CULPABLE (BAN)' : 'INOCENTE'}`);

      // 2. Prueba de Estabilidad
      const radSolo = RadioactiveCore.decayRadiation(10.0, 3600, 'GAMER', 1.0, false);
      const radTriad = RadioactiveCore.decayRadiation(10.0, 3600, 'GAMER', 1.0, true);

      console.log(`   > Radiación (Solo): ${radSolo.toFixed(4)} Sv`);
      console.log(`   > Radiación (Triangulado): ${radTriad.toFixed(4)} Sv`);

      // 3. Prueba Gaussiana
      const judgment = RadioactiveCore.shouldBanNode(5.5, 5.0, 1.0);
      console.log(`   > Veredicto Global: ${judgment.banned ? 'BAN' : 'PERDONADO'} (${judgment.reason})`);
      break;

    // --- COMANDO DE INTELIGENCIA DISTRIBUIDA (BRIDGE) ---
    case 'consult':
        if (!inputParam) {
            console.log("   > ⚠️  Debes escribir una consulta. Ej: consult 'Analizar datos'");
            break;
        }
        try {
            console.log("📡 CONECTANDO CON LA COLMENA (SINGULARITYNET)...");
            // Llamamos al puente
            const response = await SingularityBridge.contractConsultant("standard-inference", inputParam);
            console.log(`\n   > 📨 RESPUESTA RECIBIDA:\n   ${response}`);
        } catch (e: any) {
            console.error(`   > 🛡️  BLOQUEO DEL GUARDIA: ${e.message}`);
        }
        break;

    // --- COMANDO FINANCIERO (NUEVO) ---
    case 'wallet':
        const address = WalletCore.getAddress();
        const balance = WalletCore.getBalance();

        console.log("\n💎 OASIS HARDWARE WALLET (EVM Compatible)");
        console.log("-------------------------------------------");
        console.log(`🔑 Tu Dirección Pública (Recibir Pagos):`);
        console.log(`   ${address}`);
        console.log("\n💰 Saldo Actual:");
        console.log(`   ${balance.toFixed(4)} SPN (Oasis Tokens)`);
        console.log("-------------------------------------------");
        console.log("   > Esta dirección está vinculada matemáticamente a tu CPU.");
        console.log("   > Solo este ordenador físico puede firmar transacciones.");

        // Mini-truco para pruebas: Si escribes "wallet deposit 50" te regala dinero falso
        if (inputParam.startsWith('deposit')) {
            const amount = parseFloat(inputParam.split(' ')[1]) || 0;
            WalletCore.receiveMockDeposit(amount);
            // En un sistema real, el saldo está en la blockchain, no en local,
            // pero mantenemos la simulación coherente.
            saveState(); 
        }
        break;

    case 'status':
        console.log("📊 INFORME DE SIMBIOSIS:");
        console.log(`   > Estado Vital: ${CURRENT_VITAL_STATE}`);
        break;

    case 'panic':
      try { require('fs').unlinkSync('./oasis_secure_vault.enc'); } catch(e){}
      console.log("   > 💀 SISTEMA NEUTRALIZADO.");
      break;

    default:
      console.log("Comandos: start, store, audit, consult, wallet, status, panic");
      break;
  }
}

main();
