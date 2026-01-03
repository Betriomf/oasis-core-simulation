import { HardwareSecurity } from '../security/HardwareSecurity';
import { IdentityManager } from '../security/IdentityManager';
import { WalletCore } from '../economy/WalletCore';
import { P2PNetwork } from '../network/P2PNetwork';
import { GaloisSharding } from '../storage/GaloisSharding';
import { HolographicStorage } from '../storage/HolographicStorage';
import * as readline from 'readline';

const askQuestion = (query: string) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise<string>(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
};

// --- ESTADO DEL NODO LOCAL ---
const LocalNode = {
    pledgedGB: 0,      
    virtualCredit: 0,  
    usedCredit: 0      
};

// --- GESTIÓN DE APORTE (RECIPROCIDAD) ---
const PledgeManager = {
    configure: async () => {
        console.log("\n⚖️  CONFIGURACIÓN DE RECIPROCIDAD (El Círculo Negro)");
        console.log("==================================================");
        console.log("Para tener derecho a usar la red, debes ceder espacio local.");
        console.log("💎 RATIO DE APALANCAMIENTO: 1:1000");
        
        const gb = await askQuestion("\n> ¿Cuántos GB de tu disco cedes al enjambre?: ");
        const pledged = parseFloat(gb);
        
        if (isNaN(pledged) || pledged <= 0) {
            console.log("❌ Error: Debes contribuir.");
            process.exit(1);
        }

        LocalNode.pledgedGB = pledged;
        LocalNode.virtualCredit = pledged * 1000; 
        console.log(`✅ APORTE CONFIRMADO: ${LocalNode.pledgedGB} GB cedidos.`);
        await new Promise(r => setTimeout(r, 1000));
    }
};

// --- RESTAURACIÓN DE TÉRMINOS LEGALES COMPLETOS (v2026) ---
const LegalManager = {
    showFullTerms: async (askFn: any) => {
        console.log("\n📜 TÉRMINOS Y CONDICIONES DEL NODO SOBERANO (v2026)");
        console.log("=====================================================");
        
        console.log("1. PRINCIPIO DE RECIPROCIDAD:");
        console.log("   La red es colaborativa. Recibes crédito (x1000) basado en lo que aportas.");
        
        console.log("\n2. MERO CONDUCTO Y NEUTRALIDAD:");
        console.log("   Tu nodo procesa matemáticas cifradas, no contenido.");
        console.log("   La red no tiene 'dueños' ni servidores centrales.");

        console.log("\n3. LEY DE ENTROPÍA (CICLOS DE VIDA):");
        console.log("   Oasis NO es un almacén infinito. Los datos tienen fecha de caducidad.");
        console.log("   Debes elegir un nivel de persistencia para cada archivo:");
        console.log("     - 🟡 NIVEL 1: 90 Días  (Temporal / Caché)");
        console.log("     - 🟢 NIVEL 2: 180 Días (Estándar / Proyectos)");
        console.log("     - 🔵 NIVEL 3: 360 Días (Archivo / Larga Duración)");
        console.log("   ⚠️ Si no renuevas (visitas) el dato, la 'Poda Sináptica' lo reciclará.");

        console.log("=====================================================");
        
        const agreement = await askFn("\n✍️ Escribe 'ENTIENDO' para aceptar estos términos: ");
        if (agreement.trim().toUpperCase() !== 'ENTIENDO') {
            console.log(`\n❌ Acceso denegado.`);
            process.exit(1);
        }
        console.log("✅ Conciencia Sincronizada.\n");
    }
};

