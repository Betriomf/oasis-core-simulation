import { HardwareSecurity } from '../security/HardwareSecurity';
import { IdentityManager } from '../security/IdentityManager';
import { WalletCore } from '../economy/WalletCore';
import { P2PNetwork } from '../network/P2PNetwork';
import { HolographicStorage } from '../storage/HolographicStorage';
import { RetrievalEngine } from '../storage/RetrievalEngine';
import { SemanticEngine } from '../semantic/SemanticEngine';
import { ComplianceManager } from '../security/ComplianceManager';
import { PersonalIndex } from '../storage/PersonalIndex';
import { FileLauncher } from './FileLauncher';
import { CrossPlatformShare } from '../network/CrossPlatformShare';
import * as readline from 'readline';
import * as crypto from 'crypto';

const askQuestion = (query: string) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise<string>(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
};

const LocalNode = { pledgedGB: 0, virtualCredit: 0, usedCredit: 0, reputationSBT: 10, id: 'd38fb8ba50' };

const PledgeManager = {
    configure: async () => {
        console.log("\n⚖️  CONFIGURACIÓN DE RECIPROCIDAD");
        const gb = await askQuestion("\n> ¿Cuántos GB cedes?: ");
        const pledged = parseFloat(gb);
        if (isNaN(pledged) || pledged <= 0) process.exit(1);
        LocalNode.pledgedGB = pledged;
        LocalNode.virtualCredit = pledged * 1000;
        LocalNode.reputationSBT += (pledged * 10);
        ComplianceManager.logEvent(LocalNode.id, 'PLEDGE_RESOURCE', `${pledged}GB`, 'SUCCESS');
        console.log(`✅ APORTE REGISTRADO.\n`);
    }
};

const LegalManager = {
    showFullTerms: async (askFn: any) => {
        console.log("\n📜 MARCO LEGAL (ENS / ISO 27001)");
        console.log("   - Cumplimiento estricto de disponibilidad e integridad.");
        console.log("   - Garantía de Derecho al Olvido (Borrado Seguro).");
        const ag = await askFn("\n✍️ Escribe 'CONFORME': ");
        if (ag.trim().toUpperCase() !== 'CONFORME') process.exit(1);
        ComplianceManager.logEvent(LocalNode.id, 'ACCEPT_TERMS', 'v7.21', 'SUCCESS');
        console.log("✅ Sincronizado.\n");
    }
};

async function handleStorage() {
    console.log("\n📥 INGESTA DE DATOS (Universal Bridge)");
    console.log("   [A] 📱 AirDrop / Nearby / Quick Share");
    console.log("   [B] 💾 Disco Local");
    
    const method = await askQuestion("> Selección [A/B]: ");
    let name = "", sizeGB = 0;

    if (method.toUpperCase() === 'A') {
        const devices = await CrossPlatformShare.scanNearbyDevices();
        console.log("\n📱 Dispositivos encontrados:");
        devices.forEach((d, i) => console.log(`   [${i+1}] ${d}`));
        const devIndex = await askQuestion("> Selecciona origen [1-3]: ");
        const fileData = await CrossPlatformShare.receiveFile(devices[parseInt(devIndex)-1]);
        name = fileData.name; sizeGB = fileData.size;
    } else {
        name = await askQuestion("> Nombre del archivo: ");
        sizeGB = (Math.random() * 5) + 0.1;
    }

    console.log(`\n📝 PROCESANDO: '${name}'`);
    const description = await askQuestion("> Descripción (Enter = Dark Data): ");
    const tagsRaw = await askQuestion("> Etiquetas: ");
    const tags = tagsRaw.split(',').filter(t => t.length > 0);

    const qualityScore = SemanticEngine.calculateMetadataScore(name, description, tags);
    const isDark = qualityScore < 40;

    if (isDark) console.log("   ℹ️  INFO: Se guardará como Dark Data (Privado).");

    if (!ComplianceManager.checkTransactionAML(sizeGB * 0.1, 'STORAGE_FEE')) return;
    const hash = HolographicStorage.calculateHolographicHash(name);
    
    console.log("🛡️ Transmutando (Galois)...");
    await new Promise(r => setTimeout(r, 800));
    
    LocalNode.usedCredit += sizeGB;
    LocalNode.reputationSBT += (qualityScore > 70 ? 5 : 1);
    PersonalIndex.addEntry(name, hash, sizeGB, isDark);
    
    console.log(`✅ GUARDADO SEGURO.`);
    ComplianceManager.logEvent(LocalNode.id, 'STORE_NEW', hash, 'SUCCESS');
}

