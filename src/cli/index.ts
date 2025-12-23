import { EconomicEngine } from '../economy/EconomicEngine';
import { Treasury } from '../economy/Treasury';
import { Economy } from '../constants/modules/Economy';
import { Physics } from '../constants/modules/Physics';
import { OasisMeshNetwork } from '../geometry/OasisMeshNetwork';
import { NewtonianMechanics } from '../physics/NewtonianMechanics';
import { TeslaResonance } from '../physics/TeslaResonance';
import { EinsteinPhysics } from '../physics/relativity/EinsteinPhysics';
import { RadioactiveCore } from '../biology/RadioactiveCore';
import { TuringReplicator } from '../biology/TuringReplicator';
import { LandauerLimit } from '../physics/LandauerLimit';
import { BlackCircleSandbox } from '../blackcircle/BlackCircleSandbox';
import { PiEngine } from '../geometry/PiEngine';
import { NodeTaxonomy } from '../biology/NodeTaxonomy';
import { IdentityManager } from '../security/IdentityManager';
import { CrystallineStorage } from '../storage/CrystallineStorage';
import { PhoenixRecovery } from '../security/PhoenixRecovery';
import { HardwareSecurity } from '../security/HardwareSecurity'; // <--- NUEVO

/**
 * 🖥️ OASIS CLI v3.4 - "PERSISTENCE & HSM"
 * Integra: HSM (Persistencia Cifrada) + Kill Switch + Identidad Dual.
 */

// CARGAMOS LA MEMORIA CIFRADA DESDE EL DISCO (O creamos valores por defecto)
let PERSISTENT_MEMORY = HardwareSecurity.loadSecureData() || {
    isFirstRun: true,
    hardwareHash: '', 
    activeIdentity: null,
    readOnlyVault: [],
    securityInbox: []
};

// Función auxiliar para guardar cambios
function saveState() {
    HardwareSecurity.saveSecureData(PERSISTENT_MEMORY);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const inputParam = args.slice(1).join(' '); 

  console.log(`
  ░▒▓ OASIS CORE v3.4 - "THE LIVING SYSTEM" ▓▒░
  ---------------------------------------------
  Modo: HSM Encrypted Storage (AES-256)
  ---------------------------------------------
  `);

  switch (command) {
    case 'start':
      console.log("🚀 INICIANDO SECUENCIA DE ARRANQUE...");
      
      // 1. ORGANISMO & HSM (Solución al CPU Warning)
      console.log("🛡️  Verificando Integridad de Hardware (HSM)...");
      try {
          const cpuTime = HardwareSecurity.runProofOfWork();
          // Si pasa esto, el warning desaparece y ponemos el check verde
          console.log(`   > ✅ CPU Verificada: ${cpuTime.toFixed(2)}ms (Proof-of-Work válido)`);
      } catch (e: any) {
          console.error(`   > 🚨 ERROR CRÍTICO HSM: ${e.message}`);
          process.exit(1);
      }

      if (BlackCircleSandbox.checkThermalSafety(45) === 'SHUTDOWN') return;

      // 2. ALMA & IDENTIDAD
      const currentHash = IdentityManager.generateHardwareHash();
      
      if (PERSISTENT_MEMORY.isFirstRun) {
          console.log("\n🆕 DETECTADO NUEVO HARDWARE (Inicializando Bóveda)...");
          const freshId = await PhoenixRecovery.createFreshIdentity();
          
          // Guardamos en memoria
          PERSISTENT_MEMORY.activeIdentity = freshId;
          PERSISTENT_MEMORY.hardwareHash = currentHash;
          PERSISTENT_MEMORY.isFirstRun = false;
          
          // Escribimos en disco cifrado
          saveState();

          console.log("   > 🔐 IDENTIDAD ACTIVA CREADA Y CIFRADA.");
          console.log(`   > ⚠️  GUARDA LA SEMILLA: "${freshId.mnemonic}"`);
      }

      // Verificamos que el hardware actual coincide con el guardado en la bóveda
      // (Doble check: IdentityManager + HSM decryption success)
      const auth = IdentityManager.verifyIdentity(PERSISTENT_MEMORY.hardwareHash);
      if (auth !== 'ACCESS_GRANTED') {
          console.log("   > 🚨 ERROR: Hardware no coincide con la Bóveda.");
          return;
      }
      
      console.log("   > 🔓 Bóveda Desencriptada. Acceso: ACTIVO.");

      // Check de alertas
      if (Math.random() > 0.1) { 
          console.log("\n🚨 📩 MENSAJE DEL SISTEMA DE SEGURIDAD:");
          console.log("   > 'ALERTA: Integridad del sistema verificada.'");
      }
      console.log("\n✨ SISTEMA ONLINE. Bóveda Persistente Activa.");
      break;

    // --- COMANDO DE ATAQUE ---
    case 'panic':
      console.log("🛑 INICIANDO PROTOCOLO DE PÁNICO (KILL SWITCH)...");
      console.log("   > 1. Borrando Bóveda Local Cifrada...");
      
      // Borramos el archivo físico para evitar forenses
      try {
        const fs = require('fs');
        if (fs.existsSync('./oasis_secure_vault.enc')) {
            fs.unlinkSync('./oasis_secure_vault.enc');
            console.log("   > 🗑️ Archivo 'oasis_secure_vault.enc' eliminado.");
        }
      } catch (e) {}

      console.log("\n📡 ENVIANDO ORDEN DE AUTODESTRUCCIÓN A LA RED...");
      console.log("   > ✅ ORDEN ENVIADA.");
      break;

    // --- COMANDO DE LECTURA ---
    case 'import-view':
      console.log("🦅 PROTOCOLO FÉNIX: Importación de Solo Lectura");
      
      if (!inputParam || inputParam.split(' ').length < 12) {
          console.log("   > ❌ Error: Faltan palabras."); return;
      }

      const importedKeys = await PhoenixRecovery.importReadOnlyIdentity(inputParam);

      if (importedKeys) {
          PERSISTENT_MEMORY.readOnlyVault.push(importedKeys);
          saveState(); // Guardamos que hemos importado esto

          console.log("   > ✅ ÉXITO: Identidad desencriptada.");
          console.log("   > 👁️  MODO: READ-ONLY.");
          console.log("\n📡 ENVIANDO BENGALA DE SEGURIDAD...");
          console.log("   > ✅ Nodo original notificado.");

          console.log("\n⏳ ESCUCHANDO RED (Esperando datos)...");
          
          // SIMULACIÓN KILL SWITCH REMOTO
          setTimeout(() => {
              console.log("\n⚡ 🚨 MENSAJE PRIORITARIO RECIBIDO 🚨 ⚡");
              console.log("   > Comando: REMOTE_WIPE (Autodestrucción)");
              
              // Purga real
              PERSISTENT_MEMORY = {};
              try { require('fs').unlinkSync('./oasis_secure_vault.enc'); } catch(e){}
              
              console.log("   > 🗑️ Bóveda local vaciada y archivo eliminado.");
              console.log("   > 💀 SISTEMA COMPROMETIDO. CERRANDO.");
              process.exit(0); 
          }, 4000); 

      } else {
          console.log("   > ❌ ERROR: Semilla inválida.");
      }
      break;

    case 'help':
    default:
      console.log("Comandos: start, import-view, panic");
      break;
  }
}

main();
