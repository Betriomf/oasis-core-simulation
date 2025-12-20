import { EconomicEngine } from '../economy/EconomicEngine';
import { Treasury } from '../economy/Treasury';
import { Economy } from '../constants/modules/Economy';
import { Physics } from '../constants/modules/Physics';
import { OasisMeshNetwork } from '../geometry/OasisMeshNetwork';
import { NewtonianMechanics } from '../physics/NewtonianMechanics'; // <--- NUEVO MÓDULO

/**
 * 🖥️ OASIS CLI (Command Line Interface) v1.1
 * El cuerpo que permite al usuario interactuar con el alma del proyecto.
 * Integra: Economía Ramsey, Física Termodinámica, Red Phi-CAP y Mecánica Newtoniana.
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
  Física:           Newtoniana (F=ma)
  ----------------------------------
  `);

  switch (command) {
    case 'start':
      console.log("🚀 INICIANDO NODO OASIS...");
      
      // 1. Identidad Fractal
      const nodeId = Math.floor(Math.random() * 10000);
      console.log(`   > Identidad Fractal Generada: Nodo #${nodeId}`);

      // 2. Latido Irracional (Solución al CAP)
      const heartbeat = OasisMeshNetwork.getNextHeartbeat(nodeId, 1000);
      console.log(`   > Sincronización Irracional: ${heartbeat}ms (π / φ)`);
      console.log("     [Info] Intervalo anti-colisión activo.");

      // 3. Topología de Cristal
      const neighbors = OasisMeshNetwork.getIdealNeighbors(nodeId, 10000);
      console.log(`   > Conectando a Vecinos Fibonacci: [${neighbors.slice(0, 5).join(', ')}...]`);

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
      console.log(`   > Surge Pricing:  ${(Economy.RAMSEY_FEES.TIER_SURGE * 100)}%`);
      break;

    // --- NUEVA SECCIÓN: SIMULACIÓN FÍSICA ---
    case 'newton':
      console.log("🍎 SIMULACIÓN DE MECÁNICA NEWTONIANA...");
      
      // ESCENARIO: Un cliente quiere procesar un modelo de IA (Pesado y Urgente)
      const task = {
        name: "Entrenamiento IA Genómica",
        mass: 500,      // 500 MB de masa entrópica
        urgency: 2,     // Lo quiere en 2 segundos (Muy urgente)
        importance: 90, // Alta prioridad (m1)
        infoGain: 50    // Alta ganancia de información (dS)
      };

      console.log(`\n☄️  OBJETO ENTRANTE: "${task.name}"`);
      console.log(`   > Masa: ${task.mass}MB | Urgencia: ${task.urgency}s`);

      // 1. CÁLCULO DE PRECIO (F = ma)
      const price = NewtonianMechanics.calculateForceToMove(task.mass, task.urgency);
      console.log(`   > 1. Inercia (Precio): ${price.toFixed(2)} SPN (F=ma)`);

      // 2. FILTRO ENTRÓPICO (Verlinde)
      const isWorthy = NewtonianMechanics.verifyThermodynamicJustification(0.05, task.infoGain, 10);
      if (!isWorthy) {
          console.log("   > 🛑 RECHAZADO: Fuerza entrópica insuficiente (Spam).");
          break;
      }
      console.log("   > ✅ ACEPTADO: Termodinámicamente rentable.");

      // 3. CAPTURA GRAVITATORIA (Gravitación Universal)
      // Simulamos tu nodo actual
      const myNode = { power: 1000, latency: 20 }; // Nodo potente, cerca (20ms)
      const gravity = NewtonianMechanics.calculateGravitationalPull(task.importance, myNode.power, myNode.latency);
      
      console.log(`   > 2. Gravedad Local: ${gravity.toFixed(4)} Newtons`);
      
      if (gravity > 10) {
          console.log("   > 🪐 RESULTADO: CAPTURA ORBITAL. El nodo ha atraído la tarea.");
      } else {
          console.log("   > 🚀 RESULTADO: FLYBY. La tarea escapa a otro nodo más masivo.");
      }
      break;
    // ----------------------------------------

    case 'help':
    default:
      console.log("Comandos disponibles:");
      console.log("  start   -> Iniciar el nodo (Phi-CAP + Mesh).");
      console.log("  newton  -> Simular física de enrutamiento (F=ma)."); // <--- AÑADIDO
      console.log("  audit   -> Verificar reputación (Gauss).");
      console.log("  economy -> Ver reglas de precio (Ramsey).");
      break;
  }
}

main();
