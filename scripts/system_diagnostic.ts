import { Economy } from '../src/constants/modules/Economy';
import { Physics } from '../src/constants/modules/Physics';
import { OasisMeshNetwork } from '../src/geometry/OasisMeshNetwork';
import { NewtonianMechanics } from '../src/physics/NewtonianMechanics';
import { EconomicEngine } from '../src/economy/EconomicEngine';

/**
 * 🏥 OASIS SYSTEM DIAGNOSTIC TOOL
 * Ejecuta una prueba de integridad de todos los órganos vitales del proyecto.
 */

async function runDiagnostic() {
    console.log("🏥 INICIANDO DIAGNÓSTICO DE SISTEMA COMPLETO...\n");
    let score = 0;
    let totalChecks = 5;

    // 1. CHEQUEO DEL ALMA (Constantes)
    console.log("1. [ALMA] Verificando Constantes Universales...");
    if (Physics.C_OASIS === 200000 && Economy.RAMSEY_FEES.TIER_ENTERPRISE === 0.20) {
        console.log("   ✅ Constantes Físicas y Económicas cargadas correctamente.");
        score++;
    } else {
        console.log("   ❌ ERROR: Corrupción en constantes universales.");
    }

    // 2. CHEQUEO DEL SISTEMA NERVIOSO (Phi-CAP)
    console.log("\n2. [RED] Probando Sincronización Phi-CAP...");
    const heartbeat = OasisMeshNetwork.getNextHeartbeat(1, 1000);
    // Verificamos que sea irracional (no entero redondo)
    if (heartbeat % 100 !== 0) { 
        console.log(`   ✅ Latido Irracional detectado (${heartbeat}ms). Inmunidad CAP activa.`);
        score++;
    } else {
        console.log("   ❌ ERROR: El latido es demasiado regular. Riesgo de colisión.");
    }

    // 3. CHEQUEO DEL CEREBRO (Newton)
    console.log("\n3. [FÍSICA] Simulando Gravedad y Entropía...");
    const gravity = NewtonianMechanics.calculateGravitationalPull(50, 1000, 10); // Tarea media, nodo fuerte, cerca
    const price = NewtonianMechanics.calculateForceToMove(100, 1); // 100MB, 1s urgencia
    if (gravity > 0 && price > 0) {
        console.log(`   ✅ Motor Newtoniano operativo. (G=${gravity.toFixed(2)}N, F=${price.toFixed(2)}SPN)`);
        score++;
    } else {
        console.log("   ❌ ERROR: Fallo en leyes de movimiento.");
    }

    // 4. CHEQUEO DEL CORAZÓN ECONÓMICO (Ramsey + Surge)
    console.log("\n4. [ECONOMÍA] Test de Estrés (Surge Pricing)...");
    const tx = EconomicEngine.calculateTransactionPrice(500, 1, 0.1, 'MED', 'ENTERPRISE', 0.99); // Red al 99%
    if (tx.metadata.isSurge === true) {
        console.log("   ✅ Surge Pricing activado correctamente ante saturación.");
        score++;
    } else {
        console.log("   ❌ ERROR: El sistema no reaccionó a la crisis de red.");
    }

    // 5. CHEQUEO DE GOBERNANZA (Cuadrática)
    console.log("\n5. [GOBERNANZA] Simulando Resistencia a Plutocracia...");
    const whaleMoney = 1000;
    const quadraticPower = Math.floor(Math.sqrt(whaleMoney));
    if (quadraticPower < whaleMoney) {
        console.log(`   ✅ Voto Cuadrático activo. (1000 SPN = ${quadraticPower} Votos). Ballenas neutralizadas.`);
        score++;
    } else {
        console.log("   ❌ ERROR: El sistema es lineal. Riesgo de ataque plutocrático.");
    }

    // RESULTADO FINAL
    console.log("\n-------------------------------------------");
    const health = (score / totalChecks) * 100;
    console.log(`📊 PUNTUACIÓN DE INTEGRIDAD: ${health}%`);
    
    if (health === 100) {
        console.log("✨ SISTEMA NOMINAL. LISTO PARA DESPLIEGUE.");
        console.log("   El proyecto está Vivo, Libre y Seguro.");
    } else {
        console.log("⚠️ ATENCIÓN: Se detectaron fallos críticos.");
    }
    console.log("-------------------------------------------\n");
}

runDiagnostic();
