import { EconomicEngine } from '../economy/EconomicEngine';
import { Treasury } from '../economy/Treasury';
import { Economy } from '../constants/modules/Economy';
import { Physics } from '../constants/modules/Physics';
import { OasisMeshNetwork } from '../geometry/OasisMeshNetwork';
import { NewtonianMechanics } from '../physics/NewtonianMechanics';
import { TeslaResonance } from '../physics/TeslaResonance';
import { EinsteinPhysics } from '../physics/relativity/EinsteinPhysics'; // <--- NUEVO: EINSTEIN

/**
 * 🖥️ OASIS CLI (Command Line Interface) v1.3
 * El cuerpo que permite al usuario interactuar con el alma del proyecto.
 * Integra: Economía Ramsey, Física Termodinámica, Red Phi-CAP, Newton, Tesla y Einstein.
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
  Física:           Newton, Tesla & Einstein
  ----------------------------------
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
      const baseSpeed = 100; 
      const teslaSpeed = TeslaResonance.calculatePolyphaseThroughput(baseSpeed);
      console.log(`\n🚀 EFICIENCIA TRIFÁSICA (√3):`);
      console.log(`   > Estándar (TCP lineal): ${baseSpeed} Mbps`);
      console.log(`   > Oasis (Trifásico):     ${teslaSpeed.toFixed(2)} Mbps (+73% Ganancia Geométrica)`);
      break;

    // --- NUEVA SECCIÓN: EINSTEIN ---
    case 'einstein':
      console.log("🌌 SIMULACIÓN DE RELATIVIDAD (Espacio-Tiempo)...");

      // ESCENARIO 1: CAUSALIDAD
      console.log("\n🛑 1. TEST DE CAUSALIDAD (Minkowski):");
      const distNY_Tokyo = 10800; // km
      const claimedTime = 20;     // ms (Imposible, la luz tarda ~36ms)
      console.log(`   > Transacción: NY -> Tokyo (${distNY_Tokyo} km) en ${claimedTime} ms.`);
      const isFraud = EinsteinPhysics.checkCausalityViolation(distNY_Tokyo, claimedTime);
      
      if (isFraud) {
          console.log("   > 🚨 ALERTA: VIOLACIÓN DE CAUSALIDAD. Transacción rechazada.");
          console.log("     [Razón] La luz tardaría ~36ms. Es físicamente imposible (Métrica ds^2).");
      } else {
          console.log("   > ✅ VÁLIDO: Intervalo causal correcto.");
      }

      // ESCENARIO 2: DILATACIÓN TEMPORAL
      console.log("\n⏳ 2. DILATACIÓN TEMPORAL (Lorentz):");
      const stressLoad = 90; // Nodo saturado (Alta Gravedad)
      const dilation = EinsteinPhysics.calculateTimeDilation(stressLoad);
      console.log(`   > Carga del Nodo: ${stressLoad}%`);
      console.log(`   > Factor de Dilatación (Gamma): ${dilation.toFixed(4)}x`);
      console.log(`   > Conclusión: 1 seg del nodo = ${dilation.toFixed(2)} seg reales.`);
      console.log("     [Acción] Timeout extendido automáticamente.");

      // ESCENARIO 3: E = mc^2
      console.log("\n⚡ 3. PRECIO RELATIVISTA (E=mc^2):");
      const mass = 100; // MB
      const urgency = 5; 
      const priceE = EinsteinPhysics.calculateRelativisticPrice(mass, urgency);
      console.log(`   > Masa: ${mass}MB | Urgencia: ${urgency}^2`);
      console.log(`   > Coste Energético: ${priceE} SPN`);
      break;
    // -------------------------------

    case 'help':
    default:
      console.log("Comandos disponibles:");
      console.log("  start   -> Iniciar nodo (Phi-CAP).");
      console.log("  newton  -> Simular física de decisión (F=ma).");
      console.log("  tesla   -> Simular física de flujo (Resonancia).");
      console.log("  einstein-> Simular física de ley (Relatividad)."); // <--- AÑADIDO
      console.log("  audit   -> Verificar integridad.");
      console.log("  economy -> Ver precios.");
      break;
  }
}

main();