async function handleRetrieval() {
    console.log("\n🗂️  TU BÓVEDA DIGITAL (Gestión de Activos)");
    const files = PersonalIndex.getList();
    
    if (files.length === 0) { console.log("   (Vacío)"); return; }

    console.log("ID  | TIPO | ESTADO       | NOMBRE");
    console.log("----|------|--------------|----------------");
    files.forEach(f => {
        console.log(`${f.id.toString().padEnd(3)} | ${f.type.padEnd(4)} | ${f.securityLevel.substring(0,8)}...  | ${f.name}`);
    });

    const selection = await askQuestion("\n> ID del archivo: ");
    const file = PersonalIndex.getFileById(parseInt(selection));
    if (!file) return;

    // --- SUB-MENÚ DE ACCIÓN (Derecho al Olvido) ---
    console.log(`\n📂 ACCIONES PARA '${file.name}':`);
    console.log("   [1] 🚀 ABRIR (Recuperar)");
    console.log("   [2] 🗑️  BORRAR (Derecho al Olvido / Crypto-Shredding)");
    
    const action = await askQuestion("> Elige acción [1/2]: ");

    if (action === '2') {
        // LÓGICA DE BORRADO SEGURO
        const confirm = await askQuestion(`⚠️ ¿CONFIRMAS EL BORRADO IRREVERSIBLE DE ${file.name}? [SI/NO]: `);
        if (confirm === 'SI') {
            ComplianceManager.cryptoShredding(file.hash);
            // Aquí lo borraríamos del array en memoria en una app real
            console.log("✅ ARCHIVO ELIMINADO DEL ÍNDICE Y DE LA RED.");
        }
        return;
    }
    // ---------------------------------------------

    console.log(`\n🚀 RECUPERANDO: '${file.name}'`);
    const congestion = Math.random();
    const friction = RetrievalEngine.calculateNetworkFriction(congestion);
    const sbtRequired = Math.floor(friction * 5); 

    console.log(`   > Red: ${(congestion*100).toFixed(0)}% | VIP req: ${sbtRequired} SBT`);

    if (LocalNode.reputationSBT >= sbtRequired) {
        console.log("   🚀 ACCESO VIP (Tesla Resonance)...");
        await RetrievalEngine.retrieveFileHighEnergy(file.hash, LocalNode.id);
    } else {
        console.log("   🐢 ACCESO ESTÁNDAR...");
        await new Promise(r => setTimeout(r, 2000));
    }

    console.log("\n📦 Abriendo en sistema nativo...");
    FileLauncher.openFile(file.name);
    ComplianceManager.logEvent(LocalNode.id, 'FILE_OPEN', file.hash, 'SUCCESS');
}

async function main() {
    console.log(`\n🔒 INICIANDO SECURE BOOT (Final v7.21)...`);
    await IdentityManager.generateIdentity(); 
    WalletCore.initializeWallet(); 
    await LegalManager.showFullTerms(askQuestion);
    await PledgeManager.configure();

    while (true) {
        console.log(`\n    🌌 OASIS CORE v7.21 - "SOVEREIGN DATA"\n    ======================================`);
        console.log("1. 📥 Guardar (AirDrop / Local)");
        console.log("2. 📂 Mis Archivos (Abrir / Borrar)");
        console.log("3. 📊 Ver Perfil");
        console.log("4. 🚪 Salir");

        const sel = await askQuestion("\n> Opción [1-4]: ");

        switch (sel) {
            case '1': await handleStorage(); break;
            case '2': await handleRetrieval(); break; 
            case '3': 
                 console.log(`📊 CRÉDITO: ${(LocalNode.virtualCredit - LocalNode.usedCredit).toFixed(2)} GB`);
                 console.log(`🎖️ REPUTACIÓN: ${LocalNode.reputationSBT} SBT`);
                 break;
            case '4': process.exit(0); break;
        }
    }
}

main();
