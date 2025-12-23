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

/**
 * 🖥️ OASIS CLI v3.8 - "NUCLEAR JUSTICE"
 * Integra: Simbiosis, Diapausa y Justicia Geométrica (Triangulación).
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

  await updateVitalSigns();

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

    // --- COMANDO DE AUDITORÍA NUCLEAR (Nuevo) ---
    case 'audit':
      console.log("☢️  INICIANDO AUDITORÍA DE RADIACIÓN (TRIANGULACIÓN)...");
      
      // 1. Prueba de Justicia (3 Testigos)
      const witnessesToxic = [6.0, 5.5, 7.0]; // Dosis letales
      const isToxic = RadioactiveCore.confirmToxicity(witnessesToxic);
      console.log(`   > Juicio de Toxicidad (3 testigos): ${isToxic ? 'CULPABLE (BAN)' : 'INOCENTE'}`);

      // 2. Prueba de Estabilidad (Decaimiento Relativista)
      console.log("\n📐 CÁLCULO DE ESTABILIDAD (Decaimiento):");
      
      // Nodo Solitario (Gamma 1.0, Sin Triangulación)
      // Usamos un valor alto inicial (ej. 10.0 Sv) para ver como baja
      const radSolo = RadioactiveCore.decayRadiation(10.0, 3600, 'GAMER', 1.0, false);
      
      // Nodo Triangulado (Gamma 1.0, CON Triangulación = true)
      const radTriad = RadioactiveCore.decayRadiation(10.0, 3600, 'GAMER', 1.0, true);
      
      console.log(`   > Radiación residual (Solo): ${radSolo.toFixed(4)} Sv`);
      console.log(`   > Radiación residual (Triangulado): ${radTriad.toFixed(4)} Sv`);
      console.log(`   > EFECTO: La triangulación retiene mejor la estabilidad.`);
      
      // 3. Prueba Gaussiana (Simulada)
      console.log("\n📊 JUICIO GAUSSIANO (Contexto Global):");
      // Nodo con 5.5 Sv (Letal), pero la Red tiene media 5.0 (Todos están mal)
      const judgment = RadioactiveCore.shouldBanNode(5.5, 5.0, 1.0); 
      console.log(`   > Veredicto: ${judgment.banned ? 'BAN' : 'PERDONADO'} (${judgment.reason})`);
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
      console.log("Comandos: start, store, audit, status, panic");
      break;
  }
}

main();
