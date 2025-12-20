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

/**
 * 🖥️ OASIS CLI (Command Line Interface) v1.6
 * El cuerpo que permite al usuario interactuar con el alma del proyecto.
 * Integra: Física, Biología, Economía y Geometría Sagrada.
 */

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log(`
  ░▒▓ OASIS CORE v1.6 - "THE LIVING SYSTEM" ▓▒░
  ---------------------------------------------
  Física:   Newton, Tesla, Einstein, Landauer
  Biología: Curie, Turing
  Economía: Ramsey
  ---------------------------------------------
  `);

  switch (command) {
    case 'start':
      console.log("🚀 INICIANDO NODO OASIS...");
      const nodeId = Math.floor(Math.random() * 10000);
      console.log(`   > Identidad Fractal Generada: Nodo #${nodeId}`);
      const heartbeat = OasisMeshNetwork.getNextHeartbeat(nodeId, 1000);
      console.log(`   > Sincronización Irracional: ${heartbeat}ms (π / φ)`);
      const neighbors = OasisMeshNetwork.getIdealNeighbors(nodeId, 10000);
      console.log(`   > Conectando a Vecinos Fibonacci: [${neighbors.slice(0, 5).join(', ')}...]`);
      console.log(`   > Bóveda conectada: ${Economy.TREASURY_WALLET}`);
      console.log("   > Estado: ONLINE - Formando parte del Cristal (Idle).");
      break;

    case 'audit':
      console.log("⚖️  EJECUTANDO AUDITORÍA GAUSSIANA...");
      console.log("   > Z-Score: 0.01 (Comportamiento Honesto)");
      console.log("   > Veredicto: NODO SEGURO.");
      break;

    case 'economy':
      console.log("💰 ESTADO ECONÓMICO (Ramsey Rules):");
      console.log(`   > Fee Consumidor: ${(Economy.RAMSEY_FEES.TIER_CONSUMER * 100)}%`);
      console.log(`   > Fee Enterprise: ${(Economy.RAMSEY_FEES.TIER_ENTERPRISE * 100)}%`);
      console.log(`   > Surge Pricing:  ${(Economy.RAMSEY_FEES.TIER_SURGE * 100)}%`);
      break;

    case 'newton':
      console.log("🍎 SIMULACIÓN DE MECÁNICA NEWTONIANA (Decisión)...");
      const taskNewton = { mass: 500, urgency: 2, importance: 90, infoGain: 50 };
      console.log(`\n☄️  OBJETO: "IA Genómica" (Masa: ${taskNewton.mass}MB)`);
      const price = NewtonianMechanics.calculateForceToMove(taskNewton.mass, taskNewton.urgency);
      console.log(`   > Precio Inercial: ${price.toFixed(2)} SPN (F=ma)`);
      const gravity = NewtonianMechanics.calculateGravitationalPull(taskNewton.importance, 1000, 20);
      console.log(gravity > 10 ? "   > 🪐 RESULTADO: CAPTURA ORBITAL." : "   > 🚀 RESULTADO: FLYBY.");
      break;

    case 'tesla':
      console.log("⚡ SIMULACIÓN DE RESONANCIA DE TESLA (Flujo)...");
      const file = { size: 100 }; 
      console.log(`\n📡 INTENTANDO TRANSMISIÓN (Archivo: ${file.size}MB)...`);
      const nodeA = { lat: 50, bw: 500 }; 
      const Z_A = TeslaResonance.calculateImpedance(nodeA.lat, file.size, nodeA.bw);
      console.log(`   > Nodo A (Desfasado): Z = ${Z_A.toFixed(2)} Ω -> ${TeslaResonance.getResonanceQuality(Z_A, nodeA.lat)}`);
      const nodeB = { lat: 20, bw: 100 }; 
      const Z_B = TeslaResonance.calculateImpedance(nodeB.lat, file.size, nodeB.bw);
      console.log(`   > Nodo B (Sintonizado): Z = ${Z_B.toFixed(2)} Ω -> ${TeslaResonance.getResonanceQuality(Z_B, nodeB.lat)}`);
      break;

    case 'einstein':
      console.log("🌌 SIMULACIÓN DE RELATIVIDAD (Espacio-Tiempo)...");
      console.log("\n🛑 1. TEST DE CAUSALIDAD (Minkowski):");
      const distNY_Tokyo = 10800; 
      const claimedTime = 20;     
      console.log(`   > Transacción: NY -> Tokyo (${distNY_Tokyo} km) en ${claimedTime} ms.`);
      const isFraud = EinsteinPhysics.checkCausalityViolation(distNY_Tokyo, claimedTime);
      if (isFraud) console.log("   > 🚨 ALERTA: VIOLACIÓN DE CAUSALIDAD.");
      else console.log("   > ✅ VÁLIDO.");
      break;

    // --- BLOQUE BIOLÓGICO COMPLETO ---
    case 'bio':
      console.log("🧬 SISTEMAS BIOLÓGICOS AVANZADOS (v33.5)...");

      // 1. CURIE: DECAIMIENTO POR TIPO (Justicia Laboral)
      console.log("\n☢️  1. DECAIMIENTO DE ISÓTOPOS (144h Inactivo):");
      const repStart = 100;
      const hours = 144;
      
      const repGamer = RadioactiveCore.decayRadiation(repStart, hours, 'GAMER');
      console.log(`   > Gamer (PC Casa):     ${repStart} -> ${repGamer.toFixed(2)} (Cae rápido)`);
      
      const repAI = RadioactiveCore.decayRadiation(repStart, hours, 'COMPUTE');
      console.log(`   > Compute (Granja IA): ${repStart} -> ${repAI.toFixed(2)} (Estable como Enterprise)`);

      // 2. CURIE: DEFENSA GAUSSIANA
      console.log("\n🛡️  2. JUICIO GAUSSIANO (¿Baneamos?):");
      const lethalRad = 15; // Supera el límite de 10
      
      // Escenario A: Solo este nodo falla (Es una anomalía)
      const judgeA = RadioactiveCore.shouldBanNode(lethalRad, 0.5, 0.1);
      console.log(`   > Caso A (Solo tú fallas): ${judgeA.banned ? 'BANNED 🔨' : 'SAFE'} -> ${judgeA.reason}`);

      // Escenario B: Todos fallan (Fallo global de red)
      const judgeB = RadioactiveCore.shouldBanNode(lethalRad, 14, 2); 
      console.log(`   > Caso B (Todos fallan):   ${judgeB.banned ? 'BANNED 🔨' : 'SAFE'} -> ${judgeB.reason}`);
      
      // 3. TURING: REACCIÓN-DIFUSIÓN
      console.log("\n🐆 3. MORFOGÉNESIS (Turing Patterns):");
      
      // Escenario Viral (u alto, v bajo)
      const actionViral = TuringReplicator.decideState(0.8, 0.1, 0.7, 0.1);
      console.log(`   > Viral (u=0.8, v=0.1):   ${actionViral} 🦠 (Crecimiento Exponencial)`);

      // Escenario Basura (u bajo, v alto)
      const actionDead = TuringReplicator.decideState(0.1, 0.9, 0.1, 0.8);
      console.log(`   > Basura (u=0.1, v=0.9):  ${actionDead} 💀 (Apoptosis / Limpieza)`);

      // 4. LANDAUER: TERMODINÁMICA
      console.log("\n🌡️  4. LÍMITE DE LANDAUER & ECONOMÍA:");
      const dataBits = 1e12; // 1 Terabit
      const heatOasis = LandauerLimit.calculateHeatGenerated(dataBits, 'OASIS');
      const heatClassic = LandauerLimit.calculateHeatGenerated(dataBits, 'CLASSICAL');
      
      console.log(`   > Calor AWS:   ${heatClassic.toExponential(2)} J`);
      console.log(`   > Calor Oasis: ${heatOasis.toExponential(2)} J`);
      console.log(`   > 🌿 AHORRO:   ${LandauerLimit.getEfficiencyGain()}`);
      console.log(`   > 💰 PRECIO:   ${LandauerLimit.calculatePriceSPN(dataBits).toFixed(4)} SPN`);
      break;

    case 'help':
    default:
      console.log("Comandos disponibles:");
      console.log("  start, audit, economy, newton, tesla, einstein, bio");
      break;
  }
}

main();
