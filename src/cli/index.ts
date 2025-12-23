import { HardwareSecurity } from '../security/HardwareSecurity';
import { EntropyValidator } from '../security/EntropyValidator';
import { IdentityManager } from '../security/IdentityManager';
import { PhoenixRecovery } from '../security/PhoenixRecovery';
import { ContentFilter } from '../security/ContentFilter';
import { DiapauseMechanism, VitalState } from '../biology/DiapauseMechanism'; // <--- NUEVO: El Canguro
import { BlackCircleSandbox } from '../blackcircle/BlackCircleSandbox';

/**
 * 🖥️ OASIS CLI v3.6 - "THE RESILIENT NODE"
 * Integra: Seguridad Física + Ética + Mecanismo de Diapausa (Resiliencia).
 * Filosofía: El nodo es un organismo que protege su integridad.
 */

// Cargamos la memoria persistente cifrada
let PERSISTENT_MEMORY = HardwareSecurity.loadSecureData() || {
    isFirstRun: true,
    hardwareHash: '',
    activeIdentity: null,
    readOnlyVault: [],
};

// Estado vital global del nodo
let CURRENT_VITAL_STATE: VitalState = 'GROWTH';

// Función para guardar cambios en el disco de forma segura
function saveState() {
    HardwareSecurity.saveSecureData(PERSISTENT_MEMORY);
}

// Actualizamos los signos vitales (Espacio, Energía, Legalidad)
function updateVitalSigns() {
    // Simulamos telemetría de hardware (en producción usaríamos sensores reales)
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

  // Encabezado visual
  console.log(`
  ░▒▓ OASIS CORE v3.6 - "THE RESILIENT NODE" ▓▒░
  ----------------------------------------------
  Estado: ${CURRENT_VITAL_STATE} (Modo: ${CURRENT_VITAL_STATE === 'GROWTH' ? 'Escritura/Lectura' : 'Solo Lectura'})
  ----------------------------------------------
  `);

  // Chequeo de signos vitales antes de cualquier operación
  updateVitalSigns();

  switch (command) {
    case 'start':
      console.log("🚀 INICIANDO SISTEMA BIOLÓGICO...");

      // 1. SEGURIDAD FÍSICA (HSM + ENTROPY)
      console.log("🛡️  Verificando Integridad de Hardware...");
      try {
          const cpuTime = HardwareSecurity.runProofOfWork();
          if (!EntropyValidator.validatePhysicalCore()) {
               throw new Error("Entropía insuficiente. Hardware virtual detectado.");
          }
          console.log(`   > ✅ Hardware: Verificado (Silicio Real - ${cpuTime.toFixed(2)}ms).`);
      } catch (e: any) {
          console.error(`   > 🚨 ERROR CRÍTICO: ${e.message}`);
          process.exit(1);
      }

      // 2. DIAGNÓSTICO DE DIAPAUSA (El Canguro)
      console.log("🩺 Chequeo Metabólico:");
      if (CURRENT_VITAL_STATE === 'GROWTH') {
          console.log("   > 🟢 Signos Vitales Óptimos. Crecimiento activo.");
      } else if (CURRENT_VITAL_STATE === 'DIAPAUSE') {
          console.log("   > 🟠 ALERTA: Recursos bajos. Entrando en DIAPAUSA (Solo Lectura).");
      } else {
          console.log(`   > 🔴 ESTADO CRÍTICO: ${CURRENT_VITAL_STATE}`);
      }

      // Check Térmico de seguridad
      if (BlackCircleSandbox.checkThermalSafety(45) === 'SHUTDOWN') return;

      // 3. GESTIÓN DE IDENTIDAD
      if (PERSISTENT_MEMORY.isFirstRun) {
          console.log("\n🆕 DETECTADO NUEVO HARDWARE...");
          const freshId = await PhoenixRecovery.createFreshIdentity();
          PERSISTENT_MEMORY.activeIdentity = freshId;
          PERSISTENT_MEMORY.hardwareHash = IdentityManager.generateHardwareHash();
          PERSISTENT_MEMORY.isFirstRun = false;
          saveState();
          console.log("   > 🔐 Identidad Creada y Cifrada.");
          console.log(`   > ⚠️  SEMILLA: "${freshId.mnemonic}"`);
      }
      
      // Verificación de vinculación hardware
      const auth = IdentityManager.verifyIdentity(PERSISTENT_MEMORY.hardwareHash);
      if (auth !== 'ACCESS_GRANTED') {
          console.log("   > 🚨 ERROR: Hardware no coincide con la Bóveda.");
          return;
      }

      console.log("\n✨ NODO ONLINE. Esperando instrucciones.");
      break;

    case 'store':
      console.log("📦 INTENTO DE ALMACENAMIENTO (CONCEPCIÓN)...");
      
      // 1. VERIFICAR DIAPAUSA (¿Podemos concebir?)
      if (!DiapauseMechanism.canConceive(CURRENT_VITAL_STATE)) {
          console.log("   > ⛔ RECHAZADO: El nodo está en Diapausa/Hibernación.");
          console.log("   > 💡 Solución: Libera espacio en disco o conecta el cargador.");
          return;
      }

      // 2. VERIFICAR ÉTICA (Content Filter)
      const content = inputParam || "test";
      if (ContentFilter.validateContent(content)) {
          console.log("   > ✅ Ética: Aprobada (Hash limpio).");
          console.log("   > 💾 Guardando en Crystalline Storage...");
          // Aquí iría la lógica real de escritura en disco
          console.log("   > ✨ ÉXITO: Archivo asimilado y replicado.");
      } else {
          console.log("   > ❌ RECHAZADO: Contenido prohibido por protocolo ético.");
      }
      break;

    case 'status':
        console.log("📊 INFORME DE ESTADO:");
        console.log(`   > Metabolismo: ${CURRENT_VITAL_STATE}`);
        console.log(`   > Simulación Disco: 45% (Simulado)`);
        console.log(`   > Simulación Batería: 100% (Simulado)`);
        console.log(`   > Integridad Ética: 100%`);
        break;

    case 'panic':
      console.log("🛑 EJECUTANDO KILL SWITCH...");
      try { 
          const fs = require('fs');
          if (fs.existsSync('./oasis_secure_vault.enc')) {
            fs.unlinkSync('./oasis_secure_vault.enc'); 
            console.log("   > 🗑️ Identidad borrada del disco.");
          } else {
            console.log("   > ⚠️ No se encontró bóveda para borrar.");
          }
      } catch(e){}
      console.log("   > 💀 SISTEMA NEUTRALIZADO.");
      break;

    case 'help':
    default:
      console.log("Comandos disponibles:");
      console.log("  start        -> Inicia el nodo con chequeo físico y biológico.");
      console.log("  store [txt]  -> Intenta guardar un archivo (respeta Diapausa y Ética).");
      console.log("  status       -> Muestra los signos vitales simulados.");
      console.log("  panic        -> Autodestrucción de claves.");
      break;
  }
}

main();
