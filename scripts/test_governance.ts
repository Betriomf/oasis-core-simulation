/**
 * 🗳️ QUADRATIC GOVERNANCE SIMULATOR
 * Demuestra cómo las matemáticas protegen a la comunidad frente al capital.
 */

console.log("🏛️ INICIANDO SIMULACIÓN DE GOBERNANZA CUADRÁTICA...\n");

// Escenario: Votación para cambiar el Fee al 100% (Ataque Malicioso)

// ACTOR 1: LA BALLENA (El Millonario)
// Tiene 1000 Tokens y quiere imponer su voluntad (10 Votos de fuerza)
const whaleTokens = 1000;
const whaleVotes = Math.floor(Math.sqrt(whaleTokens)); // Raíz cuadrada de 1000 = 31 votos
console.log(`🐋 LA BALLENA:`);
console.log(`   > Capital: ${whaleTokens} SPN`);
console.log(`   > Poder de Voto (Lineal): 1000`);
console.log(`   > Poder de Voto (Cuadrático): ${whaleVotes}`);
console.log(`   > Coste por Voto Real: ${(whaleTokens/whaleVotes).toFixed(2)} SPN/voto\n`);

// ACTOR 2: EL ENJAMBRE (La Comunidad)
// Son 10 Desarrolladores pequeños, cada uno con solo 100 Tokens.
const devs = 10;
const devTokens = 100; // Cada uno
const devVotesPerPerson = Math.floor(Math.sqrt(devTokens)); // Raíz de 100 = 10 votos
const totalSwarmVotes = devs * devVotesPerPerson;

console.log(`🐝 EL ENJAMBRE (10 Devs):`);
console.log(`   > Capital Total: ${devs * devTokens} SPN (Igual que la Ballena)`);
console.log(`   > Poder de Voto Individual: ${devVotesPerPerson}`);
console.log(`   > PODER DE VOTO TOTAL: ${totalSwarmVotes}`);
console.log(`   > Coste por Voto Real: ${(devTokens/devVotesPerPerson).toFixed(2)} SPN/voto\n`);

// EL RESULTADO
console.log("⚔️ RESULTADO DE LA VOTACIÓN:");
console.log(`   🐋 Ballena: ${whaleVotes} votos`);
console.log(`   🐝 Enjambre: ${totalSwarmVotes} votos`);

if (totalSwarmVotes > whaleVotes) {
    console.log("\n✅ VICTORIA DE LA COMUNIDAD: El sistema cuadrático ha neutralizado el capital concentrado.");
    console.log("   Con el mismo dinero total, la comunidad distribuida tiene 3 VECES más poder.");
} else {
    console.log("\n❌ FALLO: La plutocracia ha ganado.");
}
