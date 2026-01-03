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
        console.log("   - Política de Retención de Datos Activa.");
        console.log("   - Logs Inmutables (WORM Technology).");
        const ag = await askFn("\n✍️ Escribe 'CONFORME': ");
        if (ag.trim().toUpperCase() !== 'CONFORME') process.exit(1);
        ComplianceManager.logEvent(LocalNode.id, 'ACCEPT_TERMS', 'v7.23', 'SUCCESS');
        console.log("✅ Sincronizado.\n");
    }
};

async function handleStorage() {
    console.log("\n📥 INGESTA DE DATOS (Universal)");
    console.log("   [A] 📱 AirDrop / Nearby");
    console.log("   [B] 💾 Disco Local");
    const method = await askQuestion("> Selección [A/B]: ");
    
    let name = "", sizeGB = 0;
    if (method.toUpperCase() === 'A') {
        const devices = await CrossPlatformShare.scanNearbyDevices();
        const devIndex = await askQuestion("> Selecciona [1-3]: ");
        const fileData = await CrossPlatformShare.receiveFile(devices[parseInt(devIndex)-1]);
        name = fileData.name; sizeGB = fileData.size;
    } else {
        name = await askQuestion("> Nombre: ");
        sizeGB = (Math.random() * 5) + 0.1;
    }

    const description = await askQuestion("> Descripción: ");
    const tagsRaw = await askQuestion("> Etiquetas: ");
    const tags = tagsRaw.split(',').filter(t => t.length > 0);
    const qualityScore = SemanticEngine.calculateMetadataScore(name, description, tags);
    const isDark = qualityScore < 40;

    // --- NUEVO BLOQUE: POLÍTICA DE RETENCIÓN (ENTROPÍA) ---
    console.log("\n⏳ POLÍTICA DE RETENCIÓN (Ciclo de Vida del Dato):");
    console.log("   [1] 90 Días (Estándar - Entropía Alta)");
    console.log("   [2] 180 Días (Extendido - Entropía Media)");
    console.log("   [3] 360 Días (Archivo Legal - Entropía Baja)");
    const ttlSelection = await askQuestion("> Selección [1-3]: ");
    let retention = "90_DAYS";
    if (ttlSelection === '2') retention = "180_DAYS";
    if (ttlSelection === '3') retention = "360_DAYS";
    // -----------------------------------------------------

    if (!ComplianceManager.checkTransactionAML(sizeGB * 0.1, 'STORAGE_FEE')) return;
    const hash = HolographicStorage.calculateHolographicHash(name);
    
    console.log("🛡️ Transmutando...");
    await new Promise(r => setTimeout(r, 800));
    LocalNode.usedCredit += sizeGB;
    LocalNode.reputationSBT += (qualityScore > 70 ? 5 : 1);
    PersonalIndex.addEntry(name, hash, sizeGB, isDark);
    
    console.log(`✅ GUARDADO (Caducidad: ${retention}).`);
    // REGISTRAMOS LA CADUCIDAD EN EL LOG WORM PARA EL AUDITOR
    ComplianceManager.logEvent(LocalNode.id, 'STORE_NEW', `${hash}|RETENTION:${retention}`, 'SUCCESS');
}

async function handleRetrieval() {
    console.log("\n🗂️  TU BÓVEDA DIGITAL");
    const files = PersonalIndex.getList();
    if (files.length === 0) { console.log("   (Vacío)"); return; }

    files.forEach(f => console.log(`${f.id} | ${f.type} | ${f.name}`));
    const selection = await askQuestion("\n> ID: ");
    const file = PersonalIndex.getFileById(parseInt(selection));
    if (!file) return;

    console.log(`\n📂 ACCIONES: [1] ABRIR | [2] BORRAR (Derecho al Olvido)`);
    const action = await askQuestion("> Opción: ");

    if (action === '2') {
        ComplianceManager.cryptoShredding(file.hash);
        console.log("✅ ELIMINADO.");
        return;
    }

    const sbtRequired = 20; 
    if (LocalNode.reputationSBT >= sbtRequired) {
        console.log("   🚀 ACCESO VIP...");
        await RetrievalEngine.retrieveFileHighEnergy(file.hash, LocalNode.id);
    } else {
        console.log("   🐢 ACCESO LENTO...");
        await new Promise(r => setTimeout(r, 1000));
    }
    FileLauncher.openFile(file.name);
    ComplianceManager.logEvent(LocalNode.id, 'FILE_OPEN', file.hash, 'SUCCESS');
}

async function handleDPD() {
    console.log("\n⚖️  PANEL DE AUDITORIA (ISO 27001)");
    console.log("1. 🕵️‍♂️ Verificar Integridad de la Cadena (Tamper Check)");
    console.log("2. 📄 Ver Logs WORM");
    const sel = await askQuestion("> Opción: ");
    
    if (sel === '1') {
        const isSecure = ComplianceManager.runAuditCheck();
        if (isSecure) console.log("✅ INTEGRIDAD OK: La cadena criptográfica es válida.");
        else console.log("🚨 ALERTA: La cadena de logs ha sido MANIPULADA.");
    }
}

async function main() {
    console.log(`\n🔒 INICIANDO SECURE BOOT (Retention Policy v7.23)...`);
    ComplianceManager.initialize(); 
    await IdentityManager.generateIdentity(); 
    WalletCore.initializeWallet(); 
    await LegalManager.showFullTerms(askQuestion);
    await PledgeManager.configure();

    while (true) {
        console.log(`\n    🌌 OASIS CORE v7.23 - "COMPLETE COMPLIANCE"\n    ===========================================`);
        console.log("1. 📥 Guardar");
        console.log("2. 📂 Archivos");
        console.log("3. 📊 Perfil");
        console.log("4. ⚖️  Auditoría");
        console.log("5. 🚪 Salir");

        const sel = await askQuestion("\n> Opción [1-5]: ");

        switch (sel) {
            case '1': await handleStorage(); break;
            case '2': await handleRetrieval(); break; 
            case '3': console.log(`Reputación: ${LocalNode.reputationSBT}`); break;
            case '4': await handleDPD(); break;
            case '5': process.exit(0); break;
        }
    }
}

main();
