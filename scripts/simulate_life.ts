import { EconomicEngine } from '../extension/src/core/economy/EconomicEngine';

// SIMULACIÓN DE VIDA ECONÓMICA
async function runSimulation() {
    console.log("🌱 Iniciando Simulación de Economía Oasis...");
    
    // Simulamos un ciclo de vida
    const health = EconomicEngine.assessNetworkHealth();
    console.log(`   > Salud de la Red: ${(health * 100).toFixed(2)}%`);

    console.log("✅ Ciclo completado.");
}

runSimulation();
