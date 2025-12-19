import { EconomicEngine } from '../src/economy/EconomicEngine';

console.log("🔮 INICIANDO SIMULACIÓN DE VIDA OASIS (v36.0)...\n");

// ESCENARIO 1: EL SUPERVIVIENTE ALEMÁN
// Luz cara ($0.40), Usuario Gamer (Tier bajo), Red tranquila.
console.log("🇩🇪 CASO 1: Nodo en Berlín (Luz Cara) vs Gamer");
const berlin = EconomicEngine.calculateTransactionPrice(
    350,        // 350W (PC Gamer)
    1,          // 1 hora
    0.40,       // $0.40/kWh (Carísimo)
    'MED',      // Hardware Medio
    'CONSUMER', // Usuario Gamer
    0.4         // Red al 40% (Tranquila)
);
console.log(`   > Coste Luz Real: $${berlin.metadata.locationPrice}/kWh`);
console.log(`   > Precio Cliente: $${berlin.financials.totalUserPays.toFixed(4)}`);
console.log(`   > ¿Nodo Gana?:    SÍ ($${berlin.financials.nodeNet.toFixed(4)})`);
console.log(`   > Oasis Fee (1%): $${berlin.financials.oasisRevenue.toFixed(4)}\n`);


// ESCENARIO 2: EL ARBITRAJE PARAGUAYO
// Luz regalada ($0.01), Render Profesional, Red normal.
console.log("🇵🇾 CASO 2: Nodo en Asunción (Hidroeléctrica) vs Render Pro");
const asuncion = EconomicEngine.calculateTransactionPrice(
    350,        // 350W
    1,          // 1 hora
    0.01,       // $0.01/kWh (Casi gratis)
    'MED',
    'PRO',      // Usuario Profesional
    0.5         // Red al 50%
);
console.log(`   > Coste Luz Real: $${asuncion.metadata.locationPrice}/kWh`);
console.log(`   > Precio Cliente: $${asuncion.financials.totalUserPays.toFixed(4)} (¡Competitivo!)`);
console.log(`   > Oasis Fee (5%): $${asuncion.financials.oasisRevenue.toFixed(4)}\n`);


// ESCENARIO 3: LA CRISIS (SURGE PRICING)
// Red colapsada (95%), Cliente Enterprise (Hospital), Pánico.
console.log("🚨 CASO 3: Red Saturada (95%) vs Hospital (Enterprise)");
const crisis = EconomicEngine.calculateTransactionPrice(
    800,        // 800W (H100 GPU)
    1,          // 1 hora
    0.10,       // $0.10/kWh
    'HIGH',     // Hardware Top
    'ENTERPRISE',
    0.95        // ¡Red al 95%! (SURGE ACTIVO)
);

console.log(`   > Estado Red:     ${crisis.metadata.isSurge ? "🔥 SURGE ACTIVO" : "Normal"}`);
console.log(`   > Precio Cliente: $${crisis.financials.totalUserPays.toFixed(4)} (Disuasorio)`);
console.log(`   > Oasis Fee (50%):$${crisis.financials.oasisRevenue.toFixed(4)} (¡Jackpot!)`);
console.log(`   > Efecto:         El precio alto atrae nuevos nodos para enfriar la red.\n`);