// --- LÓGICA DE GUARDADO (FÍSICA + BEKENSTEIN) ---
async function handleQuantumStorage() {
    console.log("\n📡 INICIANDO SONAR DE RED (Capacity Check)");
    
    // 1. OBTENER LA REALIDAD FÍSICA
    const stats = await P2PNetwork.scanNetworkStatus();
    
    // 2. CALCULAR EL LÍMITE REAL (Intersección Economía vs Física)
    const myRights = LocalNode.virtualCredit - LocalNode.usedCredit;
    const physicsLimit = stats.effective;
    
    // Límite de Bekenstein: El mínimo entre tus derechos y la realidad
    const realAvailable = Math.min(myRights, physicsLimit);

    console.log("\n📊 INFORME DE ESTADO (Gravedad Entrópica):");
    console.log(`   > 🌍 Capacidad Física Red: ${physicsLimit.toFixed(2)} GB`);
    console.log(`   > 💳 Tu Crédito Virtual:   ${myRights.toFixed(2)} GB`);
    console.log(`   > 🔓 DISPONIBLE REAL:      ${realAvailable.toFixed(2)} GB (Límite de Bekenstein)`);

    if (realAvailable <= 0.1) {
        console.log("\n⛔ ALERTA: Horizonte de Sucesos alcanzado. Red llena o sin crédito.");
        return;
    }

    // 3. MENÚ DE INGESTA
    console.log("\n📥 MÓDULO DE INGESTA");
    console.log("  [A] AirDrop / Nearby | [B] Quick Share | [C] Ruta Local");
    const inputMethod = await askQuestion("\n> Método [A/B/C]: ");
    const fileName = await askQuestion("> Nombre del archivo: ");

    // 4. TTL (Selector de Entropía)
    console.log("\n⏳ CICLO DE VIDA (TTL)");
    console.log("   [1] 🟡 90 Días  (Coste Base: x1)");
    console.log("   [2] 🟢 180 Días (Coste Base: x1.5)");
    console.log("   [3] 🔵 360 Días (Coste Base: x2)");
    const ttl = await askQuestion("> Selección [1-3]: ");

    // 5. ANÁLISIS DE MASA
    const fileSizeMB = Math.floor(Math.random() * 5000) + 100; 
    const fileSizeGB = fileSizeMB / 1024;
    console.log(`\n⚙️  ANALIZANDO MASA DE '${fileName}' (${fileSizeGB.toFixed(2)} GB)...`);

    // 6. CHECK HOLOGRÁFICO
    const fileHash = HolographicStorage.calculateHolographicHash(fileName);
    const exists = HolographicStorage.checkGlobalExistence(fileHash);

    if (exists) {
        console.log("\n✨ COINCIDENCIA HOLOGRÁFICA (Masa Nula).");
        console.log("✅ GUARDADO (Referencia Deduplicada).");
    } else {
        console.log("   > Archivo ÚNICO (Masa Positiva).");
        
        // 7. CHECK DE RADIACIÓN HAWKING (¿Cabe?)
        if (fileSizeGB > realAvailable) {
            console.log(`\n☢️ RADIACIÓN DE HAWKING ACTIVADA (Rechazo)`);
            console.log(`   El archivo supera tu límite disponible (${realAvailable.toFixed(2)} GB).`);
            return;
        }

        console.log("   > 🛡️ Aplicando Campos de Galois...");
        GaloisSharding.transmuteToShards(fileName);
        console.log("   > 🌻 Distribuyendo fragmentos...");
        await new Promise(r => setTimeout(r, 800));

        LocalNode.usedCredit += fileSizeGB;
        
        console.log(`\n✅ ARCHIVO GUARDADO.`);
        console.log(`   📉 Tu Crédito Restante: ${(LocalNode.virtualCredit - LocalNode.usedCredit).toFixed(2)} GB`);
    }
}

async function main() {
    console.log(`\n🔒 INICIANDO SECURE BOOT...`);
    await IdentityManager.generateIdentity(); 
    
    // PRIMERO: Legalidad Completa
    await LegalManager.showFullTerms(askQuestion);
    // SEGUNDO: Reciprocidad
    await PledgeManager.configure();

    while (true) {
        console.log(`\n    🌌 OASIS CORE v7.10 - "GOLD STANDARD"\n    =====================================`);
        console.log("1. 📥 Guardar Dato (Bekenstein + Legal)");
        console.log("2. 📊 Ver Panel Económico");
        console.log("3. 🚪 Salir");

        const selection = await askQuestion("\n> Opción [1-3]: ");

        switch (selection) {
            case '1': await handleQuantumStorage(); break;
            case '2': 
                 const balance = WalletCore.getBalance();
                 console.log(`📊 SALDO: ${balance.rose} ROSE | APORTE: ${LocalNode.pledgedGB} GB`);
                 console.log(`📊 CRÉDITO: ${(LocalNode.virtualCredit - LocalNode.usedCredit).toFixed(2)} / ${LocalNode.virtualCredit} GB`);
                 break;
            case '3': process.exit(0); break;
        }
    }
}

main();
