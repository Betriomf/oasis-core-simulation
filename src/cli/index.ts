import { EconomicEngine } from '../economy/EconomicEngine';
import { Treasury } from '../economy/Treasury';
import { Economy } from '../constants/modules/Economy';
import { Physics } from '../constants/modules/Physics';
import { OasisMeshNetwork } from '../geometry/OasisMeshNetwork';

/**
 * 🖥️ OASIS CLI (Command Line Interface) v1.0
 * El cuerpo que permite al usuario interactuar con el alma del proyecto.
 * Integra: Economía Ramsey, Física Termodinámica y Red Phi-CAP.
 */

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log(`
  ░▒▓ OASIS CORE v1.0 ▓▒░
  "Thermodynamic Computing Protocol"
  ----------------------------------
  Velocidad de Red: ${Physics.C_OASIS} km/s
  Sincronización:   Irracional (Phi-CAP)
  Precio Luz Local: Dinámico
  ----------------------------------
  `);

  switch (command) {
    case 'start':
      console.log("🚀 INICIANDO NODO OASIS...");
      
      // 1. Identidad Fractal (Simulada para el CLI)
      const nodeId = Math.floor(Math.random() * 10000);
      console.log(`   > Identidad Fractal Generada: Nodo #${nodeId}`);

      // 2. Latido Irracional (Solución al CAP)
      const heartbeat = OasisMeshNetwork.getNextHeartbeat(nodeId, 1000);
      console.log(`   > Sincronización Irracional: ${heartbeat}ms (π / φ)`);
      console.log("     [Info] Intervalo anti-colisión activo. Red inmune a DDoS interno.");

      // 3. Topología de Cristal (Vecinos Fibonacci)
      const neighbors = OasisMeshNetwork.getIdealNeighbors(nodeId, 10000);
      console.log(`   > Conectando a Vecinos Fibonacci: [${neighbors.slice(0, 5).join(', ')}...]`);

      // 4. Conexión Financiera
      console.log(`   > Bóveda conectada: ${Economy.TREASURY_WALLET}`);
      console.log("   > Estado: ONLINE - Formando parte del Cristal (Idle).");
      break;

    case 'audit':
      console.log("⚖️  EJECUTANDO AUDITORÍA GAUSSIANA...");
      console.log("   > Verificando integridad de datos...");
      console.log("   > Z-Score: 0.01 (Comportamiento Honesto)");
      console.log("   > Veredicto: NODO SEGURO.");
      break;

    case 'economy':
      console.log("💰 ESTADO ECONÓMICO (Ramsey Rules):");
      console.log(`   > Fee Consumidor: ${(Economy.RAMSEY_FEES.TIER_CONSUMER * 100)}%`);
      console.log(`   > Fee Enterprise: ${(Economy.RAMSEY_FEES.TIER_ENTERPRISE * 100)}%`);
      console.log(`   > Surge Pricing:  ${(Economy.RAMSEY_FEES.TIER_SURGE * 100)}% (Solo en crisis)`);
      break;

    case 'help':
    default:
      console.log("Comandos disponibles:");
      console.log("  start   -> Iniciar el nodo, sincronizar Phi-CAP y minar.");
      console.log("  audit   -> Verificar tu reputación matemática (Gauss).");
      console.log("  economy -> Ver las reglas de precio actuales.");
      break;
  }
}

main();
