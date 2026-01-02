import { EconomicEngine } from '../src/economy/EconomicEngine';

console.log("---------------------------------------------------");
console.log("🌍 SIMULACIÓN DE VIDA: OASIS NETWORK (RAMSEY PRICING)");
console.log("---------------------------------------------------\n");

// --- ESCENARIO 1: BERLÍN (Energía cara, Demanda media) ---
console.log("📍 Escenario 1: Berlín (Alemania)");
const berlin = EconomicEngine.calculateTransactionPrice(
    1,          // 1. Duración (Horas)
    0.40,       // 2. Coste Luz ($/kWh) - ¡Número correcto aquí!
    'Berlin',   // 3. Ubicación (String)
    1000,       // 4. Ancho de banda (Mbps)
    'CONSUMER', // 5. Tier
    0.40        // 6. Carga de red (40%)
);

console.log(`   > Coste Luz Real: $${berlin.metadata.locationPrice}/kWh`);
console.log(`   > Precio Cliente: $${berlin.financials.totalUserPays.toFixed(4)}`);
console.log(`   > ¿Nodo Gana?:    SÍ ($${berlin.financials.nodeNet.toFixed(4)})`);
console.log(`   > Oasis Fee (1%): $${berlin.financials.oasisRevenue.toFixed(4)}\n`);


// --- ESCENARIO 2: ASUNCIÓN (Energía barata, Hidroeléctrica) ---
console.log("📍 Escenario 2: Asunción (Paraguay)");
const asuncion = EconomicEngine.calculateTransactionPrice(
    1,          // Duración
    0.01,       // Coste Luz ($0.01/kWh)
    'Asuncion', // Ubicación
    5000,       // Bandwidth alto
    'PRO',      // Tier
    0.5         // Carga media
);

console.log(`   > Coste Luz Real: $${asuncion.metadata.locationPrice}/kWh`);
console.log(`   > Precio Cliente: $${asuncion.financials.totalUserPays.toFixed(4)} (¡Competitivo!)`);
console.log(`   > Oasis Fee (5%): $${asuncion.financials.oasisRevenue.toFixed(4)}\n`);


// --- ESCENARIO 3: CRISIS GLOBAL (Red saturada) ---
console.log("🔥 Escenario 3: CRISIS (Red Saturada - SURGE PRICING)");
const crisis = EconomicEngine.calculateTransactionPrice(
    1,          // Duración
    0.10,       // Coste Luz medio
    'Global',   // Ubicación
    10000,      // Bandwidth masivo
    'ENTERPRISE',
    0.95        // ¡Red al 95%! (SURGE ACTIVO)
);

console.log(`   > Estado Red:     ${crisis.metadata.isSurge ? "🚨 SURGE ACTIVO" : "Normal"}`);
console.log(`   > Precio Cliente: $${crisis.financials.totalUserPays.toFixed(4)} (Disuasorio)`);
console.log(`   > Oasis Fee:      $${crisis.financials.oasisRevenue.toFixed(4)} (¡Jackpot!)\n`);
