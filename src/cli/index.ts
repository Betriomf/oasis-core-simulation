import { HardwareSecurity } from '../security/HardwareSecurity';
import { IdentityManager } from '../security/IdentityManager';
import { WalletCore } from '../economy/WalletCore';
import { P2PNetwork } from '../network/P2PNetwork';
import { OasisSapphire } from '../bridge/OasisSapphire';
import * as readline from 'readline';

const askQuestion = (query: string) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise<string>(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
};

// --- GESTIÓN DE ALMACENAMIENTO (Modelo Biológico) ---
const StorageManager = {
    checkQuota: () => ({ used: 1.5, provided: 10, ratio: 0.15 }),
    
    // Aplicando Biología (Poda Sináptica) y Física (Entropía)
    explainPhilosophy: () => {
        console.log("\n🕸️  MODELO DE MEMORIA COLABORATIVA (Sinaptic Pruning)");
        console.log("   En Oasis, los datos se comportan como neuronas:");
        console.log("   Si no se 'activan' (visitan), la red asume que son ruido y los recicla.");
        console.log("   Esto mantiene el ecosistema sano y ligero sin servidores centrales.");
    }
};

// --- GESTIÓN LEGAL (Responsabilidad Distribuida) ---
const LegalManager = {
    showFullTerms: async (askFn: any) => {
        console.log("\n📜 MANIFIESTO DE RESPONSABILIDAD COMPARTIDA");
        console.log("=============================================");
        
        console.log("\n1. PRINCIPIO DE ENTROPÍA (Física):");
        console.log("   Oasis es un sistema vivo. La persistencia de un dato depende");
        console.log("   de la 'Energía de Atención' que recibe (visitas/lecturas).");
        
        console.log("\n2. AUSENCIA DE GARANTÍA (Economía):");
        console.log("   Este es un espacio colaborativo gratuito. Los creadores NO son");
        console.log("   responsables si la 'Poda Sináptica' de la red elimina datos abandonados.");
        
        console.log("\n3. SOBERANÍA RADICAL (Psicología):");
        console.log("   Tú decides cuánto tiempo puede sobrevivir tu dato sin atención.");
        console.log("   Si el contador llega a cero, el dato regresa al vacío.");

        console.log("=============================================");
        
        const agreement = await askFn("\n✍️ Escribe 'ENTIENDO' para aceptar las leyes físicas del sistema: ");
        if (agreement.toUpperCase() !== 'ENTIENDO') {
            console.log("❌ Debes comprender el modelo para usar Oasis.");
            process.exit(1);
        }
        console.log("✅ Conciencia Sincronizada. Iniciando nodo...\n");
    }
};

async function handleStorageLogic() {
    StorageManager.explainPhilosophy();
    
    console.log("\n📥 CONFIGURACIÓN DE PERSISTENCIA (Time-to-Live)");
    console.log("Elige cuánto tiempo pueden sobrevivir tus datos SIN que nadie los mire:");
    
    console.log("   1. 🗓️  Corto Plazo (90 Días)  - Ideal para caché/temporal.");
    console.log("   2. 📅  Medio Plazo (6 Meses)  - Proyectos activos.");
    console.log("   3. 🧠  Largo Plazo (1 Año)    - Archivos importantes.");
    
    const choice = await askQuestion("\n> Selecciona ciclo de vida [1-3]: ");
    let duration = "";
    
    switch(choice) {
        case '1': duration = "90 Días"; break;
        case '2': duration = "6 Meses"; break;
        case '3': duration = "1 Año"; break;
        default: console.log("Opción inválida, asignando 90 días por defecto."); duration = "90 Días";
    }
    
    console.log(`\n⏳ ENTROPÍA CONFIGURADA: ${duration}`);
    console.log("⚠️  ADVERTENCIA: Si nadie accede a estos datos en ese periodo,");
    console.log("    la red liberará el espacio automáticamente.");
    
    await new Promise(r => setTimeout(r, 800));
    console.log(" > 🔒 Cifrando...");
    console.log(" > 🕸️  Dispersando en el enjambre...");
    console.log("✅ DATOS GUARDADOS.");
}

async function main() {
    // 1. INICIO
    console.log(`\n🔒 INICIANDO SECURE BOOT...`);
    await IdentityManager.generateIdentity(); 

    // 2. CONSENTIMIENTO DEL MODELO MENTAL
    await LegalManager.showFullTerms(askQuestion);

    // 3. ESTADO
    const quota = StorageManager.checkQuota();
    console.log(`📊 ESTADO DEL NODO: ${quota.used}GB / ${quota.provided}GB`);

    // BUCLE
    while (true) {
        console.log(`
    🌌 OASIS CORE v7.2 - "MENTAL MODELS"
    =====================================
    `);
        console.log("--- 💾 MEMORIA COLECTIVA ---");
        console.log("1. 📥 Guardar Dato (Configurar Entropía)");
        
        console.log("\n--- 🧠 INTELIGENCIA ARTIFICIAL ---");
        console.log("2. 🏠 Entrenar IA Local (Candle)");
        console.log("3. ☁️ Consultar IA Externa");

        console.log("\n--- 💰 RECURSOS ---");
        console.log("4. 💸 Ofrecer Recursos a la Red");
        
        console.log("\n--- 🛡️ SISTEMA ---");
        console.log("5. 👻 Transacción Privada");
        console.log("6. 🚪 Salir");

        const selection = await askQuestion("\n> Opción [1-6]: ");

        switch (selection) {
            case '1': await handleStorageLogic(); break;
            case '2': console.log("🏠 IA Local..."); break;
            case '3': console.log("☁️ SingularityNET..."); break;
            case '4': console.log("💸 Compartiendo..."); break;
            case '5': await OasisSapphire.executeStealthTransaction(); break;
            case '6': process.exit(0); break;
            default: console.log("Opción no válida.");
        }
        await askQuestion("\n[ENTER] para continuar...");
    }
}

main();
